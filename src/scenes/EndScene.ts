import { Button } from '../Button'
import { Game } from '../Game'
import { Mouse } from '../input/Mouse'
import { Pointer } from '../input/Pointer'
import { Point } from '../Point'
import { Scene } from '../Scene'

import { HomeScene } from './HomeScene'

export class EndScene implements Scene {
  private readonly game: Game
  private readonly pointer: Pointer
  private readonly backButton: Button

  public constructor(game: Game) {
    this.game = game

    this.pointer = new Mouse(this.game.getCanvas())

    this.backButton = new Button('Retourner au menu')
    this.backButton.setPosition(new Point(10, 116))
    this.backButton.setSize(124, 18)
    this.backButton.setOnClick((): void => {
      this.game.changeSceneWithTransition(new HomeScene(this.game))
    })
  }

  public update(dt: number): void {
    this.backButton.update(dt)

    const pointerPosition = this.pointer.getPosition()

    pointerPosition.x /= this.game.getZoom()
    pointerPosition.y /= this.game.getZoom()

    if (this.pointer.press() && this.backButton.isHover(pointerPosition)) {
      this.backButton.click()
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const [ gameWidth, gameHeight ] = this.game.getScreenSize()

    ctx.clearRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = 'white'

    ctx.font = '20px Arial'
    ctx.fillText('Bobby', 14, 30)

    ctx.font = '12px Arial'
    ctx.fillText('Fin du jeu. Bravo.', 14, 60)

    this.backButton.render(ctx)
  }
}
