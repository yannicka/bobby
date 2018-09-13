import { CELL_SIZE } from './Cell'

export default class Map {
  private cells: number[][]

  public constructor(cells: number[][]) {
    this.cells = cells
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black'

    for (let y = 0 ; y < this.cells.length ; y++) {
      const row = this.cells[y]

      for (let x = 0 ; x < row.length ; x++) {
        const cell = row[x]

        if (cell === 1)
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }
  }
}
