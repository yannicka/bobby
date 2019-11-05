import { AnimationManager } from './AnimationManager'
import { Direction } from './Direction'
import { GameScene } from './GameScene'
import { ImageManager } from './ImageManager'
import { Player } from './Player'
import { Point } from './Point'
import { Rotation } from './Rotation'

export const CELL_SIZE = 16

export abstract class Cell {
  private readonly position: Point
  private readonly animation: AnimationManager

  protected constructor(position: Point) {
    this.position = position

    const image = ImageManager.getImage('tiles')

    this.animation = new AnimationManager(image, CELL_SIZE, CELL_SIZE)
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

  // Évènement : avant que le joueur n'entre dans la case
  public onBeforePlayerIn(_player: Player): void {
  }

  // Évènement : lorsque le joueur est entièrement dans la case
  public onAfterPlayerIn(_player: Player, _gameScene: GameScene): this | null {
    return this
  }

  // Évènement : lorsque le joueur a quitté la case
  public onAfterPlayerOut(): void {
  }

  // Est-ce qu'on peut rentrer sur la case ?
  public canEnter?(_direction: Direction): boolean {
    return false
  }

  // Est-ce qu'on peut sortir de la case ?
  public canLeave?(_direction: Direction): boolean {
    return false
  }

  public getPosition(): Point {
    return this.position
  }

  public getAnimation(): AnimationManager {
    return this.animation
  }
}

// Rocher
export class Stone extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 0 ])

    this.getAnimation().play('idle')
  }

  public canEnter(): boolean {
    return true
  }
}

// Bouton
export class Button extends Cell {
  private value: number

  public constructor(position: Point, value: number) {
    super(position)

    this.value = value

    this.getAnimation().addAnimation('activated', [ 80 ])
    this.getAnimation().addAnimation('deactivated-1', [ 81 ])
    this.getAnimation().addAnimation('deactivated-2', [ 82 ])
    this.getAnimation().addAnimation('deactivated-3', [ 83 ])

    this.getAnimation().play(`deactivated-${this.value}`)
  }

  public onAfterPlayerOut(): void {
    this.value -= 1

    if (this.value === 0) {
      this.getAnimation().play('activated')
    } else {
      this.getAnimation().play(`deactivated-${this.value}`)
    }
  }

  public canEnter(_direction: Direction): boolean {
    return this.value === 0
  }
}

// Tapis roulant
export class Conveyor extends Cell {
  private readonly direction: Direction

  public constructor(position: Point, direction: Direction) {
    super(position)

    this.direction = direction

    this.getAnimation().addAnimation(Direction.Up.toString(), [ 30, 31, 32, 33 ], {
      frameDuration: 0.08,
    })

    this.getAnimation().addAnimation(Direction.Right.toString(), [ 40, 41, 42, 43 ], {
      frameDuration: 0.08,
    })

    this.getAnimation().addAnimation(Direction.Down.toString(), [ 50, 51, 52, 53 ], {
      frameDuration: 0.08,
    })

    this.getAnimation().addAnimation(Direction.Left.toString(), [ 60, 61, 62, 63 ], {
      frameDuration: 0.08,
    })

    this.getAnimation().play(direction.toString())
  }

  public onAfterPlayerIn(player: Player, _gameScene: GameScene): this | null {
    player.move(this.direction, 'idle')

    return this
  }
}

// Tourniquet
export class Turnstile extends Cell {
  private angle: Rotation

  public constructor(position: Point, angle: Rotation) {
    super(position)

    this.angle = angle

    this.getAnimation().addAnimation(Rotation.UpLeft.toString(), [ 70 ])
    this.getAnimation().addAnimation(Rotation.UpRight.toString(), [ 71 ])
    this.getAnimation().addAnimation(Rotation.DownRight.toString(), [ 72 ])
    this.getAnimation().addAnimation(Rotation.DownLeft.toString(), [ 73 ])

    this.getAnimation().addAnimation(Rotation.Horizontal.toString(), [ 74 ])
    this.getAnimation().addAnimation(Rotation.Vertical.toString(), [ 75 ])

    this.getAnimation().addAnimation(Rotation.Up.toString(), [ 76 ])
    this.getAnimation().addAnimation(Rotation.Right.toString(), [ 77 ])
    this.getAnimation().addAnimation(Rotation.Down.toString(), [ 78 ])
    this.getAnimation().addAnimation(Rotation.Left.toString(), [ 79 ])

    this.getAnimation().play(angle.toString())
  }

