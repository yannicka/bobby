import { Direction } from './Direction'
import { Pointer } from './input/Pointer'
import { Player } from './Player'
import { Point } from './Point'

export class Joystick {
  private readonly pointer: Pointer
  private readonly outerRadius: number
  private readonly innerRadius: number
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private position: Point
  private zoom: number

  public constructor(pointer: Pointer, position: Point) {
    this.pointer = pointer
    this.position = position

    this.zoom = 1

    this.outerRadius = 8
    this.innerRadius = 5

    this.canvas = document.getElementById('joystick') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
  }

  public render(): void {
    const margin = 120 // nombre arbitraire

    this.canvas.width = this.outerRadius * 2 * this.zoom + margin
    this.canvas.height = this.outerRadius * 2 * this.zoom + margin

    this.canvas.style.left = `${this.position.x - (this.canvas.width / 2)}px`
    this.canvas.style.top = `${this.position.y - (this.canvas.height / 2)}px`

    this.ctx.save()
    this.ctx.scale(this.zoom, this.zoom)
    this.ctx.translate(margin / this.zoom / 2, margin / this.zoom / 2)

    this.ctx.lineWidth = 1

    this.ctx.beginPath()
    this.ctx.arc(this.outerRadius, this.outerRadius, this.outerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#999'
    this.ctx.fill()
    this.ctx.strokeStyle = '#666'
    this.ctx.stroke()

    const pointerPosition = this.computeForce()
    pointerPosition.x *= this.innerRadius
    pointerPosition.y *= this.innerRadius

    this.ctx.beginPath()
    this.ctx.arc(
      this.outerRadius + pointerPosition.x,
      this.outerRadius + pointerPosition.y,
      this.innerRadius,
      0,
      2 * Math.PI,
      false,
    )
    this.ctx.fillStyle = '#555'
    this.ctx.fill()
    this.ctx.strokeStyle = '#333'
    this.ctx.stroke()

    this.ctx.restore()
  }

  public updatePlayer(player: Player): void {
    if (this.pointer.down()) {
      const topbar = document.getElementById('topbar')
      const pointerEvent = this.pointer.getLastEvent()
      const target = pointerEvent.target as Node

      if (!topbar.contains(target)) {
        const force = this.computeForce()

        const forceNeeded = 0.65

        if (Math.abs(force.x) > Math.abs(force.y)) {
          // mouvement horizontal

          if (force.x >= forceNeeded) {
            player.move(Direction.Right)
          }

          if (force.x <= -forceNeeded) {
            player.move(Direction.Left)
          }
        } else {
          // mouvement vertical

          if (force.y >= forceNeeded) {
            player.move(Direction.Down)
          }

          if (force.y <= -forceNeeded) {
            player.move(Direction.Up)
          }
        }
      }
    }
  }

  public setPosition(position: Point): void {
    this.position = position
  }

  public show(): void {
    this.canvas.style.display = 'block'
  }

  public hide(): void {
    this.canvas.style.display = 'none'
  }

  public getZoom(): number {
    return this.zoom
  }

  public setZoom(zoom: number) {
    this.zoom = zoom
  }

  // @see https://codepen.io/jiffy/pen/zrqwON
  // @see https://stackoverflow.com/a/20916980
  private computeForce(): Point {
    const position = this.position.clone()
    position.x /= this.zoom
    position.y /= this.zoom

    const pointerPosition = this.pointer.getPosition().clone()
    pointerPosition.x /= this.zoom
    pointerPosition.y /= this.zoom

    const angle = Point.angleBetween(position, pointerPosition)

    const a = pointerPosition.x - position.x
    const b = pointerPosition.y - position.y

    let distance = Math.sqrt(a * a + b * b)

    const coords = new Point(0, 0)
    distance = Math.min(distance, this.innerRadius)

    coords.x = distance * Math.cos(angle)
    coords.y = distance * Math.sin(angle)

    coords.x /= this.innerRadius
    coords.y /= this.innerRadius

    return coords
  }
}
