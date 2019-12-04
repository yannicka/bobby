import { Cell, CELL_SIZE, cells as cellsIndex, Coin, End, Start } from './Cell'
import { Game } from './Game'
import { Player } from './Player'
import { Point } from './Point'
import { Size } from './Size'

export class Map {
  private readonly cells: Array<Array<Cell>>
  private readonly endCell: End
  private nbCoins: number

  public constructor(cells: Array<Array<string>>) {
    this.cells = []

    for (let y = 0; y < cells.length; y += 1) {
      this.cells[y] = []

      for (let x = 0; x < cells[y].length; x += 1) {
        const i = cells[y][x]

        if (i !== '.') {
          this.cells[y][x] = cellsIndex[i](new Point(x, y))
        }
      }
    }

    this.endCell = this.getEndCell()

    this.nbCoins = null
  }

  public update(dt: number): void {
    if (this.nbCoins === 0) {
      if (!this.endCell.isActive()) {
        this.endCell.activate()
      }
    }

    this.nbCoins = 0

    for (let y = 0; y < this.cells.length; y += 1) {
      for (let x = 0; x < this.cells[y].length; x += 1) {
        const cell = this.cells[y][x]

        if (typeof cell !== 'undefined') {
          cell.update(dt)
        }

        if (cell instanceof Coin) {
          this.nbCoins += 1
        }
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    for (let y = 0; y < this.cells.length; y += 1) {
      for (let x = 0; x < this.cells[y].length; x += 1) {
        const cell = this.cells[y][x]

        if (typeof cell !== 'undefined') {
          cell.render(ctx)
        }
      }
    }
  }

  public getCell(position: Point): Cell | null {
    if (typeof this.cells[position.y] !== 'undefined') {
      if (typeof this.cells[position.y][position.x] !== 'undefined') {
        return this.cells[position.y][position.x]
      }
    }

    return null
  }

  public getCellAt(x: number, y: number): Cell | null {
    return this.getCell(new Point(x, y))
  }

  public onAfterPlayerOut(position: Point): void {
    const cell = this.getCellAt(position.x, position.y)

    if (cell !== null) {
      cell.onAfterPlayerOut()
    }
  }

  public onAfterPlayerIn(position: Point, player: Player, game: Game): void {
    const cell = this.getCellAt(position.x, position.y)

    if (cell !== null) {
      const newCell = cell.onAfterPlayerIn(player, game)

      if (cell !== newCell) {
        if (newCell === null) {
          this.cells[position.y][position.x] = undefined
        } else {
          this.cells[position.y][position.x] = newCell
        }
      }
    }
  }

  public getStartPosition(): Point | null {
    for (let y = 0; y < this.cells.length; y += 1) {
      for (let x = 0; x < this.cells[y].length; x += 1) {
        const cell = this.cells[y][x]

        if (cell instanceof Start) {
          return cell.getPosition().clone()
        }
      }
    }

    return null
  }

  public getSize(): Size {
    return new Size(this.cells[0].length, this.cells.length)
  }

  public getDisplayedSize(): Size {
    const size = this.getSize().clone()

    size.width *= CELL_SIZE
    size.height *= CELL_SIZE

    return size
  }

  private getEndCell(): End | null {
    if (this.endCell instanceof End) {
      return this.endCell
    }

    for (let y = 0; y < this.cells.length; y += 1) {
      for (let x = 0; x < this.cells[y].length; x += 1) {
        const cell = this.cells[y][x]

        if (cell instanceof End) {
          return cell
        }
      }
    }

    return null
  }
}
