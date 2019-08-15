import { cells as cellsIndex, Cell, Start, Carrot, End } from './Cell'
import Point from './Point'
import Player from './Player'

export default class Map {
  private cells: Array<Array<Cell>>

  public constructor(cells: number[][]) {
    this.cells = []

    for (let y = 0 ; y < cells.length ; y++) {
      this.cells[y] = []

      for (let x = 0 ; x < cells[y].length ; x++) {
        const i = cells[y][x]

        this.cells[y][x] = cellsIndex[i](new Point(x, y))
      }
    }
  }
  
  public update(dt: number): void {
    if (this.countCarrots() === 0) {
      const endCell = this.getEndCell()

      if (!endCell.isActive()) {
        endCell.activate()
      }
    }

    for (let y = 0 ; y < this.cells.length ; y++) {
      for (let x = 0 ; x < this.cells[y].length ; x++) {
        const cell = this.cells[y][x]

        cell.update(dt)
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    for (let y = 0 ; y < this.cells.length ; y++) {
      for (let x = 0 ; x < this.cells[y].length ; x++) {
        const cell = this.cells[y][x]

        cell.render(ctx)
      }
    }
  }

  public getCell(position: Point): Cell {
    return this.cells[position.y][position.x]
  }

  public nextStateOf(position: Point) {
    const cell = this.cells[position.y][position.x]

    cell.nextState()
  }

  public onPassingEvent(position: Point, player: Player) {
    const cell = this.cells[position.y][position.x]

    cell.onPassingEvent(player)
  }

  public startLocation(): Point|null {
    for (let y = 0 ; y < this.cells.length ; y++) {
      for (let x = 0 ; x < this.cells[y].length ; x++) {
        const cell = this.cells[y][x]

        if (cell instanceof Start) {
          return cell.getPosition().clone()
        }
      }
    }

    return null
  }

  public getEndCell(): End|null {
    for (let y = 0 ; y < this.cells.length ; y++) {
      for (let x = 0 ; x < this.cells[y].length ; x++) {
        const cell = this.cells[y][x]

        if (cell instanceof End) {
          return cell
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

        if (cell instanceof Carrot && !cell.isEated()) {
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
