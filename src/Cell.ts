import Rotation from './Rotation'
import AnimationManager from './AnimationManager'
import Direction from './Direction'
import ImageManager from './ImageManager'
import Player from './Player'
import Point from './Point'

export const CELL_SIZE = 16

/*

export enum CellType {
  Ground, // Sol

  Grass, // Herbe (bloquant : impossible de marcher dessus)
  Fence, // Barrière (bloquant)

  SpadeDeactivated, // Pique avant que l'on marche dessus
  SpadeActivated,   // Pique après avoir marché dessus

  ConveyorBeltUp,    // Tapis roulant vers le haut
  ConveyorBeltDown,  // Tapis roulant vers le bas
  ConveyorBeltRight, // Tapis roulant vers la droite
  ConveyorBeltLeft,  // Tapis roulant vers la gauche

  TurnstileUpRight,   // Tourniquet (haut/droite)
  TurnstileUpLeft,    // Tourniquet (haut/gauche)
  TurnstileDownRight, // Tourniquet (bas/droite)
  TurnstileDownLeft,  // Tourniquet (bas/gauche)

  Start, // Balise de début de niveau
  End,   // Balise de fin de niveau

  Carrot,     // Carotte à manger
  CarrotHole, // Trou de carotte (s'affiche après avoir mangé la carotte)
}

*/

export abstract class Cell {
  private position: Point
  private animation: AnimationManager

  public constructor(position: Point) {
    this.position = position

    const image = ImageManager.getImage('tiles')

    this.animation = new AnimationManager(image, CELL_SIZE, CELL_SIZE)
  }

  public onPassingEvent(_player: Player): void {
  }

  public isSolid?(_direction: Direction): boolean {
    return false
  }

  public isBlocking?(_direction: Direction): boolean {
    return false
  }

  public nextState(): void {
  }

  public update(dt: number): void {
    this.animation.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.position.x * CELL_SIZE, this.position.y * CELL_SIZE)

    this.animation.render(ctx)

    ctx.restore()
  }

  public getPosition(): Point {
    return this.position
  }

  public getAnimation(): AnimationManager {
    return this.animation
  }
}

export class Ground extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 14 ])

    this.getAnimation().play('idle')
  }
}

export class Grass extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 0 ])

    this.getAnimation().play('idle')
  }

  public isSolid(_direction: Direction): boolean {
    return true
  }
}

export class Fence extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 3 ])

    this.getAnimation().play('idle')
  }

  public isSolid(_direction: Direction): boolean {
    return true
  }
}

export class Spade extends Cell {
  private activated: boolean

  public constructor(position: Point) {
    super(position)

    this.activated = false

    this.getAnimation().addAnimation('deactivated', [ 1 ])
    this.getAnimation().addAnimation('activated', [ 2 ])

    this.getAnimation().play('deactivated')
  }

  public nextState(): void {
    this.activated = true

    this.getAnimation().play('activated')
  }

  public isSolid(_direction: Direction): boolean {
    return this.activated
  }
}

export class Conveyor extends Cell {
  private direction: Direction

  public constructor(position: Point, direction: Direction) {
    super(position)

    this.direction = direction

    this.getAnimation().addAnimation(Direction.Up.toString(), [ 4, 20 ], { frameDuration: 0.1 })
    this.getAnimation().addAnimation(Direction.Down.toString(), [ 5, 21 ], { frameDuration: 0.1 })
    this.getAnimation().addAnimation(Direction.Right.toString(), [ 6, 22 ], { frameDuration: 0.1 })
    this.getAnimation().addAnimation(Direction.Left.toString(), [ 7, 23 ], { frameDuration: 0.1 })

    this.getAnimation().play(direction.toString())
  }

  public onPassingEvent(player: Player): void {
    player.move(this.direction)
  }
}

export class Turnstile extends Cell {
  private angle: Rotation

  public constructor(position: Point, angle: Rotation) {
    super(position)

    this.angle = angle

    this.getAnimation().addAnimation(Rotation.UpRight.toString(), [ 8 ])
    this.getAnimation().addAnimation(Rotation.UpLeft.toString(), [ 9 ])
    this.getAnimation().addAnimation(Rotation.DownRight.toString(), [ 10 ])
    this.getAnimation().addAnimation(Rotation.DownLeft.toString(), [ 11 ])
    this.getAnimation().addAnimation(Rotation.Horizontal.toString(), [ 25 ])
    this.getAnimation().addAnimation(Rotation.Vertical.toString(), [ 26 ])

    this.getAnimation().play(angle.toString())
  }

