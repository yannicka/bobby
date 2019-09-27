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

  public static angleBetween(p1: Point, p2: Point): number {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
  }
}
