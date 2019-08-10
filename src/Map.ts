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
          ctx.beginPath() // @see https://stackoverflow.com/a/9559703/7564882
          ctx.moveTo(x * CELL_SIZE, y * CELL_SIZE)
          ctx.lineTo(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2)
          ctx.lineTo(x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE)
          ctx.stroke()
        }

        if (cell === CellType.Carrot) {
          ctx.fillStyle = 'orange'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.CarrotHole) {
          ctx.fillStyle = 'grey'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.SpadeDeactivated) {
          ctx.fillStyle = 'darkgray'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.SpadeActivated) {
          ctx.fillStyle = 'dimgray'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        if (cell === CellType.Start) {
          ctx.fillStyle = 'grey'
          ctx.beginPath()
          ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2.6, 0, 2 * Math.PI)
          ctx.fill()
        }

        if (cell === CellType.End) {
          if (this.countCarrots() === 0) {
            ctx.fillStyle = 'green'
          } else {
            ctx.fillStyle = 'red'
          }
          ctx.beginPath()
          ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2.6, 0, 2 * Math.PI)
          ctx.fill()
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

    const newCellType = onPassingEvent(cell, player)

    if (newCellType) {
      this.cells[position.y][position.x] = newCellType
    }
  }

  public startLocation(): Point|null {
    for (let y = 0 ; y < this.cells.length ; y++) {
      const row = this.cells[y]

      for (let x = 0 ; x < row.length ; x++) {
        const cell = row[x]

        if (cell === CellType.Start) {
          return new Point(x, y)
        }
      }
    }

    return null
  }

  public countCarrots(): number {
    let nbCarrots = 0

    for (let y = 0 ; y < this.cells.length ; y++) {
      const row = this.cells[y]

      for (let x = 0 ; x < row.length ; x++) {
        const cell = row[x]

        if (cell === CellType.Carrot) {
          nbCarrots++
        }
      }
    }

    return nbCarrots
  }

  public static firstLevel(): Map {
    return new Map([
      [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
      [  2, 14,  1,  8,  8,  1,  1,  1,  2 ],
      [  2,  1,  1,  1,  1,  1,  4,  1,  2 ],
      [  2,  1,  1, 10,  1,  1,  1,  1,  2 ],
      [  2, 16,  1,  1,  1,  1,  1,  1,  2 ],
      [  2, 16,  1,  1,  1,  1,  1,  1,  2 ],
      [  2,  1,  1,  2,  2,  1,  1,  1,  2 ],
      [  2,  1,  1,  1,  2,  1,  1, 15,  2 ],
      [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
    ])
  }
}
