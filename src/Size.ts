export class Size {
  public width: number
  public height: number

  public constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  public clone(): Size {
    return new Size(this.width, this.height)
  }
}
