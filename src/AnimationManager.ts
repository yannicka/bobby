import Animation from './Animation'

export default class AnimationManager {
  // Image qui servira de sprite aux animations
  // La taille de chaque frame doit être fixée (par frameWidth et frameHeight)
  // car elles sont référencées par des index.
  private image: HTMLImageElement

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
    if (this.currentAnimation instanceof Animation)
      this.currentAnimation.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (this.currentAnimation instanceof Animation)
      this.currentAnimation.render(ctx)
    // else if (!this.hasAnimations())
    //   ctx.drawImage(this.image, 0, 0)
  }

  public addAnimation(name: string, frames: Array<number>): void {
    const animation = new Animation(this.image, frames, this.frameWidth, this.frameHeight)

    this.animations[name] = animation
  }

  public hasCurrentAnimation(): boolean {
    return this.currentAnimation instanceof Animation
  }

  public getAnimation(name: string): Animation {
    return this.animations[name]
  }

  public hasAnimations(): boolean {
    return Object.keys(this.animations).length > 0
  }

  public getCurrentAnimation(): Animation | null {
    return this.currentAnimation
  }

  public setCurrentAnimation(currentAnimation: Animation): this {
    this.currentAnimation = currentAnimation

    return this
  }

  public play(name: string): void {
    this.currentAnimation = this.animations[name]
  }
}
