import m from 'mithril'

import { CELL_SIZE } from './Cell'
import { GameScene } from './GameScene'
import { ImageManager } from './ImageManager'
import { Keyboard } from './input/Keyboard'
import { Pointer } from './input/Pointer'
import { Touch } from './input/Touch'
import { Joystick } from './Joystick'
import { Point } from './Point'
import { Scene } from './Scene'
import { ChooseLevelScreen } from './screen/ChooseLevelScreen'
import { EndGameScreen } from './screen/EndGameScreen'
import { GameScreen } from './screen/GameScreen'
import { HomeScreen } from './screen/HomeScreen'
import { OptionsScreen } from './screen/OptionsScreen'
import { state } from './State'
import { isTouchDevice } from './Util'

const screenSize = { width: 9 * CELL_SIZE, height: 9 * CELL_SIZE }

function computeAppSize() {
  const { width, height } = screenSize

  const actionbar = document.querySelector('.actionbar')
  const actionbarHeight = (actionbar instanceof HTMLElement ? actionbar.clientHeight : 0)

  const widthZoom = window.innerWidth / width
  const heightZoom = (window.innerHeight - actionbarHeight) / height

  const zoom = Math.min(widthZoom, heightZoom)

  const appWidth = width * zoom
  const appHeight = height * zoom

  return {
    width: appWidth,
    height: appHeight,
    zoom,
  }
}

export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly keyboard: Keyboard
  private readonly pointer: Pointer
  private readonly joystick: Joystick
  private animationFrame: number
  private lastUpdate: number
  private scene: Scene
  private zoom: number

  public constructor(levelName: string) {
    this.canvas = document.getElementById('app') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.lastUpdate = Date.now()

    this.zoom = 1

    window.addEventListener('resize', (e: UIEvent) => this.resize(e))

    this.keyboard = new Keyboard()

    this.pointer = new Touch(this.canvas)
    this.joystick = new Joystick(this, this.pointer, new Point(30, 30))

    this.scene = new GameScene(this, levelName, state.getStorage())

    this.resize()

    this.update()
  }

  public update(): void {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    if (this.pointer.press()) {
      const newPosition = this.pointer.getPosition().clone()
      newPosition.x /= this.zoom
      newPosition.y /= this.zoom

      this.joystick.setPosition(newPosition)
    }

    this.scene.update(dt)

    this.render(this.ctx)

    this.joystick.update(dt)
    this.pointer.update(dt)

    this.animationFrame = requestAnimationFrame(() => this.update())
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.scene.render(ctx)

    if (this.pointer.down()) {
      if (isTouchDevice()) {
        this.joystick.render(ctx)
      }
    }
  }

  public resize(_e: UIEvent | null = null): void {
    const { width, height, zoom } = computeAppSize()

    this.zoom = zoom

    this.canvas.width = width
    this.canvas.height = height

    this.ctx.imageSmoothingEnabled = false
    this.ctx.scale(zoom, zoom)
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public changeScene(scene: Scene): void {
    this.scene = scene
  }

  public getScreenSize(): [ number, number ] {
    let [ width, height ] = [ 9, 9 ]

    width *= CELL_SIZE
    height *= CELL_SIZE

    return [ width, height ]
  }

  public stop(): void {
    cancelAnimationFrame(this.animationFrame)
  }

  public getZoom(): number {
    return this.zoom
  }

  public getJoystick(): Joystick {
    return this.joystick
  }

  public getKeyboard(): Keyboard {
    return this.keyboard
  }
}

export class Superapp {
  private superapp: HTMLElement

  public constructor() {
    const imagesLoader = ImageManager.load('assets/img/', {
      'tiles': 'tiles.png',
      'player': 'player.png',
      'background': 'background.png',
    })

    Promise.all(imagesLoader).then(() => {
      this.init()
    })
  }

  public init() {
    window.addEventListener('resize', (e: UIEvent) => this.resize(e))

    this.superapp = document.getElementById('superapp')

    this.resize()

    m.route(this.superapp, '/', {
      '/': HomeScreen,
      '/options': OptionsScreen,
      '/choose-level': ChooseLevelScreen,
      '/game/:level': GameScreen,
      '/end-game': EndGameScreen,
    })
  }

  public resize(_e: UIEvent | null = null): void {
    const { width } = computeAppSize()
    const height = window.innerHeight

    this.superapp.style.width = `${width}px`
    this.superapp.style.height = `${height}px`
  }
}

const superapp = new Superapp()
