import { Game } from '../Game'
import { Mouse } from '../input/Mouse'
import { Pointer } from '../input/Pointer'
import { LevelButton } from '../LevelButton'
import { Point } from '../Point'
import { Scene } from '../Scene'

import { GameScene } from './GameScene'

export class ChooseLevelScene implements Scene {
  private readonly game: Game
  private readonly pointer: Pointer
  private readonly buttons: Array<LevelButton>

  public constructor(game: Game) {
    this.game = game

    this.pointer = new Mouse(this.game.getCanvas())

    const levels = this.game.getStorage().getLevels()

    this.buttons = []

    let i = 0

    let xx = 0
    let yy = 0

    for (const [ index, level ] of Object.entries(levels)) {
      const button = new LevelButton(level)
      button.setPosition(new Point(xx * (18 + 4) + 15, (15 + 7) * yy + 42))
      button.setSize(18, 18)

      if (level.dynamic.accessible) {
        button.setOnClick((): void => {
          this.game.changeSceneWithTransition(new GameScene(this.game, index))
        })
      } else {
        button.setOnClick((): void => {
        })
      }

      this.buttons.push(button)

      i += 1
      xx += 1

      if (i % 5 === 0) {
        xx = 0
        yy += 1
      }
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
    const [ gameWidth, gameHeight ] = this.game.getScreenSize()

    ctx.clearRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = '#f7f3ef'
    ctx.fillRect(0, 0, gameWidth, gameHeight)

    ctx.fillStyle = '#42c79c'
    ctx.font = '20px Arial'
    ctx.fillText('Bobby', 14, 30)

    for (const button of this.buttons) {
      button.render(ctx)
    }
  }
}
