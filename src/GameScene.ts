import Direction from './Direction'
import Game from './Game'
import ImageManager from './ImageManager'
import { Key, Keyboard } from './Keyboard'
import Map from './Map'
import Player from './Player'
import Scene from './Scene'

export default class GameScene implements Scene {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private game: Game
  private map: Map
  private player: Player
  private keyboard: Keyboard

  public constructor(game: Game) {
    this.game = game

    this.canvas = this.game.getCanvas()
    this.ctx = this.game.getCtx()

    this.map = Map.firstLevel()

    this.keyboard = new Keyboard()

    this.player = new Player(this.game, this.map)
  }

  public update(dt: number): void {
    if (this.player.isAbleToMove()) {
      if (this.keyboard.down(Key.Up)) {
        this.player.move(Direction.Up)
      }

      if (this.keyboard.down(Key.Down)) {
        this.player.move(Direction.Down)
      }

      if (this.keyboard.down(Key.Right)) {
        this.player.move(Direction.Right)
      }

      if (this.keyboard.down(Key.Left)) {
        this.player.move(Direction.Left)
      }
    }

    this.map.update(dt)
    this.player.update(dt)

  }

  public render(ctx: CanvasRenderingContext2D): void {
    const bgImg = ImageManager.getImage('background')
    const pat = this.ctx.createPattern(bgImg, 'repeat')
    this.ctx.beginPath() // Nécessaire : https://gamedev.stackexchange.com/a/120250
    this.ctx.rect(0, 0, 140, 140)
    this.ctx.fillStyle = pat
    this.ctx.fill()

    this.map.render(this.ctx)
    this.player.render(this.ctx)
  }
}
