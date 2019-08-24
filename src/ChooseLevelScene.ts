import { Button } from './Button'
import { Game } from './Game'
import { GameScene } from './GameScene'
import { Point } from './Point'
import { Mouse } from './Pointer/Mouse'
import { Pointer } from './Pointer/Pointer'
import { Scene } from './Scene'

export class ChooseLevelScene implements Scene {
  private game: Game
  private pointer: Pointer
  private buttons: Array<Button>

  public constructor(game: Game) {
    this.game = game

    this.pointer = new Mouse(this.game.getCanvas())

    const levels = this.game.getStorage().getLevels()

    this.buttons = []

    for (const [ index, level ] of Object.entries(levels)) {
      const i = parseInt(index, 10)

      const button = new Button(index)
      button.setPosition(new Point(i * (18 + 4) + 15, 42))
      button.setSize(18, 18)
      button.setOnClick((): void => {
        this.game.changeSceneWithTransition(new GameScene(this.game, i))
      })

      this.buttons.push(button)
    }
  }

  public update(dt: number): void {
    const pointerPosition = this.pointer.getPosition()

    pointerPosition.x /= this.game.getZoom()
    pointerPosition.y /= this.game.getZoom()

    for (const button of this.buttons) {
      button.update(dt)

      if (this.pointer.press() && button.isHover(pointerPosition)) {
        button.click()
      }
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

    for (const button of this.buttons) {
      button.render(ctx)
    }
  }
}
