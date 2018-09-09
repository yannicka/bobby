import Player from './Player'
import Map from './Map'
import { Keyboard, Key } from './Keyboard'

export default class Bobby {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private map: Map
  private player: Player
  private keyboard: Keyboard
  private lastUpdate: number

  public constructor() {
    this.canvas = <HTMLCanvasElement> document.getElementById('app')
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d')

    this.canvas.width = 640
    this.canvas.height = 480

    this.map = new Map([
      [ 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 0, 0, 0, 1 ],
      [ 1, 0, 0, 1, 1, 0, 1 ],
      [ 1, 0, 0, 0, 1, 0, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1 ],
    ])

    this.lastUpdate = Date.now()

    this.player = new Player()

    this.keyboard = new Keyboard()

    window.addEventListener('resize', () => this.resize())

    this.resize()
    this.update()
  }

  public update() {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    this.player.velocity.x = 0
    this.player.velocity.y = 0

    if (this.keyboard.down(Key.Up))
      this.player.velocity.y = -25

    if (this.keyboard.down(Key.Down))
      this.player.velocity.y = 25

    if (this.keyboard.down(Key.Right))
      this.player.velocity.x = 25

    if (this.keyboard.down(Key.Left))
      this.player.velocity.x = -25

    this.player.update(dt)

    this.render()

    requestAnimationFrame(() => this.update())
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = 'rgb(240, 240, 240)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.map.render(this.ctx)
    this.player.render(this.ctx)
  }

  private resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
