import Player from './Player'
import Direction from './Direction'
import Point from './Point'
import Angle from './Angle'

export const CELL_SIZE = 50

/*

export enum CellType {
  Ground, // Sol

  Grass, // Herbe (bloquant : impossible de marcher dessus)
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
  // private animation: Animation

  constructor(position: Point) {
    this.position = position

    // this.animation = new Animation()
  }

  public onPassingEvent(_player: Player): void {
    return null
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
    // this.animation.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // this.animation.render(ctx)

    // @todo Temporaire, histoire d'avoir un affichage en attendant
    if (this instanceof Start) {
      ctx.fillStyle = 'yellow'
    } else if (this instanceof End) {
      ctx.fillStyle = 'gold'
    } else if (this instanceof Spade) {
      ctx.fillStyle = 'gray'
    } else if (this instanceof Conveyor) {
      ctx.fillStyle = 'purple'
    } else if (this instanceof Carrot) {
      ctx.fillStyle = 'orange'
    } else if (this instanceof Turnstile) {
      ctx.fillStyle = 'blue'
    } else if (this instanceof Fence) {
      ctx.fillStyle = 'brown'
    } else if (this instanceof Grass) {
      ctx.fillStyle = 'green'
    } else if (this instanceof Ground) {
      ctx.fillStyle = 'white'
    } else {
      ctx.fillStyle = 'black'
    }

    ctx.fillRect(
      this.position.x * CELL_SIZE,
      this.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    )
  }

  public getPosition(): Point {
    return this.position
  }

  // abstract render(ctx: CanvasRenderingContext2D): void
}

export class Ground extends Cell {}

export class Grass extends Cell {
  public isSolid(_direction: Direction): boolean {
    return true
  }
}

export class Fence extends Cell {
  public isSolid(_direction: Direction): boolean {
    return true
  }
}

export class Spade extends Cell {
  private activated: boolean = false

  public nextState(): void {
    this.activated = true
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
  }

  public onPassingEvent(player: Player): void {
    player.move(this.direction)
  }
}

export class Turnstile extends Cell {
  private angle: Angle

  public constructor(position: Point, angle: Angle) {
    super(position)

    this.angle = angle
  }

  public nextState(): void {
    switch (this.angle) {
      case Angle.UpRight:
        this.angle = Angle.DownRight
        break

      case Angle.UpLeft:
        this.angle = Angle.UpRight
        break

      case Angle.DownRight:
        this.angle = Angle.DownLeft
        break

      case Angle.DownLeft:
        this.angle = Angle.UpLeft
        break
    }
  }

  public isSolid(direction: Direction): boolean {
    switch (this.angle) {
      case Angle.UpRight:
        return [ Direction.Down, Direction.Left ].includes(direction)

      case Angle.UpLeft:
        return [ Direction.Down, Direction.Right ].includes(direction)

      case Angle.DownRight:
        return [ Direction.Up, Direction.Left ].includes(direction)

      case Angle.DownLeft:
        return [ Direction.Up, Direction.Right ].includes(direction)
    }
  }

  public isBlocking(direction: Direction): boolean {
    switch (this.angle) {
      case Angle.UpRight:
        return [ Direction.Up, Direction.Right ].includes(direction)

      case Angle.UpLeft:
        return [ Direction.Up, Direction.Left ].includes(direction)

      case Angle.DownRight:
        return [ Direction.Down, Direction.Right ].includes(direction)

      case Angle.DownLeft:
        return [ Direction.Down, Direction.Left ].includes(direction)
    }
  }
}

export class Start extends Cell {}

export class End extends Cell {}

export class Carrot extends Cell {
  private eated: boolean = false

  public onPassingEvent(_player: Player): void {
    this.eated = true
  }
}

export const cells: { [key: number]: (position: Point) => Cell } = {
  1: (position: Point) => new Ground(position),

  2: (position: Point) => new Grass(position),
  3: (position: Point) => new Fence(position),

  4: (position: Point) => new Spade(position),

  6: (position: Point) => new Conveyor(position, Direction.Up),
  7: (position: Point) => new Conveyor(position, Direction.Down),
  8: (position: Point) => new Conveyor(position, Direction.Right),
  9: (position: Point) => new Conveyor(position, Direction.Left),

  10: (position: Point) => new Turnstile(position, Angle.UpRight),
  11: (position: Point) => new Turnstile(position, Angle.UpLeft),
  12: (position: Point) => new Turnstile(position, Angle.DownRight),
  13: (position: Point) => new Turnstile(position, Angle.DownLeft),

  14: (position: Point) => new Start(position),
  15: (position: Point) => new End(position),

  16: (position: Point) => new Carrot(position),
}
