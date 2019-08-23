import Game from './Game'
import Scene from './Scene'

type ClassScene = new (game: Game) => Scene

export default class SceneTransition {
  private game: Game
  private nextScene: ClassScene | null
  private counter: number

  public constructor(game: Game) {
    this.game = game
    this.nextScene = null

    this.counter = 0
  }

  public changeScene(nextScene: ClassScene) {
    this.nextScene = nextScene
  }

  public update(dt: number): void {
    if (this.nextScene) {
      this.counter += dt

      if (this.counter >= 1) {
        this.game.changeScene(this.nextScene)

        this.counter = null
        this.nextScene = null
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (this.nextScene) {
      const [ width, height ] = this.game.getScreenSize()

      ctx.fillStyle = 'black'
      ctx.globalAlpha = this.counter
      ctx.fillRect(0, 0, width, height)
      ctx.globalAlpha = 1
    }
  }
}
