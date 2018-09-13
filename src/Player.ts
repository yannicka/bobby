import { CELL_SIZE } from './Cell'
import Point from './Point'
import Direction from './Direction'

export default class Player {
  public position: Point
  public startPosition: Point
  public targetPosition: Point
  public canmove: boolean
  private mov: number
  private timer = 0

  public constructor() {
    this.position = new Point(CELL_SIZE, CELL_SIZE)
    this.targetPosition = this.position.clone()
    this.canmove = true
    this.mov = 0
  }

  public update(dt: number) {
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

  public render(ctx: CanvasRenderingContext2D) {
    if (this.mov === 0)
      ctx.fillStyle = 'red'
    else if (this.mov === 1)
      ctx.fillStyle = 'blue'
    else if (this.mov === 2)
      ctx.fillStyle = 'yellow'

    ctx.fillRect(this.position.x, this.position.y, CELL_SIZE, CELL_SIZE)
  }

  public move(direction: Direction) {
    if (!this.canmove)
      return

    this.canmove = false
    this.startPosition = this.position.clone()
    this.targetPosition = this.position.clone()

    switch (direction) {
      case Direction.Up:
        this.targetPosition.y -= CELL_SIZE
        break

      case Direction.Down:
        this.targetPosition.y += CELL_SIZE
        break

      case Direction.Right:
        this.targetPosition.x += CELL_SIZE
        break

      case Direction.Left:
        this.targetPosition.x -= CELL_SIZE
        break
    }
  }
}

function linear(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}
