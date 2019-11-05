import { Point } from './Point'
import { Size } from './Size'

export class Camera {
  private position: Point
  private size: Size

  public constructor(position: Point, size: Size) {
    this.position = position
    this.size = size
  }

  public getPosition(): Point {
    return this.position
  }

  public setPosition(position: Point): void {
    this.position = position
  }

  public getSize(): Size {
    return this.size
  }

  public setSize(size: Size): void {
    this.size = size
  }
}
