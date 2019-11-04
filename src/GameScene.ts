import m from 'mithril'

import { Camera } from './Camera'
import { CELL_SIZE } from './Cell'
import { Direction } from './Direction'
import { changeScreenSize, Game } from './Game'
import { ImageManager } from './ImageManager'
import { Keyboard } from './input/Keyboard'
import { Map } from './Map'
import { Player } from './Player'
import { Point } from './Point'
import { Scene } from './Scene'
import { Size } from './Size'
import { Storage } from './Storage'
import { clamp } from './Util'

export class GameScene implements Scene {
  private readonly game: Game
  private readonly map: Map
  private readonly player: Player
  private readonly currentLevelName: string
  private readonly camera: Camera
  private readonly storage: Storage

  public constructor(game: Game, levelName: string, storage: Storage) {
    this.game = game

    this.currentLevelName = levelName

    this.storage = storage

    const level = this.storage.getLevels()[this.currentLevelName]

    if (!level.dynamic.accessible) {
      m.route.set('/choose-level')
    }

    changeScreenSize(level.fixed.screenWidth, level.fixed.screenHeight)

    this.map = new Map(this.storage.getLevels()[this.currentLevelName].fixed.map)

    this.camera = new Camera(new Point(0, 0), new Size(100, 100))

    this.player = new Player(this)
  }

  public update(dt: number): void {
    this.updateCamera(dt)

    this.movePlayer(dt)

    this.map.update(dt)
    this.player.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
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
      m.route.set(`/game/${nextLevel}`, {}, {
        replace: true,
      })
    }
  }

  private updateCamera(_dt: number): void {
    const gameSize = this.game.getScreenSize().clone()
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

  public movePlayer(_dt: number): void {
    if (this.player.isAbleToMove()) {
      let keepDirection = false

      if (this.game.getKeyboard().down('ArrowUp') || this.game.getKeyboard().down('KeyW')) {
        if (this.player.getDirection() === Direction.Up) {
          keepDirection = true
        } else {
          this.player.move(Direction.Up)
        }
      }

      if (this.game.getKeyboard().down('ArrowDown') || this.game.getKeyboard().down('KeyS')) {
        if (this.player.getDirection() === Direction.Down) {
          keepDirection = true
        } else {
          this.player.move(Direction.Down)
        }
      }

      if (this.game.getKeyboard().down('ArrowRight') || this.game.getKeyboard().down('KeyD')) {
        if (this.player.getDirection() === Direction.Right) {
          keepDirection = true
        } else {
          this.player.move(Direction.Right)
        }
      }

      if (this.game.getKeyboard().down('ArrowLeft') || this.game.getKeyboard().down('KeyA')) {
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

    this.game.getJoystick().updatePlayer(this.player)
  }
}
