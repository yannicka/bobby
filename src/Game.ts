import m from 'mithril'

import { CELL_SIZE } from './Cell'
import { GameScene } from './GameScene'
import { ImageManager } from './ImageManager'
import { Keyboard } from './input/Keyboard'
import { Pointer } from './input/Pointer'
import { Joystick } from './Joystick'
import { Point } from './Point'
import { Scene } from './Scene'
import { ChooseLevelScreen } from './screen/ChooseLevelScreen'
import { EndGameScreen } from './screen/EndGameScreen'
import { GameScreen } from './screen/GameScreen'
import { HelpScreen } from './screen/HelpScreen'
import { HomeScreen } from './screen/HomeScreen'
import { OptionsScreen } from './screen/OptionsScreen'
import { Size } from './Size'
import { state } from './State'

const screenSize = new Size(9 * CELL_SIZE, 9 * CELL_SIZE)

function computeAppSize() {
  const size = screenSize

  const topbar = document.querySelector('.topbar')
  const topbarHeight = (topbar instanceof HTMLElement ? topbar.clientHeight : 0)

  const widthZoom = window.innerWidth / size.width
  const heightZoom = (window.innerHeight - topbarHeight) / size.height

  const zoom = Math.min(widthZoom, heightZoom)

  const appWidth = size.width * zoom
  const appHeight = size.height * zoom

  return {
    size: new Size(appWidth, appHeight),
    zoom,
  }
}

export function changeScreenSize(width: number, height: number) {
  screenSize.width = width * CELL_SIZE
  screenSize.height = height * CELL_SIZE
}

export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly keyboard: Keyboard
  private readonly pointer: Pointer
  private readonly gameScreen: GameScreen
  private readonly joystick: Joystick
  private animationFrame: number
  private lastUpdate: number
  private scene: Scene
  private zoom: number

  public constructor(gameScreen: GameScreen, levelName: string) {
    this.gameScreen = gameScreen

    this.canvas = document.getElementById('app') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.lastUpdate = Date.now()

    this.zoom = 1

    this.listen()

    this.keyboard = this.gameScreen.getKeyboard()
    this.pointer = this.gameScreen.getPointer()

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
      this.joystick.render(ctx)
    }
  }

  public listen(): void {
    window.addEventListener('resize', this)
  }

  public unlisten(): void {
    window.removeEventListener('resize', this)
  }

  public handleEvent(e: UIEvent): void {
    switch (e.type) {
      case 'resize':
        this.resize(e)
        break
    }
  }

  public resize(_e: UIEvent | null = null): void {
    const appSize = computeAppSize()

    this.zoom = appSize.zoom

    this.canvas.width = appSize.size.width
    this.canvas.height = appSize.size.height

    this.ctx.imageSmoothingEnabled = false
    this.ctx.scale(appSize.zoom, appSize.zoom)
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public changeScene(scene: Scene): void {
    this.scene = scene
  }

  public getScreenSize(): Size {
    return screenSize
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
    window.addEventListener('resize', this.resize)

    this.superapp = document.getElementById('superapp')

    this.resize()

    m.route(this.superapp, '/', {
      '/': HomeScreen,
      '/options': OptionsScreen,
      '/help': HelpScreen,
      '/choose-level': ChooseLevelScreen,
      '/game/:level': GameScreen,
      '/end-game': EndGameScreen,
    })
  }

  public resize(_e: UIEvent | null = null): void {
    const appSize = computeAppSize()
    const height = window.innerHeight

    this.superapp.style.width = `${appSize.size.width}px`
    this.superapp.style.height = `${height}px`
  }
}

const superapp = new Superapp()
