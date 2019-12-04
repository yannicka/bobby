import { Point } from './Point'

export class Joystick {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  private readonly outerRadius: number
  private readonly innerRadius: number

  private startPosition: Point
  private pointerPosition: Point

  private scale: number

  public constructor() {
    this.canvas = document.getElementById('joystick') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.outerRadius = 8
    this.innerRadius = 5

    this.startPosition = new Point(0, 0)
    this.pointerPosition = new Point(0, 0)

    this.scale = 1
  }

  public render(): void {
    const margin = 120 // arbitrary number

    this.canvas.width = this.outerRadius * 2 * this.scale + margin
    this.canvas.height = this.outerRadius * 2 * this.scale + margin

    this.canvas.style.left = `${this.startPosition.x - (this.canvas.width / 2)}px`
    this.canvas.style.top = `${this.startPosition.y - (this.canvas.height / 2)}px`

    this.ctx.save()
    this.ctx.scale(this.scale, this.scale)
    this.ctx.translate(margin / this.scale / 2, margin / this.scale / 2)

    this.ctx.lineWidth = 1

    this.ctx.beginPath()
    this.ctx.arc(this.outerRadius, this.outerRadius, this.outerRadius, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = '#999'
    this.ctx.fill()
    this.ctx.strokeStyle = '#666'
    this.ctx.stroke()

    const pointerPosition = this.getAxisValues()
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

  public getStartPosition(): Point {
    return this.startPosition
  }

  public setStartPosition(position: Point): void {
    this.startPosition = position
  }

  public getPointerPosition(): Point {
    return this.pointerPosition
  }

  public setPointerPosition(position: Point): void {
    this.pointerPosition = position
  }

  public show(): void {
    this.canvas.style.display = 'block'
  }

  public hide(): void {
    this.canvas.style.display = 'none'
  }

  public getScale(): number {
    return this.scale
  }

  public setScale(scale: number): void {
    this.scale = scale
  }

  // @see https://codepen.io/jiffy/pen/zrqwON
  // @see https://stackoverflow.com/a/20916980
  public getAxisValues(): Point {
    const startPosition = this.startPosition.clone()
    startPosition.x /= this.scale
    startPosition.y /= this.scale

    const pointerPosition = this.pointerPosition.clone()
    pointerPosition.x /= this.scale
    pointerPosition.y /= this.scale

    const angle = Point.angleBetween(startPosition, pointerPosition)

    const diffX = pointerPosition.x - startPosition.x
    const diffY = pointerPosition.y - startPosition.y

    let distance = Math.sqrt(diffX * diffX + diffY * diffY)

    const coords = new Point(0, 0)
    distance = Math.min(distance, this.innerRadius)

    coords.x = distance * Math.cos(angle)
    coords.y = distance * Math.sin(angle)

    coords.x /= this.innerRadius
    coords.y /= this.innerRadius

    return coords
  }
}
