import { Point } from './Point'

type OnClickCallback = () => void

export class Button {
  private width: number
  private height: number
  private position: Point
  private onClick: OnClickCallback
  private text: string

  public constructor(text: string) {
    this.text = text
  }

  public update(dt: number): void {
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'darkgrey'
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    )

    ctx.fillStyle = 'black'
    ctx.font = '10px Arial'
    ctx.fillText(this.text, this.position.x + 4, this.position.y + 12)
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
      && pointerPosition.y >= this.position.y
      && pointerPosition.x <= this.position.x + this.width
      && pointerPosition.y <= this.position.y + this.height
  }
}
