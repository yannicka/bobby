import { Direction } from './Direction'
import { Game } from './Game'
import { ImageManager } from './ImageManager'
import { Key, Keyboard } from './Keyboard'
import { Map } from './Map'
import { Player } from './Player'
import { Scene } from './Scene'

export class GameScene implements Scene {
  private game: Game
  private map: Map
  private player: Player
  private keyboard: Keyboard
  private currentLevel: number

  public constructor(game: Game, level: number = 0) {
    this.game = game

    this.currentLevel = level

    const levels = this.game.getStorage().getLevels()

    this.map = new Map(levels[this.currentLevel].fixed.map)

    this.keyboard = new Keyboard()

    this.player = new Player(this.game, this.map)
  }

  public update(dt: number): void {
    if (!this.game.getSceneTransition().isChanging()) {
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
    }

    this.map.update(dt)
    this.player.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const [ gameWidth, gameHeight ] = this.game.getGameSize()

    const bgImg = ImageManager.getImage('background')
    const pat = ctx.createPattern(bgImg, 'repeat')
    ctx.beginPath() // Nécessaire : https://gamedev.stackexchange.com/a/120250
    ctx.rect(0, 0, gameWidth, gameHeight)
    ctx.fillStyle = pat
    ctx.fill()

    this.map.render(ctx)
    this.player.render(ctx)
  }
}
