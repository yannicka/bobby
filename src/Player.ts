import { AnimationManager } from './AnimationManager'
import { Cell, CELL_SIZE } from './Cell'
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
  private immobility: boolean
  private position: Point
  private previousPosition: Point
  private startPosition: Point
  private readonly targetPosition: Point
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
    this.immobility = false
    this.timer = 0
    this.direction = Direction.Down

    const image = ImageManager.getImage('player')

    this.animationManager = new AnimationManager(image, 14, 19)

    this.animationManager.addAnimation(`idle-${Direction.Up.toString()}`, [ 3 ])
    this.animationManager.addAnimation(`idle-${Direction.Down.toString()}`, [ 9 ])
    this.animationManager.addAnimation(`idle-${Direction.Right.toString()}`, [ 6 ])
    this.animationManager.addAnimation(`idle-${Direction.Left.toString()}`, [ 0 ])

    this.animationManager.addAnimation(`walk-${Direction.Up.toString()}`, [ 3, 4, 5, 3 ], {
      frameDuration: 0.08,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Down.toString()}`, [ 9, 10, 11, 9 ], {
      frameDuration: 0.08,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Right.toString()}`, [ 6, 7, 6 ], {
      frameDuration: 0.08,
      loop: false,
    })

    this.animationManager.addAnimation(`walk-${Direction.Left.toString()}`, [ 0, 1, 0 ], {
      frameDuration: 0.08,
      loop: false,
    })

    this.animationManager.addAnimation(`jump-${Direction.Down.toString()}`, [ 12, 13, 9 ], {
      frameDuration: 0.1,
      loop: false,
    })

    this.animationManager.addAnimation('turn', [ 9, 0, 3, 6 ], {
      frameDuration: 0.1,
      loop: true,
    })

    this.animationManager.play('turn')

    setTimeout(() => {
      this.animationManager.play(`idle-${this.direction.toString()}`)
    }, 480)
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
    ctx.translate(this.displayPosition.x + 1, this.displayPosition.y - 8)

    this.animationManager.render(ctx)

    ctx.restore()
  }

  public move(direction: Direction, animate: 'walk' | 'idle' | null = 'walk'): void {
    if (this.immobility) {
      return
    }

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

    if (
      (previousCell instanceof Cell && previousCell.isBlocking(direction))
      || (nextCell instanceof Cell && nextCell.isSolid(direction))
    ) {
      return
    }

    this.direction = direction

    if (nextCell instanceof Cell) {
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

  public setImmobility(immobility: boolean): void {
    this.immobility = immobility
  }
}
