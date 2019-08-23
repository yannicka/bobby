import Game from './Game'
import GameScene from './GameScene'
import { Key, Keyboard } from './Keyboard'
import Scene from './Scene'

export default class HomeScene implements Scene {
  private game: Game
  // private canvas: HTMLCanvasElement
  private keyboard: Keyboard

  public constructor(game: Game) {
    this.game = game
    // this.canvas = game.getCanvas()

    this.keyboard = new Keyboard()
  }

  public update(_dt: number): void {
    if (this.keyboard.down(Key.Space)) {
      this.game.changeSceneWithTransition(new GameScene(this.game))
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const [ screenWidth, screenHeight ] = this.game.getScreenSize()

    ctx.clearRect(0, 0, screenWidth, screenHeight)

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, screenWidth, screenHeight)

    ctx.fillStyle = 'black'
    ctx.font = '7px Arial'
    ctx.fillText('Appuyer sur Espace pour démarrer', 10, 10)
  }
}
