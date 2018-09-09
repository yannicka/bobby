import { CELL_SIZE } from './consts'

export default class Player {
    public x: number
    public y: number
    private canmove: boolean

    public constructor() {
      this.x = 1
      this.y = 1

      this.canmove = true
    }

    public render(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'red'
      ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
  }
