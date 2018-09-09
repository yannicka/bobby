import Player from './Player'
import Map from './Map'
import { Keyboard, Key } from './Keyboard'

export default class Bobby {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private map: Map
  private player: Player
  private keyboard: Keyboard

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

    this.player = new Player()

    this.keyboard = new Keyboard()

    window.addEventListener('resize', () => this.resize())

    this.resize()
    this.update()
  }

  public update() {
    if (this.keyboard.down(Key.Up))
      this.player.y--

    if (this.keyboard.down(Key.Down))
      this.player.y++

    if (this.keyboard.down(Key.Right))
      this.player.x++

    if (this.keyboard.down(Key.Left))
      this.player.x--

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
