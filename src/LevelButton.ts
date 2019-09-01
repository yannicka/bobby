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

    ctx.fillStyle = 'yellow'

    if (this.level.user.success) {
      if (this.level.dynamic.accessible) {
        ctx.fillStyle = '#0f0'
      } else {
        ctx.fillStyle = '#040'
      }
    } else {
      if (this.level.dynamic.accessible) {
        ctx.fillStyle = '#777'
      } else {
        ctx.fillStyle = '#333'
      }
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