  public nextState(): void {
    switch (this.angle) {
      case Rotation.UpRight:
        this.angle = Rotation.DownRight
        break

      case Rotation.UpLeft:
        this.angle = Rotation.UpRight
        break

      case Rotation.DownRight:
        this.angle = Rotation.DownLeft
        break

      case Rotation.DownLeft:
        this.angle = Rotation.UpLeft
        break

      case Rotation.Vertical:
        this.angle = Rotation.Horizontal
        break

      case Rotation.Horizontal:
        this.angle = Rotation.Vertical
        break
    }

    this.getAnimation().play(this.angle.toString())
  }

  public isSolid(direction: Direction): boolean {
    switch (this.angle) {
      case Rotation.UpRight:
        return [ Direction.Down, Direction.Left ].includes(direction)

      case Rotation.UpLeft:
        return [ Direction.Down, Direction.Right ].includes(direction)

      case Rotation.DownRight:
        return [ Direction.Up, Direction.Left ].includes(direction)

      case Rotation.DownLeft:
        return [ Direction.Up, Direction.Right ].includes(direction)

      case Rotation.Vertical:
        return [ Direction.Right, Direction.Left ].includes(direction)

      case Rotation.Horizontal:
        return [ Direction.Up, Direction.Down ].includes(direction)
    }
  }

  public isBlocking(direction: Direction): boolean {
    switch (this.angle) {
      case Rotation.UpRight:
        return [ Direction.Up, Direction.Right ].includes(direction)

      case Rotation.UpLeft:
        return [ Direction.Up, Direction.Left ].includes(direction)

      case Rotation.DownRight:
        return [ Direction.Down, Direction.Right ].includes(direction)

      case Rotation.DownLeft:
        return [ Direction.Down, Direction.Left ].includes(direction)

      case Rotation.Vertical:
        return [ Direction.Right, Direction.Left ].includes(direction)

      case Rotation.Horizontal:
        return [ Direction.Up, Direction.Down ].includes(direction)
    }
  }
}

export class Start extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 12 ])

    this.getAnimation().play('idle')
  }
}

export class End extends Cell {
  private active: boolean

  public constructor(position: Point) {
    super(position)

    this.active = false

    this.getAnimation().addAnimation('inactive', [ 13 ])
    this.getAnimation().addAnimation('active', [ 17, 18 ], { frameDuration: 0.1 })

    this.getAnimation().play('inactive')
  }

  public onPassingEvent(player: Player): void {
    if (this.isActive()) {
      player.nextLevel()
    }
  }

  public activate(): void {
    this.active = true

    this.getAnimation().play('active')
  }

  public isActive(): boolean {
    return this.active
  }
}

export class Carrot extends Cell {
  private eated: boolean

  public constructor(position: Point) {
    super(position)

    this.eated = false

    this.getAnimation().addAnimation('not-eated', [ 15 ])
    this.getAnimation().addAnimation('eated', [ 16 ])

    this.getAnimation().play('not-eated')
  }

  public onPassingEvent(_player: Player): void {
    this.eated = true

    this.getAnimation().play('eated')
  }

  public isEated(): boolean {
    return this.eated
  }
}

export class Ice extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 24 ])

    this.getAnimation().play('idle')
  }

  public onPassingEvent(player: Player): void {
    player.move(player.getDirection())
  }
}

export const cells: { [key: number]: (position: Point) => Cell } = {
  1: (position: Point): Cell => new Ground(position),

  2: (position: Point): Cell => new Grass(position),
  3: (position: Point): Cell => new Fence(position),

  4: (position: Point): Cell => new Spade(position),

  6: (position: Point): Cell => new Conveyor(position, Direction.Up),
  7: (position: Point): Cell => new Conveyor(position, Direction.Down),
  8: (position: Point): Cell => new Conveyor(position, Direction.Right),
  9: (position: Point): Cell => new Conveyor(position, Direction.Left),

  10: (position: Point): Cell => new Turnstile(position, Rotation.UpRight),
  11: (position: Point): Cell => new Turnstile(position, Rotation.UpLeft),
  12: (position: Point): Cell => new Turnstile(position, Rotation.DownRight),
  13: (position: Point): Cell => new Turnstile(position, Rotation.DownLeft),

  14: (position: Point): Cell => new Start(position),
  15: (position: Point): Cell => new End(position),

  16: (position: Point): Cell => new Carrot(position),

  17: (position: Point): Cell => new Ice(position),

  18: (position: Point): Cell => new Turnstile(position, Rotation.Horizontal),
  19: (position: Point): Cell => new Turnstile(position, Rotation.Vertical),
}
