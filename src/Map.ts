import { CELL_SIZE, CellType, cells as cellsIndex, nextState } from './Cell'
import Point from './Point';

export default class Map {
  private cells: CellType[][]

  public constructor(cells: number[][]) {
    this.cells = []

    for (let y = 0 ; y < cells.length ; y++) {
      this.cells[y] = []

      for (let x = 0 ; x < cells[y].length ; x++) {
        const i = cells[y][x]

        this.cells[y][x] = cellsIndex[i]
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {

    for (let y = 0 ; y < this.cells.length ; y++) {
      const row = this.cells[y]

      for (let x = 0 ; x < row.length ; x++) {
        const cell = row[x]

        if (cell === CellType.Grass) {
          ctx.fillStyle = 'black'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.TurnstileUpRight) {
          ctx.fillStyle = 'red'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.TurnstileUpLeft) {
          ctx.fillStyle = 'green'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.TurnstileDownRight) {
          ctx.fillStyle = 'blue'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.TurnstileDownLeft) {
          ctx.fillStyle = 'yellow'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
      }
    }
  }

  public getCell(position: Point): CellType {
    return this.cells[position.y][position.x];
  }

  public nextStateOf(position: Point) {
    const cell = this.cells[position.y][position.x]

    this.cells[position.y][position.x] = nextState(cell)
  }

  public static firstLevel(): Map {
    return new Map([
      [ 2, 2, 2, 2, 2, 2, 2 ],
      [ 2, 1, 1, 1, 1, 1, 2 ],
      [ 2, 1, 1, 10, 1, 1, 2 ],
      [ 2, 1, 1, 1, 1, 1, 2 ],
      [ 2, 1, 1, 2, 2, 1, 2 ],
      [ 2, 1, 1, 1, 2, 1, 2 ],
      [ 2, 2, 2, 2, 2, 2, 2 ],
    ])
  }
}
