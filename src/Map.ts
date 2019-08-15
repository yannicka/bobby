import { cells as cellsIndex, Cell, Start, Carrot } from './Cell'
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

        console.log(typeof Cell)

        if (cell instanceof Start) {
          return cell.getPosition().clone()
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

        if (cell instanceof Carrot) {
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
