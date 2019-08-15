import Player from './Player'
import Map from './Map'
import { Keyboard, Key } from './Keyboard'
import Direction from './Direction'
import ImageManager from './ImageManager'

export default class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private map: Map
  private player: Player
  private keyboard: Keyboard
  private lastUpdate: number
  private zoom: number

  public constructor() {
    this.canvas = <HTMLCanvasElement> document.getElementById('app')
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d')

    this.zoom = 2

    this.canvas.width = 320 * this.zoom
    this.canvas.height = 240 * this.zoom

    this.ctx.imageSmoothingEnabled = false
    this.ctx.scale(this.zoom, this.zoom)

    this.map = Map.firstLevel()

    this.lastUpdate = Date.now()

    this.player = new Player(this, this.map.startLocation())

    this.keyboard = new Keyboard()

    this.init()
  }

  public init(): void {
    ImageManager.setPath('assets/img/')

    const loader = ImageManager.load({
      'tiles': 'tiles.png',
    })

    Promise.all(loader).then(() => {
      this.update()
    })
  }

  public update(): void {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    if (this.player.isAbleToMove()) {
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

  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = 'rgb(240, 240, 240)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.map.render(this.ctx)
    this.player.render(this.ctx)
  }

  public getMap(): Map {
    return this.map
  }
}
