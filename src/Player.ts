import { CELL_SIZE } from './Cell'
import Point from './Point'
import Direction from './Direction'
import Game from './Game'
import AnimationManager from './AnimationManager'
import ImageManager from './ImageManager';

export default class Player {
  private canmove: boolean
  private position: Point
  private previousPosition: Point
  private startPosition: Point
  private targetPosition: Point
  private displayPosition: Point
  private timer: number
  private game: Game
  private animationManager: AnimationManager

  public constructor(game: Game, start: Point) {
    const startX = start.x
    const startY = start.y

    this.game = game
    this.position = new Point(startX, startY)
    this.previousPosition = this.position.clone()
    this.startPosition = new Point(startX * CELL_SIZE, startY * CELL_SIZE)
    this.targetPosition = this.startPosition.clone()
    this.displayPosition = this.startPosition.clone()
    this.canmove = true
    this.timer = 0

    const image = ImageManager.getImage('player')

    this.animationManager = new AnimationManager(image, 14, 15)

    this.animationManager.addAnimation(Direction.Up.toString(), [ 8, 9, 10, 11, 8 ], 0.04, false)
    this.animationManager.addAnimation(Direction.Down.toString(), [ 0, 1, 2, 3, 0 ], 0.04, false)
    this.animationManager.addAnimation(Direction.Right.toString(), [ 12, 13, 14, 15, 12 ], 0.04, false)
    this.animationManager.addAnimation(Direction.Left.toString(), [ 4, 5, 6, 7, 4 ], 0.04, false)

    this.animationManager.play(Direction.Down.toString())
  }

  public update(dt: number): void {
    this.animationManager.update(dt)

    // Déplace le joueur tant qu'il n'a plus de contrôles
    if (!this.canmove) {
      this.timer += dt * 5

      this.displayPosition.x = linear(this.startPosition.x, this.targetPosition.x, this.timer)
      this.displayPosition.y = linear(this.startPosition.y, this.targetPosition.y, this.timer)

      // Une fois le temps écoulé, remise à zéro du compteur, autorisation du
      // déplacement et positionne le joueur sur sa cible
      if (this.timer >= 1) {
        this.timer = 0
        this.canmove = true
        this.displayPosition = this.targetPosition.clone()

        this.game.getMap().onPassingEvent(this.position, this)
        this.game.getMap().nextStateOf(this.previousPosition)
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.displayPosition.x + 1, this.displayPosition.y - 4)

    this.animationManager.render(ctx)

    ctx.restore()
  }

  public move(direction: Direction): void {
    if (!this.canmove)
      return

    this.animationManager.play(direction.toString(), true)

    const newMapPosition = this.position.clone()

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

    const previousCell = this.game.getMap().getCell(this.position)
    const nextCell = this.game.getMap().getCell(newMapPosition)

    if (previousCell.isBlocking(direction) || nextCell.isSolid(direction))
      return

    this.moveTo(newMapPosition)
  }

  public isAbleToMove(): boolean {
    return this.canmove
  }

  private moveTo(poisiton: Point) {
    this.previousPosition = this.position
    this.position = poisiton
    this.canmove = false

    this.startPosition = this.targetPosition.clone()
    this.targetPosition.x = this.position.x * CELL_SIZE
    this.targetPosition.y = this.position.y * CELL_SIZE
  }
}

function linear(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}
