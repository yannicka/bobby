import { Direction } from './Direction'
import { Game } from './Game'
import { Pointer } from './input/Pointer'
import { Player } from './Player'
import { Point } from './Point'

export class Joystick {
    private readonly game: Game
    private readonly pointer: Pointer
    private readonly position: Point
    private readonly outerRadius: number
    private readonly innerRadius: number

    public constructor(game: Game, pointer: Pointer, position: Point) {
        this.game = game
        this.pointer = pointer
        this.position = position

        this.outerRadius = 18
        this.innerRadius = 12
    }

    public update(dt: number): void {
        if (this.pointer.down()) {
            console.log(this.pointer.getPosition())
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.outerRadius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'darkgray'
        ctx.fill()

        const pointerPosition = this.computeForce()
        pointerPosition.x *= this.innerRadius
        pointerPosition.y *= this.innerRadius
        pointerPosition.x += this.position.x
        pointerPosition.y += this.position.y

        ctx.beginPath()
        ctx.arc(pointerPosition.x, pointerPosition.y, this.innerRadius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'gray'
        ctx.fill()
    }

    // @see https://codepen.io/jiffy/pen/zrqwON
    // @see https://stackoverflow.com/a/20916980
    private computeForce(): Point {
        const pointerPosition = this.pointer.getPosition().clone()
        pointerPosition.x /= this.game.getZoom()
        pointerPosition.y /= this.game.getZoom()

        const angle = Point.angleBetween(this.position, pointerPosition)

        const a = pointerPosition.x - this.position.x
        const b = pointerPosition.y - this.position.y

        let distance = Math.sqrt(a * a + b * b)

        const coords = new Point(0, 0)
        distance = Math.min(distance, this.innerRadius)

        coords.x = distance * Math.cos(angle)
        coords.y = distance * Math.sin(angle)

        coords.x /= this.innerRadius
        coords.y /= this.innerRadius

        return coords
    }

    public updatePlayer(player: Player): void {
        if (this.pointer.down()) {
            const force = this.computeForce()

            const direction: Direction | null = null

            if (Math.abs(force.x) > Math.abs(force.y)) {
                // mouvement horizontal
                if (force.x >= 0.5) {
                    player.move(Direction.Right)
                }

                if (force.x <= -0.5) {
                    player.move(Direction.Left)
                }
            } else {
                // mouvement vertical

                if (force.y >= 0.5) {
                    player.move(Direction.Down)
                }

                if (force.y <= -0.5) {
                    player.move(Direction.Up)
                }
            }

        }
    }
}
