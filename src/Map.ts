import { CELL_SIZE } from './Cell'
import Point from './Point';

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

  public getCell(p: Point) {
    return this.cells[p.y][p.x];
  }

  public static firstLevel() {
    return new Map([
      [ 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 1, 1, 0, 1 ],
      [ 1, 0, 0, 0, 1, 0, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1 ],
    ])
  }
}
