import { Direction } from './Direction'
import { Game } from './Game'
import { ImageManager } from './ImageManager'
import { Key, Keyboard } from './Keyboard'
import { Map } from './Map'
import { Player } from './Player'
import { Scene } from './Scene'
import { Camera } from './Camera'
import { Point } from './Point'
import { CELL_SIZE } from './Cell';
import { clamp } from './Util';

export class GameScene implements Scene {
  private game: Game
  private map: Map
  private player: Player
  private keyboard: Keyboard
  private currentLevel: number
  private camera: Camera

  public constructor(game: Game, level: number = 0) {
    this.game = game

    this.currentLevel = level

    const levels = this.game.getStorage().getLevels()

    this.map = new Map(levels[this.currentLevel].fixed.map)

    this.camera = new Camera(new Point(0, 0), { width: 100, height: 100 })

    this.keyboard = new Keyboard()

    this.player = new Player(this.game, this.map)
  }

  public update(dt: number): void {
    const [ gameWidth, gameHeight ] = this.game.getGameSize()
    const { width: mapWidth, height: mapHeight } = this.map.getDisplayedSize()

    let cameraPosition = this.player.getDisplayPosition().clone()

    cameraPosition.x = -cameraPosition.x
    cameraPosition.y = -cameraPosition.y

    cameraPosition.x -= CELL_SIZE / 2
    cameraPosition.y -= CELL_SIZE / 2

    cameraPosition.x += gameWidth / 2
    cameraPosition.y += gameHeight / 2

    cameraPosition.x = clamp(cameraPosition.x, -mapWidth + gameWidth, 0)
    cameraPosition.y = clamp(cameraPosition.y, -mapHeight + gameHeight, 0)

    this.camera.setPosition(cameraPosition)

    if (!this.game.getSceneTransition().isChanging()) {
      if (this.player.isAbleToMove()) {
        if (this.keyboard.down(Key.Up)) {
          this.player.move(Direction.Up)
        }

        if (this.keyboard.down(Key.Down)) {
          this.player.move(Direction.Down)
        }

        if (this.keyboard.down(Key.Right)) {
          this.player.move(Direction.Right)
        }

        if (this.keyboard.down(Key.Left)) {
          this.player.move(Direction.Left)
        }
      }
    }

    this.map.update(dt)
    this.player.update(dt)
  }

  public render(ctx: CanvasRenderingContext2D): void {
    let { width, height } = this.map.getSize()
    width *= CELL_SIZE
    height *= CELL_SIZE

    const bgImg = ImageManager.getImage('background')
    const pat = ctx.createPattern(bgImg, 'repeat')

    ctx.save()
    ctx.translate(this.camera.getPosition().x, this.camera.getPosition().y)

    ctx.beginPath() // Nécessaire : https://gamedev.stackexchange.com/a/120250
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = pat
    ctx.fill()

    this.map.render(ctx)
    this.player.render(ctx)

    ctx.restore()
  }
}
