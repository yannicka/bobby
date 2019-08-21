export default interface Scene {
  update(dt: number): void
  render(ctx: CanvasRenderingContext2D): void
}
