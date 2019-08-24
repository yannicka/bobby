// import { Game } from '../Game'
import { Point } from '../Point'

import { Pointer } from './Pointer'
import { WheelDirection } from './WheelDirection'

export class Mouse extends Pointer {
  private click: number | boolean | null
  private mtime: number
  private loose: number | boolean | null
  private wheelValue: number

  public constructor() {
    super()

    this.click = null
    this.mtime = 0
    this.loose = null
    this.wheelValue = 0

    document.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e))
    document.addEventListener('mousemove', (e: MouseEvent) => this.onMouseMove(e))
    document.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e))
    document.addEventListener('wheel', (e: WheelEvent) => this.onWheel(e))
  }

  // à faire : trouver une méthode pour éviter un appel à une méthode, comme
  // dans la classe Keyboard
  public update(): void {
    this.mtime += 1

    this.wheelValue = 0
  }

  /*

  public getCanvasCoordinates(camera: Camera): Point {
    let x = this.position.getX()
    let y = this.position.getY()

    x /= 1 // Game.scale
    y /= 1 // Game.scale

    x -= camera.getX()
    y -= camera.getY()

    return new Point(x, y)
  }

  */

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

  public wheel(): WheelDirection {
    if (this.wheelValue < 0) {
      return WheelDirection.Top
    } else if (this.wheelValue > 0) {
      return WheelDirection.Bottom
    } else {
      return WheelDirection.None
    }
  }

  private onMouseDown(e: MouseEvent): void {
    this.onMouseMove(e)
    this.click = this.mtime
  }

  private onMouseMove(e: MouseEvent): void {
    /*

    const can = this.game.getCanvas()

    const position = new Point(
      e.pageX - (can !== null ? can.offsetLeft : 0),
      e.pageY - (can !== null ? can.offsetTop : 0),
    )

    */

    const position = new Point(
      e.pageX,
      e.pageY,
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
