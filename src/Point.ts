export class Point {
  public x: number
  public y: number

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public clone(): Point {
    return new Point(this.x, this.y)
  }
}
