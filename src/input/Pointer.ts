import { Point } from '../Point'

import { WheelDirection } from './WheelDirection'

export abstract class Pointer {
  private position: Point

  public constructor() {
    this.position = new Point(0, 0)
  }

  public setPosition(position: Point): void {
    this.position = position
  }

  public getPosition(): Point {
    return this.position
  }

  public abstract unlisten(): void

  public abstract update(dt: number): void

  // Tant que le bouton est levé
  public abstract up(): boolean

  // Tant que le bouton est baissé
  public abstract down(): boolean

  // Au moment où le bouton est enfoncé
  public abstract press(): boolean

  // Au moment où le bouton est levé
  public abstract release(): boolean

  // Roulette
  public abstract wheel(): WheelDirection
}
