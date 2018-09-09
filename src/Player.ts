import { CELL_SIZE } from './consts'
import Point from './Point';

export default class Player {
    public x: number
    public y: number
    public velocity: Point
    private canmove: boolean

    public constructor() {
      this.x = 1
      this.y = 1

      this.canmove = true
      this.velocity = new Point(0, 0)
    }

    public update(dt: number) {
      this.x += this.velocity.x * dt
      this.y += this.velocity.y * dt
    }

    public render(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'red'
      ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
    }
  }
