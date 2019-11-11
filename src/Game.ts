import m from 'mithril'

import { Camera } from './Camera'
import { CELL_SIZE } from './Cell'
import { Direction } from './Direction'
import { ImageManager } from './ImageManager'
import { Keyboard } from './input/Keyboard'
import { Pointer } from './input/Pointer'
import { Joystick } from './Joystick'
import { Map } from './Map'
import { Player } from './Player'
import { Point } from './Point'
import { GameScreen } from './screen/GameScreen'
import { Size } from './Size'
import { state } from './State'
import { Storage } from './Storage'
import { clamp } from './Util'

const screenSize = new Size(9 * CELL_SIZE, 9 * CELL_SIZE)

export function computeAppSize() {
  const size = screenSize

  const topbar = document.getElementById('topbar')
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
  private zoom: number
  private map: Map
  private player: Player
  private readonly currentLevelName: string
  private camera: Camera
  private readonly storage: Storage

  public constructor(gameScreen: GameScreen, levelName: string) {
    this.gameScreen = gameScreen

    this.canvas = document.getElementById('app') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.lastUpdate = Date.now()

    this.zoom = 1

    this.listen()

    this.keyboard = this.gameScreen.getKeyboard()
    this.pointer = this.gameScreen.getPointer()

    this.joystick = new Joystick()
    this.joystick.setScale(this.zoom)

    this.currentLevelName = levelName

    this.storage = state.getStorage()

    const level = this.storage.getLevels()[this.currentLevelName]

    if (!level.dynamic.accessible) {
      m.route.set('/choose-level')
    }

    this.runLevel()

    this.update()
  }

  private update(): void {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    if (this.pointer.press()) {
      const topbar = document.getElementById('topbar')
      const pointerEvent = this.pointer.getLastEvent()
      const target = pointerEvent.target as Node

      if (!topbar.contains(target)) {
        const newPosition = this.pointer.getPosition().clone()

        this.joystick.setStartPosition(newPosition)

        this.joystick.show()
      }
    }

    if (this.pointer.release()) {
      this.joystick.hide()
    }

    if (this.keyboard.press('KeyR')) {
      this.runLevel()
    }

    this.updateCamera(dt)

    this.movePlayer(dt)

    this.map.update(dt)
    this.player.update(dt)

    this.render(this.ctx)

    this.pointer.update(dt)

    this.animationFrame = requestAnimationFrame(() => this.update())
  }

  private render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    const size = this.map.getSize().clone()
    size.width *= CELL_SIZE
    size.height *= CELL_SIZE

    const bgImg = ImageManager.getImage('background')
    const pat = ctx.createPattern(bgImg, 'repeat')

    ctx.save()
    ctx.translate(this.camera.getPosition().x, this.camera.getPosition().y)

    ctx.beginPath() // @see https://gamedev.stackexchange.com/a/120250
    ctx.rect(0, 0, size.width, size.height)
    ctx.fillStyle = pat
    ctx.fill()

    this.map.render(ctx)
    this.player.render(ctx)

    ctx.restore()

    this.joystick.render()
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

  public stop(): void {
    cancelAnimationFrame(this.animationFrame)
  }

  public getZoom(): number {
    return this.zoom
  }

  public getMap(): Map {
    return this.map
  }

  public nextLevel(): void {
    this.storage.successfulLevel(this.currentLevelName)

    const levels = this.storage.getLevels()

    const keys = Object.keys(levels)
    const nextIndex = keys.indexOf(this.currentLevelName) + 1
    const nextLevel = keys[nextIndex]

    if (typeof nextLevel === 'undefined') {
      m.route.set('/end-game')
    } else {
      m.route.set(`/level/${nextLevel}`, {}, {
        replace: true,
      })
    }
  }

  private runLevel(): void {
    const level = this.storage.getLevels()[this.currentLevelName]

    changeScreenSize(level.fixed.screenWidth, level.fixed.screenHeight)

    this.map = new Map(this.storage.getLevels()[this.currentLevelName].fixed.map)

    this.camera = new Camera(new Point(0, 0), new Size(100, 100))

    this.player = new Player(this)

    this.resize()
  }

  private resize(_e: UIEvent | null = null): void {
    const appSize = computeAppSize()

    this.zoom = appSize.zoom

    this.canvas.width = appSize.size.width / appSize.zoom
    this.canvas.height = appSize.size.height / appSize.zoom

    this.canvas.style.width = `${appSize.size.width}px`
    this.canvas.style.height = `${appSize.size.height}px`

    this.joystick.setScale(this.zoom)
  }

  private getScreenSize(): Size {
    return screenSize
  }

  private getJoystick(): Joystick {
    return this.joystick
  }

  private updateCamera(_dt: number): void {
    const gameSize = this.getScreenSize().clone()
    const mapSize = this.map.getDisplayedSize().clone()

    const cameraPosition = this.player.getDisplayPosition().clone()

    cameraPosition.x = -cameraPosition.x
    cameraPosition.y = -cameraPosition.y

    cameraPosition.x -= CELL_SIZE / 2
    cameraPosition.y -= CELL_SIZE / 2

    cameraPosition.x += gameSize.width / 2
    cameraPosition.y += gameSize.height / 2

    cameraPosition.x = clamp(cameraPosition.x, -mapSize.width + gameSize.width, 0)
    cameraPosition.y = clamp(cameraPosition.y, -mapSize.height + gameSize.height, 0)

    this.camera.setPosition(cameraPosition)
  }

  private movePlayer(_dt: number): void {
    if (this.player.isAbleToMove()) {
      let keepDirection = false

      if (this.keyboard.down('ArrowUp') || this.keyboard.down('KeyW')) {
        if (this.player.getDirection() === Direction.Up) {
          keepDirection = true
        } else {
          this.player.move(Direction.Up)
        }
      }

      if (this.keyboard.down('ArrowDown') || this.keyboard.down('KeyS')) {
        if (this.player.getDirection() === Direction.Down) {
          keepDirection = true
        } else {
          this.player.move(Direction.Down)
        }
      }

      if (this.keyboard.down('ArrowRight') || this.keyboard.down('KeyD')) {
        if (this.player.getDirection() === Direction.Right) {
          keepDirection = true
        } else {
          this.player.move(Direction.Right)
        }
      }

      if (this.keyboard.down('ArrowLeft') || this.keyboard.down('KeyA')) {
        if (this.player.getDirection() === Direction.Left) {
          keepDirection = true
        } else {
          this.player.move(Direction.Left)
        }
      }

      if (keepDirection) {
        this.player.move(this.player.getDirection())
      }
    }

    this.updatePlayerFromJoystick()
  }

  private updatePlayerFromJoystick(): void {
    if (this.pointer.down()) {
      const topbar = document.getElementById('topbar')
      const pointerEvent = this.pointer.getLastEvent()
      const target = pointerEvent.target as Node

      if (!topbar.contains(target)) {
        this.joystick.setPointerPosition(this.pointer.getPosition())
        const force = this.getJoystick().getAxisValues()

        const forceNeeded = 0.65

        if (Math.abs(force.x) > Math.abs(force.y)) {
          // mouvement horizontal

          if (force.x >= forceNeeded) {
            this.player.move(Direction.Right)
          }

          if (force.x <= -forceNeeded) {
            this.player.move(Direction.Left)
          }
        } else {
          // mouvement vertical

          if (force.y >= forceNeeded) {
            this.player.move(Direction.Down)
          }

          if (force.y <= -forceNeeded) {
            this.player.move(Direction.Up)
          }
        }
      }
    }
  }
}
