import { drawImageByIndex } from './Util'

export interface AnimationOptions {
  readonly frameDuration?: number
  readonly loop?: boolean
}

export class Animation {
  private readonly image: HTMLImageElement
  private readonly frames: Array<number>

  private readonly frameWidth: number
  private readonly frameHeight: number

  private readonly frameDuration: number
  private readonly loop: boolean

  private timer: number
  private currentFrame: number
  private finished: boolean

  public constructor(
    image: HTMLImageElement,
    frames: Array<number>,
    frameWidth: number,
    frameHeight: number,
    { frameDuration = 1, loop = true }: AnimationOptions,
  ) {
    this.image = image
    this.frames = frames

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.frameDuration = frameDuration
    this.loop = loop

    this.timer = 0
    this.currentFrame = 0
    this.finished = false
  }

  private getCurrentFrame(): number {
    return this.frames[this.currentFrame]
  }

  public update(dt: number): void {
    if (this.finished || this.frames.length <= 1) {
      return
    }

    this.timer += dt

    if (this.timer > this.frameDuration) {
      this.currentFrame += 1

      if (this.currentFrame >= this.frames.length) {
        if (this.loop) {
          this.currentFrame = 0
        } else {
          this.finished = true

          this.currentFrame -= 1
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

  public restart(): void {
    this.timer = 0
    this.currentFrame = 0
    this.finished = false
  }
}
