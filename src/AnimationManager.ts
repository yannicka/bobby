import { Animation, AnimationOptions } from './Animation'

export default class AnimationManager {
  // Image qui servira de sprite aux animations
  private image: HTMLImageElement

  // La taille d'une frame doit être fixée car les frames sont référencées par
  // des index
  private frameWidth: number
  private frameHeight: number

  private animations: { [key: string]: Animation }
  private currentAnimation: Animation | null

  public constructor(image: HTMLImageElement, frameWidth: number, frameHeight: number) {
    this.image = image

    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.animations = {}
    this.currentAnimation = null
  }

  public update(dt: number): void {
    if (this.currentAnimation) {
      this.currentAnimation.update(dt)
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (this.currentAnimation) {
      this.currentAnimation.render(ctx)
    }
  }

  public addAnimation(
    name: string,
    frames: Array<number>,
    options: AnimationOptions = {},
  ): void {
    const animation = new Animation(
      this.image,
      frames,
      this.frameWidth,
      this.frameHeight,
      options,
    )

    this.animations[name] = animation
  }

  public play(name: string, force: boolean = false): void {
    this.currentAnimation = this.animations[name]

    const nextAnimation = this.animations[name]

    if (this.currentAnimation !== nextAnimation || force) {
      this.animations.currentAnimation = nextAnimation

      nextAnimation.restart()
    }
  }
}
