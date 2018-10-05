import Player from './Player'
import Map from './Map'
import { Keyboard, Key } from './Keyboard'
import Direction from './Direction';

export default class Game {
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

    this.map = Map.firstLevel()

    this.lastUpdate = Date.now()

    this.player = new Player(this)

    this.keyboard = new Keyboard()

    window.addEventListener('resize', () => this.resize())

    this.resize()
    this.update()
  }

  public update() {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    if (this.player.canmove) {
      if (this.keyboard.down(Key.Up))
        this.player.move(Direction.Up)

      if (this.keyboard.down(Key.Down))
        this.player.move(Direction.Down)

      if (this.keyboard.down(Key.Right))
        this.player.move(Direction.Right)

      if (this.keyboard.down(Key.Left))
        this.player.move(Direction.Left)
    }

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

  public getMap(): Map {
    return this.map
  }
}
