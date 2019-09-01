import { Button } from './Button'
import { Level } from './Storage'

export class LevelButton extends Button {
  private readonly level: Level

  public constructor(level: Level) {
    super('')

    this.level = level
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const position = this.getPosition()
    const width = this.getWidth()
    const height = this.getHeight()

    if (this.level.user.success) {
      ctx.fillStyle = 'darkgreen'
    } else {
      ctx.fillStyle = 'darkgrey'
    }
    ctx.fillRect(
      position.x,
      position.y,
      width,
      height,
    )

    ctx.fillStyle = 'black'
    ctx.font = '10px Arial'
    ctx.fillText(this.level.name, position.x + 4, position.y + 12)
  }
}
