import { Point } from './Point'

type OnClickCallback = () => void

export class Button {
  private width: number
  private height: number
  private position: Point
  private onClick: OnClickCallback

  public update(dt: number): void {
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red'
    ctx.fillRect(
      this.position.x,
      this.position.x,
      this.width,
      this.height,
    )
  }

  public setSize(width: number, height: number): void {
    this.width = width
    this.height = height
  }

  public setPosition(position: Point): void {
    this.position = position
  }

  public setOnClick(callback: OnClickCallback): void {
    this.onClick = callback
  }

  public click(): void {
    this.onClick()
  }

  public isHover(pointerPosition: Point): boolean {
    return pointerPosition.x >= this.position.x
  }
}
