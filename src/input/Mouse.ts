import { Point } from '../Point'

import { Pointer } from './Pointer'
import { WheelDirection } from './WheelDirection'

export class Mouse extends Pointer {
  private readonly element: HTMLElement
  private click: number | boolean | null
  private mtime: number
  private loose: number | boolean | null
  private wheelValue: number

  public constructor(element: HTMLElement | null = null) {
    super()

    this.click = null
    this.mtime = 0
    this.loose = null
    this.wheelValue = 0
    this.element = element instanceof HTMLElement ? element : document.body

    this.listen()
  }

  public listen(): void {
    this.element.addEventListener('mousedown', this)
    this.element.addEventListener('mousemove', this)
    this.element.addEventListener('mouseup', this)
    this.element.addEventListener('wheel', this)
  }

  public unlisten(): void {
    this.element.removeEventListener('mousedown', this)
    this.element.removeEventListener('mousemove', this)
    this.element.removeEventListener('mouseup', this)
    this.element.removeEventListener('wheel', this)
  }

  public handleEvent(e: MouseEvent | WheelEvent): void {
    switch (e.type) {
      case 'mousedown':
        this.onMouseDown(e as MouseEvent)
        break

      case 'mousemove':
        this.onMouseMove(e as MouseEvent)
        break

      case 'mouseup':
        this.onMouseUp(e as MouseEvent)
        break

      case 'wheel':
        this.onWheel(e as WheelEvent)
        break
    }
  }

  // à faire : trouver une méthode pour éviter un appel à une méthode, comme
  // dans la classe Keyboard
  public update(): void {
    this.mtime += 1

    this.wheelValue = 0
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
    if (this.wheelValue < 0) {
      return WheelDirection.Top
    } else if (this.wheelValue > 0) {
      return WheelDirection.Bottom
    }

    return WheelDirection.None
  }

  private onMouseDown(e: MouseEvent): void {
    this.onMouseMove(e)
    this.click = this.mtime
  }

  private onMouseMove(e: MouseEvent): void {
    const position = new Point(
      e.pageX - this.element.offsetLeft,
      e.pageY - this.element.offsetTop,
    )

    this.setPosition(position)
  }

  private onMouseUp(_e: MouseEvent): void {
    this.loose = this.mtime
    this.click = null
  }

  private onWheel(e: WheelEvent): void {
    this.wheelValue = e.deltaY
  }
}
