import Scene from './Scene'

export default class HomeScene implements Scene {
  private canvas: HTMLCanvasElement

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public update(dt: number): void {
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
