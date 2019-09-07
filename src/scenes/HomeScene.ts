import { AnimationManager } from '../AnimationManager'
import { Button } from '../Button'
import { ChooseLevelScene } from '../ChooseLevelScene'
import { Game } from '../Game'
import { ImageManager } from '../ImageManager'
import { Point } from '../Point'
import { Mouse } from '../Pointer/Mouse'
import { Pointer } from '../Pointer/Pointer'
import { Scene } from '../Scene'

export class HomeScene implements Scene {
  private readonly game: Game
  private readonly pointer: Pointer
  private readonly playButton: Button
  private readonly playerAnimation: AnimationManager

  public constructor(game: Game) {
    this.game = game

    this.pointer = new Mouse(this.game.getCanvas())

    const playerImage = ImageManager.getImage('player')

    this.playerAnimation = new AnimationManager(playerImage, 14, 15)

    this.playerAnimation.addAnimation('animation', [ 12, 13, 14, 15 ], {
      frameDuration: 0.04,
    })

    this.playerAnimation.play('animation')

    this.playButton = new Button('Jouer')
    this.playButton.setPosition(new Point(10, 116))
    this.playButton.setSize(124, 18)
    this.playButton.setOnClick((): void => {
      this.game.changeSceneWithTransition(new ChooseLevelScene(this.game))
    })
  }

  public update(dt: number): void {
    this.playButton.update(dt)

    this.playerAnimation.update(dt)

    const pointerPosition = this.pointer.getPosition()

    pointerPosition.x /= this.game.getZoom()
    pointerPosition.y /= this.game.getZoom()

    if (this.pointer.press() && this.playButton.isHover(pointerPosition)) {
      this.playButton.click()
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

    this.playButton.render(ctx)

    ctx.save()
    ctx.translate(this.game.getScreenSize()[0] / 2 - 14 / 2, 54)

    this.playerAnimation.render(ctx)

    ctx.restore()
  }
}
