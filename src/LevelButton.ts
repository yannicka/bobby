import { Button } from './Button'
import { Level } from './Level'

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

    ctx.fillStyle = 'yellow'

    if (this.level.user.success) {
      if (this.level.dynamic.accessible) {
        ctx.fillStyle = '#42c79c'
      } else {
        ctx.fillStyle = 'red' // état normalement impossible
      }
    } else {
      if (this.level.dynamic.accessible) {
        ctx.fillStyle = '#8c5d63'
      } else {
        ctx.fillStyle = '#999'
      }
    }

    ctx.fillRect(
      position.x,
      position.y,
      width,
      height,
    )

    ctx.fillStyle = '#f7f3ef'
    ctx.font = '10px Arial'
    ctx.fillText(`${this.level.fixed.number}`, position.x + 4, position.y + 12)
  }
}