  public onAfterPlayerOut(): void {
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

      case Rotation.Up:
        this.angle = Rotation.Right
        break

      case Rotation.Right:
        this.angle = Rotation.Down
        break

      case Rotation.Down:
        this.angle = Rotation.Left
        break

      case Rotation.Left:
        this.angle = Rotation.Up
        break
    }

    this.getAnimation().play(this.angle.toString())
  }

  public canEnter(direction: Direction): boolean {
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

      case Rotation.Up:
        return direction === Direction.Down

      case Rotation.Right:
        return direction === Direction.Left

      case Rotation.Down:
        return direction === Direction.Up

      case Rotation.Left:
        return direction === Direction.Right
    }
  }

  public canLeave(direction: Direction): boolean {
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

      case Rotation.Up:
        return direction === Direction.Up

      case Rotation.Right:
        return direction === Direction.Right

      case Rotation.Down:
        return direction === Direction.Down

      case Rotation.Left:
        return direction === Direction.Left
    }
  }
}

// Balise de début de niveau
export class Start extends Cell {
  public constructor(position: Point) {
    super(position)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Pas de rendu
  }
}

// Balise de fin de niveau
export class End extends Cell {
  private active: boolean

  public constructor(position: Point) {
    super(position)

    this.active = false

    this.getAnimation().addAnimation('inactive', [ 20 ])

    this.getAnimation().addAnimation('active', [ 21, 22 ], {
      frameDuration: 0.1,
    })

    this.getAnimation().play('inactive')
  }

  public onAfterPlayerIn(player: Player, gameScene: GameScene): this | null {
    if (this.isActive()) {
      player.setImmobility(true)
      player.getAnimationManager().play('turn')

      setTimeout(() => { gameScene.nextLevel() }, 480)
    }

    return this
  }

  public activate(): void {
    this.active = true

    this.getAnimation().play('active')
  }

  public isActive(): boolean {
    return this.active
  }
}

// Pièce
export class Coin extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 10 ])

    this.getAnimation().play('idle')
  }

  public onAfterPlayerIn(_player: Player, _gameScene: GameScene): this | null {
    return null
  }
}

// Glace
export class Ice extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 2 ])

    this.getAnimation().play('idle')
  }

  public onAfterPlayerIn(player: Player, _gameScene: GameScene): this | null {
    player.move(player.getDirection(), 'idle')

    return this
  }
}

// Élévation de terrain / Motte de terre
export class Elevation extends Cell {
  public constructor(position: Point) {
    super(position)

    this.getAnimation().addAnimation('idle', [ 1 ])

    this.getAnimation().play('idle')
  }

  public onBeforePlayerIn(player: Player): void {
    player.getAnimationManager().play(`jump-${Direction.Down.toString()}`, true)
  }

  public onAfterPlayerIn(player: Player, _gameScene: GameScene): this | null {
    player.move(player.getDirection(), null)

    return this
  }

  public canEnter(direction: Direction): boolean {
    if (direction === Direction.Down) {
      return false
    }

    return true
  }
}

export const cells: { [key: string]: (position: Point) => Cell } = {
  '#': (position: Point): Cell => new Stone(position),

  'S': (position: Point): Cell => new Start(position),
  'E': (position: Point): Cell => new End(position),

  '$': (position: Point): Cell => new Coin(position),

  '^': (position: Point): Cell => new Conveyor(position, Direction.Up),
  'v': (position: Point): Cell => new Conveyor(position, Direction.Down),
  '>': (position: Point): Cell => new Conveyor(position, Direction.Right),
  '<': (position: Point): Cell => new Conveyor(position, Direction.Left),

  'T': (position: Point): Cell => new Turnstile(position, Rotation.UpRight),
  'F': (position: Point): Cell => new Turnstile(position, Rotation.UpLeft),
  'J': (position: Point): Cell => new Turnstile(position, Rotation.DownRight),
  'L': (position: Point): Cell => new Turnstile(position, Rotation.DownLeft),

  '=': (position: Point): Cell => new Turnstile(position, Rotation.Horizontal),
  'H': (position: Point): Cell => new Turnstile(position, Rotation.Vertical),

  '8': (position: Point): Cell => new Turnstile(position, Rotation.Up),
  '6': (position: Point): Cell => new Turnstile(position, Rotation.Right),
  '2': (position: Point): Cell => new Turnstile(position, Rotation.Down),
  '4': (position: Point): Cell => new Turnstile(position, Rotation.Left),

  'B': (position: Point): Cell => new Button(position, 1),
  'B2': (position: Point): Cell => new Button(position, 2),
  'B3': (position: Point): Cell => new Button(position, 3),

  '!': (position: Point): Cell => new Ice(position),
  'U': (position: Point): Cell => new Elevation(position),
}
