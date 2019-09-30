import { Point } from '../Point'

import { Pointer } from './Pointer'
import { WheelDirection } from './WheelDirection'

export class Touch extends Pointer {
  private readonly element: HTMLElement
  private click: number | boolean | null
  private mtime: number
  private loose: number | boolean | null

  public constructor(element: HTMLElement | null = null) {
    super()

    this.click = null
    this.mtime = 0
    this.loose = null
    this.element = element instanceof HTMLElement ? element : document.body

    this.listen()
  }

  public listen(): void {
    this.element.addEventListener('touchstart', this)
    this.element.addEventListener('touchmove', this)
    this.element.addEventListener('touchend', this)
  }

  public unlisten(): void {
    this.element.removeEventListener('touchstart', this)
    this.element.removeEventListener('touchmove', this)
    this.element.removeEventListener('touchend', this)
  }

  public handleEvent(e: TouchEvent): void {
    switch (e.type) {
      case 'touchstart':
        this.onTouchDown(e)
        break

      case 'touchmove':
        this.onTouchMove(e)
        break

      case 'touchend':
        this.onTouchUp(e)
        break
    }
  }

  // à faire : trouver une méthode pour éviter un appel à une méthode, comme
  // dans la classe Keyboard
  public update(): void {
    this.mtime += 1
  }

  // Tant que le bouton est levé
  public up(): boolean {
    return this.click === null
  }

  // Tant que le bouton est baissé
  public down(): boolean {
    return this.click !== null
  }

  // Au moment où le bouton est enfoncé
  public press(): boolean {
    return this.click === this.mtime
  }

  // Au moment où le bouton est levé
  public release(): boolean {
    return this.loose === this.mtime
  }

  // Roulette
  public wheel(): WheelDirection {
    // throw new Error('No wheel on touch')

    return WheelDirection.None
  }

  private onTouchDown(e: TouchEvent): void {
    this.onTouchMove(e)
    this.click = this.mtime
  }

  private onTouchMove(e: TouchEvent): void {
    const position = new Point(
      e.targetTouches[0].pageX - this.element.offsetLeft,
      e.targetTouches[0].pageY - this.element.offsetTop,
    )

    this.setPosition(position)
  }

  private onTouchUp(_e: TouchEvent): void {
    this.loose = this.mtime
    this.click = null
  }
}
