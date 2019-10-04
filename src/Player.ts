import { AnimationManager } from './AnimationManager'
import { CELL_SIZE } from './Cell'
import { Direction } from './Direction'
import { GameScene } from './GameScene'
import { ImageManager } from './ImageManager'
import { Map } from './Map'
import { Point } from './Point'

function linear(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t
}

export class Player {
  private readonly gameScene: GameScene
  private readonly map: Map
  private readonly animationManager: AnimationManager
  private canmove: boolean
  private position: Point
  private previousPosition: Point
  private startPosition: Point
  private targetPosition: Point
  private displayPosition: Point
  private timer: number
  private direction: Direction

  public constructor(gameScene: GameScene) {
    this.gameScene = gameScene
    this.map = this.gameScene.getMap()

    const start = this.map.getStartPosition()

    const startX = start.x
    const startY = start.y

    this.position = new Point(startX, startY)
    this.previousPosition = this.position.clone()
    this.startPosition = new Point(startX * CELL_SIZE, startY * CELL_SIZE)
    this.targetPosition = this.startPosition.clone()
    this.displayPosition = this.startPosition.clone()
    this.canmove = true
    this.timer = 0
    this.direction = Direction.Down

    const image = ImageManager.getImage('player')

    this.animationManager = new AnimationManager(image, 14, 15)

    this.animationManager.addAnimation(`idle-${Direction.Up.toString()}`, [ 8 ])
    this.animationManager.addAnimation(`idle-${Direction.Down.toString()}`, [ 0 ])
    this.animationManager.addAnimation(`idle-${Direction.Right.toString()}`, [ 12 ])
    this.animationManager.addAnimation(`idle-${Direction.Left.toString()}`, [ 4 ])

    this.animationManager.addAnimation(`walk-${Direction.Up.toString()}`, [ 8, 9, 10, 11, 8 ], {
      frameDuration: 0.04,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Down.toString()}`, [ 0, 1, 2, 3, 0 ], {
      frameDuration: 0.04,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Right.toString()}`, [ 12, 13, 14, 15, 12 ], {
      frameDuration: 0.04,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Left.toString()}`, [ 4, 5, 6, 7, 4 ], {
      frameDuration: 0.04,
      loop: false,
    })

    this.animationManager.addAnimation(`jump-${Direction.Down.toString()}`, [ 16, 17, 16, 0 ], {
      frameDuration: 0.15,
      loop: false,
    })

    this.animationManager.play(`idle-${this.direction.toString()}`)
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

        this.map.onAfterPlayerOut(this.previousPosition)
        this.map.onAfterPlayerIn(this.position, this, this.gameScene)
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.displayPosition.x + 1, this.displayPosition.y - 4)

    this.animationManager.render(ctx)

    ctx.restore()
  }

  public move(direction: Direction, animate: 'walk' | 'idle' | null = 'walk'): void {
    if (!this.canmove) {
      return
    }

    switch (animate) {
      case 'walk':
        this.animationManager.play(`walk-${direction.toString()}`, true)
        break
      case 'idle':
        this.animationManager.play(`idle-${direction.toString()}`, true)
        break
    }

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

    const previousCell = this.map.getCell(this.position)
    const nextCell = this.map.getCell(newMapPosition)

    if ((previousCell && previousCell.isBlocking(direction)) || (nextCell && nextCell.isSolid(direction))) {
      return
    }

    this.direction = direction

    if (nextCell) {
      nextCell.onBeforePlayerIn(this)
    }

    this.moveTo(newMapPosition)
  }

  public isAbleToMove(): boolean {
    return this.canmove
  }

  private moveTo(position: Point) {
    this.previousPosition = this.position
    this.position = position
    this.canmove = false

    this.startPosition = this.targetPosition.clone()
    this.targetPosition.x = this.position.x * CELL_SIZE
    this.targetPosition.y = this.position.y * CELL_SIZE
  }

  public getDirection(): Direction {
    return this.direction
  }

  public getDisplayPosition(): Point {
    return this.displayPosition
  }

  public getAnimationManager(): AnimationManager {
    return this.animationManager
  }
}
