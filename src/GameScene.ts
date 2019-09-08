import m from 'mithril'

import { Camera } from './Camera'
import { CELL_SIZE } from './Cell'
import { Direction } from './Direction'
import { Game } from './Game'
import { ImageManager } from './ImageManager'
import { Keyboard } from './input/Keyboard'
import { Level } from './Level'
import { Map } from './Map'
import { Player } from './Player'
import { Point } from './Point'
import { Scene } from './Scene'
import { Storage } from './Storage'
import { clamp } from './Util'

export class GameScene implements Scene {
  private readonly game: Game
  private readonly map: Map
  private readonly player: Player
  private readonly keyboard: Keyboard
  private readonly currentLevel: string
  private readonly camera: Camera
  private readonly storage: Storage

  public constructor(game: Game, level: string, storage: Storage) {
    this.game = game

    this.currentLevel = level

    this.storage = storage

    this.map = new Map(this.storage.getLevels()[this.currentLevel].fixed.map)

    this.camera = new Camera(new Point(0, 0), { width: 100, height: 100 })

    this.keyboard = new Keyboard()

    this.player = new Player(this)
  }

  public update(dt: number): void {
    const [ gameWidth, gameHeight ] = this.game.getScreenSize()
    const { width: mapWidth, height: mapHeight } = this.map.getDisplayedSize()

    const cameraPosition = this.player.getDisplayPosition().clone()

    cameraPosition.x = -cameraPosition.x
    cameraPosition.y = -cameraPosition.y

    cameraPosition.x -= CELL_SIZE / 2
    cameraPosition.y -= CELL_SIZE / 2

    cameraPosition.x += gameWidth / 2
    cameraPosition.y += gameHeight / 2

    cameraPosition.x = clamp(cameraPosition.x, -mapWidth + gameWidth, 0)
    cameraPosition.y = clamp(cameraPosition.y, -mapHeight + gameHeight, 0)

    this.camera.setPosition(cameraPosition)

    if (this.player.isAbleToMove()) {
      if (this.keyboard.down('ArrowUp') || this.keyboard.down('KeyW')) {
        this.player.move(Direction.Up)
      }

      if (this.keyboard.down('ArrowDown') || this.keyboard.down('KeyS')) {
        this.player.move(Direction.Down)
      }

      if (this.keyboard.down('ArrowRight') || this.keyboard.down('KeyD')) {
        this.player.move(Direction.Right)
      }

      if (this.keyboard.down('ArrowLeft') || this.keyboard.down('KeyA')) {
        this.player.move(Direction.Left)
      }
    }

    this.map.update(dt)
    this.player.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    let { width, height } = this.map.getSize()
    width *= CELL_SIZE
    height *= CELL_SIZE

    const bgImg = ImageManager.getImage('background')
    const pat = ctx.createPattern(bgImg, 'repeat')

    ctx.save()
    ctx.translate(this.camera.getPosition().x, this.camera.getPosition().y)

    ctx.beginPath() // @see https://gamedev.stackexchange.com/a/120250
    ctx.rect(0, 0, width, height)
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
    this.storage.success(this.currentLevel)

    const levels = this.storage.getLevels()

    const keys = Object.keys(levels)
    const nextIndex = keys.indexOf(this.currentLevel) + 1
    const nextLevel = keys[nextIndex]

    if (typeof nextLevel === 'undefined') {
      m.route.set('/end-game')
    } else {
      // m.route.set(`/game/${nextLevel}`)
      this.game.changeScene(new GameScene(this.game, nextLevel, this.storage))
    }
  }
}
