import { drawImageByIndex } from './Util'

export default class Animation {
  private image: HTMLImageElement

  private frames: Array<number>

  private frameDuration: number

  private loop: boolean

  private frameWidth: number
  private frameHeight: number

  private timer: number
  private currentIndex: number
  private finished: boolean

  // @todo Voir AnimationManager
  public constructor(
    image: HTMLImageElement,
    frames: Array<number>,
    frameWidth: number,
    frameHeight: number,
    frameDuration: number,
    loop: boolean = true,
  ) {
    this.image = image
    this.frames = frames

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.frameDuration = frameDuration
    this.loop = loop

    this.timer = 0
    this.currentIndex = 0

    this.finished = false
  }

  public update(dt: number): void {
    if (this.finished || !this.hasMultipleFrames())
      return

    this.timer += dt

    if (this.timer > this.frameDuration) {
      this.currentIndex += 1

      if (this.currentIndex >= this.frames.length) {
        if (this.loop) {
          this.currentIndex = 0
        } else {
          this.finished = true

          this.currentIndex -= 1
        }
      }

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

  public hasMultipleFrames(): boolean {
    return this.frames.length > 1
  }

  public restart(): void {
    this.timer = 0
    this.currentIndex = 0
    this.finished = false
  }
}
