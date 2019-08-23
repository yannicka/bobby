import Game from './Game'
import Scene from './Scene'

enum Transition {
  None,
  Out,
  In,
}

export default class SceneTransition {
  private transition: Transition
  private game: Game
  private nextScene: Scene | null
  private counter: number

  public constructor(game: Game) {
    this.transition = Transition.None

    this.game = game
    this.nextScene = null

    this.counter = 0
  }

  public changeScene(nextScene: Scene) {
    this.nextScene = nextScene

    this.transition = Transition.Out
  }

  public update(dt: number): void {
    switch (this.transition) {
      case Transition.Out:
        this.counter += dt

        if (this.counter >= 1) {
          this.counter = 1

          this.game.changeScene(this.nextScene)

          this.transition = Transition.In
        }
        break

      case Transition.In:
        this.counter -= dt

        if (this.counter <= 0) {
          this.counter = 0

          this.transition = Transition.None
        }
        break
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
