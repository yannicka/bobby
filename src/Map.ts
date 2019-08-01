import { CELL_SIZE, CellType, cells as cellsIndex, nextState, onPassingEvent } from './Cell'
import Point from './Point'
import Player from './Player'

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
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE / 4)
          ctx.fillRect(x * CELL_SIZE + CELL_SIZE - CELL_SIZE / 4, y * CELL_SIZE, CELL_SIZE / 4, CELL_SIZE)
        }

        if (cell === CellType.TurnstileUpLeft) {
          ctx.fillStyle = 'red'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE / 4)
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE / 4, CELL_SIZE)
        }

        if (cell === CellType.TurnstileDownRight) {
          ctx.fillStyle = 'red'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE - CELL_SIZE / 4, CELL_SIZE, CELL_SIZE / 4)
          ctx.fillRect(x * CELL_SIZE + CELL_SIZE - CELL_SIZE / 4, y * CELL_SIZE, CELL_SIZE / 4, CELL_SIZE)
        }

        if (cell === CellType.TurnstileDownLeft) {
          ctx.fillStyle = 'red'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE - CELL_SIZE / 4, CELL_SIZE, CELL_SIZE / 4)
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE / 4, CELL_SIZE)
        }

        if (cell === CellType.ConveyorBeltRight) {
          ctx.fillStyle = 'purple'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          ctx.strokeStyle = 'white'
          ctx.lineWidth = 4
          ctx.moveTo(x * CELL_SIZE, y * CELL_SIZE)
          ctx.lineTo(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2)
          ctx.lineTo(x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE)
          ctx.stroke()
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

  public onPassingEvent(position: Point, player: Player) {
    const cell = this.cells[position.y][position.x]

    onPassingEvent(cell, player)
  }

  public static firstLevel(): Map {
    return new Map([
      [  2,  2,  2,  2,  2,  2,  2 ],
      [  2,  1,  1,  1,  1,  1,  2 ],
      [  2,  1,  1,  8,  8,  1,  2 ],
      [  2,  1,  1, 10,  1,  1,  2 ],
      [  2,  1,  1,  2,  2,  1,  2 ],
      [  2,  1,  1,  1,  2,  1,  2 ],
      [  2,  2,  2,  2,  2,  2,  2 ],
    ])
  }
}
