import { Game } from './Game'
import { GameScene } from './GameScene'
import { Key, Keyboard } from './Keyboard'
import { Scene } from './Scene'

export class HomeScene implements Scene {
  private game: Game
  private keyboard: Keyboard

  public constructor(game: Game) {
    this.game = game

    this.keyboard = new Keyboard()
  }

  public update(_dt: number): void {
    if (this.keyboard.down(Key.Space)) {
      this.game.changeSceneWithTransition(new GameScene(this.game))
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const [ gameWidth, gameHeight ] = this.game.getGameSize()

    ctx.clearRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = 'white'

    ctx.font = '20px Arial'
    ctx.fillText('Bobby', 14, 30)

    ctx.font = '7px Arial'
    ctx.fillText('Appuyez sur Espace pour démarrer', 14, 50)
  }
}
