import { drawImageByIndex } from './Util'

export default class Animation {
  private image: HTMLImageElement

  private frames: Array<number>

  private frameDuration: number

  private looped: boolean

  private frameWidth: number
  private frameHeight: number

  private timer: number
  private currentIndex: number

  public constructor(
    image: HTMLImageElement,
    frames: Array<number>,
    frameWidth: number,
    frameHeight: number,
  ) {
    this.image = image
    this.frames = frames

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.frameDuration = 0.1
    this.looped = true

    this.timer = 0
    this.currentIndex = 0
  }

  public update(dt: number): void {
    if (this.isCurrentAnimationFinished())
      return

    this.timer += dt

    if (this.timer > this.frameDuration) {
      this.currentIndex += 1

      if (this.currentIndex >= this.frames.length && this.looped)
        this.currentIndex = 0

      this.timer = 0
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    drawImageByIndex(
      ctx,
      this.image,
      0,
      0,
      this.getCurrentFrame(),
      this.frameWidth,
      this.frameHeight,
    )
  }

  public getCurrentFrame(): number {
    return this.frames[this.currentIndex]
  }

  public isCurrentAnimationFinished(): boolean {
    return this.currentIndex >= this.frames.length && !this.looped
  }
}
