import { CELL_SIZE } from './consts'
import Point from './Point'
import Direction from './Direction'

export default class Player {
  public position: Point
  public canmove: boolean
  private mov: number

  public constructor() {
    this.position = new Point(CELL_SIZE, CELL_SIZE)
    this.canmove = true
    this.mov = 0
  }

  public update(dt: number) {
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.mov === 0)
      ctx.fillStyle = 'red'
    else if (this.mov === 1)
      ctx.fillStyle = 'blue'
    else if (this.mov === 2)
      ctx.fillStyle = 'yellow'

    ctx.fillRect(this.position.x, this.position.y, CELL_SIZE, CELL_SIZE)
  }

  public move(direction: Direction) {
    this.canmove = false

    let incrx = 0
    let incry = 0

    switch (direction) {
      case Direction.Up:
        incry = -1
        break

      case Direction.Down:
        incry = 1
        break

      case Direction.Right:
        incrx = 1
        break

      case Direction.Left:
        incrx = -1
        break
    }

    for (let i = 0 ; i < CELL_SIZE ; i++) {
      setTimeout((i: number) => {
        this.position.x += incrx
        this.position.y += incry

        if (i >= 0 && i <= 15)
          this.mov = 1
        else if (i > 15 && i <= 35)
          this.mov = 2
        else
          this.mov = 0

        if (i == CELL_SIZE - 1)
          this.canmove = true
      }, i * 4, i)
    }
  }
}
