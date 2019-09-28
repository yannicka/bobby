import { Direction } from './Direction'
import { Game } from './Game'
import { Pointer } from './input/Pointer'
import { Player } from './Player'
import { Point } from './Point'

export class Joystick {
    private readonly game: Game
    private readonly pointer: Pointer
    private readonly outerRadius: number
    private readonly innerRadius: number
    private position: Point

    public constructor(game: Game, pointer: Pointer, position: Point) {
        this.game = game
        this.pointer = pointer
        this.position = position

        this.outerRadius = 10
        this.innerRadius = 6
    }

    public update(dt: number): void {
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.outerRadius, 0, 2 * Math.PI, false)
        ctx.fillStyle = '#999'
        ctx.fill()
        ctx.strokeStyle = '#666'
        ctx.stroke()

        const pointerPosition = this.computeForce()
        pointerPosition.x *= this.innerRadius
        pointerPosition.y *= this.innerRadius
        pointerPosition.x += this.position.x
        pointerPosition.y += this.position.y

        ctx.beginPath()
        ctx.arc(pointerPosition.x, pointerPosition.y, this.innerRadius, 0, 2 * Math.PI, false)
        ctx.fillStyle = '#555'
        ctx.fill()
        ctx.strokeStyle = '#333'
        ctx.stroke()
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

    public setPosition(position: Point): void {
        this.position = position
    }
}
