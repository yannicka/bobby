import { Cell, CELL_SIZE, cells as cellsIndex, Coin, End, Start } from './Cell'
import { Player } from './Player'
import { Point } from './Point'

export class Map {
  private readonly cells: Array<Array<Cell>>

  public constructor(cells: Array<Array<number>>) {
    this.cells = []

    for (let y = 0 ; y < cells.length ; y += 1) {
      this.cells[y] = []

      for (let x = 0 ; x < cells[y].length ; x += 1) {
        const i = cells[y][x]

        if (i !== 0) {
          this.cells[y][x] = cellsIndex[i](new Point(x, y))
        }
      }
    }
  }

  public update(dt: number): void {
    if (this.countCoins() === 0) {
      const endCell = this.getEndCell()

      if (!endCell.isActive()) {
        endCell.activate()
      }
    }

    for (let y = 0 ; y < this.cells.length ; y += 1) {
      for (let x = 0 ; x < this.cells[y].length ; x += 1) {
        const cell = this.cells[y][x]

        if (typeof cell !== 'undefined') {
          cell.update(dt)
        }
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    for (let y = 0 ; y < this.cells.length ; y += 1) {
      for (let x = 0 ; x < this.cells[y].length ; x += 1) {
        const cell = this.cells[y][x]

        if (typeof cell !== 'undefined') {
          cell.render(ctx)
        }
      }
    }
  }

  public getCell(position: Point): Cell | undefined {
    return this.cells[position.y][position.x]
  }

  public nextStateOf(position: Point) {
    const cell = this.cells[position.y][position.x]

    if (typeof cell !== 'undefined') {
      cell.nextState()
    }
  }

  public onPassingEvent(position: Point, player: Player): void {
    const cell = this.cells[position.y][position.x]

    if (typeof cell !== 'undefined') {
      cell.onPassingEvent(player)
    }
  }

  public startLocation(): Point | null {
    for (let y = 0 ; y < this.cells.length ; y += 1) {
      for (let x = 0 ; x < this.cells[y].length ; x += 1) {
        const cell = this.cells[y][x]

        if (cell instanceof Start) {
          return cell.getPosition().clone()
        }
      }
    }

    return null
  }

  public getEndCell(): End | null {
    for (let y = 0 ; y < this.cells.length ; y += 1) {
      for (let x = 0 ; x < this.cells[y].length ; x += 1) {
        const cell = this.cells[y][x]

        if (cell instanceof End) {
          return cell
        }
      }
    }

    return null
  }

  public countCoins(): number {
    let nbCoins = 0

    for (let y = 0 ; y < this.cells.length ; y += 1) {
      for (let x = 0 ; x < this.cells[y].length ; x += 1) {
        const cell = this.cells[y][x]

        if (cell instanceof Coin && !cell.isCollected()) {
          nbCoins += 1
        }
      }
    }

    return nbCoins
  }

  public getSize(): { width: number; height: number } {
    return {
      width: this.cells[0].length,
      height: this.cells.length,
    }
  }

  public getDisplayedSize(): { width: number; height: number } {
    let { width, height } = this.getSize()

    width *= CELL_SIZE
    height *= CELL_SIZE

    return {
      width,
      height,
    }
  }
}
