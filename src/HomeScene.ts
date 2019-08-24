import { Button } from './Button'
import { Game } from './Game'
import { GameScene } from './GameScene'
import { Key, Keyboard } from './Keyboard'
import { Point } from './Point'
import { Mouse } from './Pointer/Mouse'
import { Pointer } from './Pointer/Pointer'
import { Scene } from './Scene'

export class HomeScene implements Scene {
  private game: Game
  private keyboard: Keyboard
  private pointer: Pointer
  private playButton: Button

  public constructor(game: Game) {
    this.game = game

    this.keyboard = new Keyboard()

    this.pointer = new Mouse()

    this.playButton = new Button()
    this.playButton.setSize(20, 20)
    this.playButton.setPosition(new Point(20, 20))
    this.playButton.setOnClick((): void => {
      this.game.changeSceneWithTransition(new GameScene(this.game))
    })
  }

  public update(dt: number): void {
    this.playButton.update(dt)

    const pointerPosition = this.pointer.getPosition()

    // pointerPosition.x /= this.game.getZoom()
    // pointerPosition.y /= this.game.getZoom()

    if (this.pointer.press() && this.playButton.isHover(pointerPosition)) {
      console.log(pointerPosition)
    }

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

    ctx.font = '7px Arial'
    ctx.fillText('Appuyez sur Espace pour démarrer', 14, 50)

    this.playButton.render(ctx)
  }
}
