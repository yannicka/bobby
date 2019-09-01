import { CELL_SIZE } from './Cell'
import { HomeScene } from './HomeScene'
import { ImageManager } from './ImageManager'
import { Scene } from './Scene'
import { SceneTransition } from './SceneTransition'
import { Storage } from './Storage'

export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly sceneTransition: SceneTransition
  private readonly storage: Storage
  private lastUpdate: number
  private zoom: number
  private scene: Scene

  public constructor() {
    this.canvas = document.getElementById('app') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.lastUpdate = Date.now()

    this.zoom = 1

    this.sceneTransition = new SceneTransition(this)

    this.storage = new Storage()

    window.addEventListener('resize', (e: UIEvent) => this.resize(e))

    const imagesLoader = ImageManager.load('assets/img/', {
      'tiles': 'tiles.png',
      'player': 'player.png',
      'background': 'background.png',
    })

    Promise.all(imagesLoader).then(() => {
      this.init()
    })
  }

  public init(): void {
    this.scene = new HomeScene(this)
    // this.scene = new GameScene(this)

    this.resize()

    this.update()
  }

  public update(): void {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    this.scene.update(dt)

    this.sceneTransition.update(dt)

    this.render(this.ctx)

    requestAnimationFrame(() => this.update())
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.scene.render(ctx)

    this.sceneTransition.render(ctx)
  }

  public resize(_e: UIEvent | null = null): void {
    const [ width, height ] = this.getScreenSize()

    const widthZoom = window.innerWidth / width
    const heightZoom = window.innerHeight / height

    this.zoom = Math.min(widthZoom, heightZoom)

    this.canvas.width = width * this.zoom
    this.canvas.height = height * this.zoom

    this.ctx.imageSmoothingEnabled = false
    this.ctx.scale(this.zoom, this.zoom)
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public getZoom(): number {
    return this.zoom
  }

  public changeScene(scene: Scene): void {
    this.scene = scene
  }

  public changeSceneWithTransition(scene: Scene): void {
    this.sceneTransition.changeScene(scene)
  }

  public getScreenSize(): [ number, number ] {
    let [ width, height ] = [ 9, 9 ]

    width *= CELL_SIZE
    height *= CELL_SIZE

    return [ width, height ]
  }

  public getStorage(): Storage {
    return this.storage
  }

  public getSceneTransition(): SceneTransition {
    return this.sceneTransition
  }
}
