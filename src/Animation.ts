import { drawImageByIndex } from './Util'

export interface AnimationOptions {
  readonly frameDuration?: number
  readonly loop?: boolean
}

export class Animation {
  // Image de l'animation *(sprite)*
  private readonly image: HTMLImageElement

  // Frames utilisées pour l'animation
  private readonly frames: Array<number>

  // Taille d'une frame
  private readonly frameWidth: number
  private readonly frameHeight: number

  // Durée de chaque frame
  private readonly frameDuration: number

  // Boucle d'animation
  //
  // Si `true`, l'animation tourne en boucle
  // Si `false`, l'animation s'arrête sur la dernière frame
  private readonly loop: boolean

  // Compteur de temps de la frame courante
  private timer: number

  // Index vers la frame en cours
  private currentFrame: number

  // L'animation est-elle terminée ?
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

  public update(dt: number): void {
    if (this.finished || this.frames.length <= 1) {
      return
    }

    this.timer += dt

    while (this.timer > this.frameDuration) {
      this.currentFrame += 1

      if (this.currentFrame >= this.frames.length) {
        if (this.loop) {
          this.currentFrame = 0
        } else {
          this.finished = true

          this.currentFrame -= 1
        }
      }

      this.timer = this.timer - this.frameDuration
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

  private getCurrentFrame(): number {
    return this.frames[this.currentFrame]
  }
}
