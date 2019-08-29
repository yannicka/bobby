import { Button } from './Button'
import { ChooseLevelScene } from './ChooseLevelScene'
import { Game } from './Game'
import { Point } from './Point'
import { Mouse } from './Pointer/Mouse'
import { Pointer } from './Pointer/Pointer'
import { Scene } from './Scene'

export class HomeScene implements Scene {
  private readonly game: Game
  private readonly pointer: Pointer
  private readonly playButton: Button

  public constructor(game: Game) {
    this.game = game

    this.pointer = new Mouse(this.game.getCanvas())

    this.playButton = new Button('Jouer')
    this.playButton.setPosition(new Point(15, 42))
    this.playButton.setSize(36, 18)
    this.playButton.setOnClick((): void => {
      this.game.changeSceneWithTransition(new ChooseLevelScene(this.game))
    })
  }

  public update(dt: number): void {
    this.playButton.update(dt)

    const pointerPosition = this.pointer.getPosition()

    pointerPosition.x /= this.game.getZoom()
    pointerPosition.y /= this.game.getZoom()

    if (this.pointer.press() && this.playButton.isHover(pointerPosition)) {
      this.playButton.click()
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

    this.playButton.render(ctx)
  }
}
