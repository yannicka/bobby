import { CELL_SIZE, isSolid } from './Cell'
import Point from './Point'
import Direction from './Direction'
import Game from './Game';

export default class Player {
  public canmove: boolean
  private mapPosition: Point
  private position: Point
  private startPosition: Point
  private targetPosition: Point
  private mov: number
  private timer = 0
  private game: Game

  public constructor(game: Game) {
    this.game = game
    this.mapPosition = new Point(1, 1)
    this.position = new Point(CELL_SIZE, CELL_SIZE)
    this.targetPosition = this.position.clone()
    this.canmove = true
    this.mov = 0
  }

  public update(dt: number): void {
    // Déplace le joueur tant qu'il n'a plus de contrôles
    if (!this.canmove) {
      this.timer += dt * 4

      this.position.x = linear(this.startPosition.x, this.targetPosition.x, this.timer)
      this.position.y = linear(this.startPosition.y, this.targetPosition.y, this.timer)

      // Une fois le temps écoulé, remise à zéro du compteur, autorisation du
      // déplacement et positionne le joueur sur sa cible
      if (this.timer >= 1) {
        this.timer = 0
        this.canmove = true
        this.position = this.targetPosition.clone()
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (this.mov === 0)
      ctx.fillStyle = 'red'
    else if (this.mov === 1)
      ctx.fillStyle = 'blue'
    else if (this.mov === 2)
      ctx.fillStyle = 'yellow'

    ctx.fillRect(this.position.x, this.position.y, CELL_SIZE, CELL_SIZE)
  }

  public move(direction: Direction): void {
    if (!this.canmove)
      return

    const newMapPosition = this.mapPosition.clone()

    switch (direction) {
      case Direction.Up:
        newMapPosition.y -= 1
        break

      case Direction.Down:
        newMapPosition.y += 1
        break

      case Direction.Right:
        newMapPosition.x += 1
        break

      case Direction.Left:
        newMapPosition.x -= 1
        break
    }

    const cell = this.game.getMap().getCell(newMapPosition)

    if (isSolid(cell))
      return

    this.mapPosition = newMapPosition
    this.canmove = false

    this.startPosition = this.position.clone()
    this.targetPosition.x = this.mapPosition.x * CELL_SIZE
    this.targetPosition.y = this.mapPosition.y * CELL_SIZE
  }
}

function linear(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}
