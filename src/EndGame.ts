import { Point } from './Point'
import { computeAppSize } from './Game'
import { Superapp } from './Superapp'

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const COLORS = [ '#222', '#177355', '#053123', '#cf5600', '#642d06' ]

const HORIZONTAL_VELOCITY = 40
const VERTICAL_ACCELERATION = 120

const VERTICAL_VELOCITY_MIN = 180
const VERTICAL_VELOCITY_MAX = 360

class Particle {
  private readonly position: Point
  private readonly velocity: Point
  private readonly length: number
  private readonly angle: number
  private readonly color: string

  public constructor(width: number) {
    this.position = new Point(0, 0)
    this.position.x = randomNumber(0, width)
    this.position.y = 0

    this.velocity = new Point(0, 0)
    this.velocity.x = randomNumber(-HORIZONTAL_VELOCITY, HORIZONTAL_VELOCITY)
    this.velocity.y = randomNumber(VERTICAL_VELOCITY_MIN, VERTICAL_VELOCITY_MAX)

    this.color = COLORS[randomNumber(0, COLORS.length - 1)]

    this.length = randomNumber(10, 16)
    this.angle = randomNumber(-10, 10)
  }

  public update(dt: number): void {
    this.velocity.y += VERTICAL_ACCELERATION * dt

    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.lineWidth = this.length / 2
    ctx.strokeStyle = this.color
    ctx.moveTo(this.position.x, this.position.y)
    ctx.lineTo(this.position.x + this.angle, this.position.y + this.length)
    ctx.stroke()
  }

  public isOutOfHeight(height: number): boolean {
    if (this.position.y > height) {
      return true
    }

    return false
  }
}

export class EndGame {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private animationFrame: number
  private particles: Array<Particle>
  private lastUpdate: number

  public constructor() {
    this.canvas = document.getElementById('app') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = 800
    this.canvas.height = 500

    this.lastUpdate = Date.now()

    this.particles = []

    this.listen()
    this.resize()

    this.update()
  }

  private update(): void {
    const now = Date.now()
    const dt = (now - this.lastUpdate) / 1000
    this.lastUpdate = now

    if (Math.random() > 0.7) {
      this.particles.push(new Particle(this.canvas.width))
    }

    for (const particle of this.particles) {
      particle.update(dt)

      if (particle.isOutOfHeight(this.canvas.height)) {
        this.particles = this.particles.filter(p => p !== particle)
      }
    }

    this.render(this.ctx)

    this.animationFrame = requestAnimationFrame(() => this.update())
  }

  public stop(): void {
    cancelAnimationFrame(this.animationFrame)
  }

  private render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const particle of this.particles) {
      particle.render(ctx)
    }
  }

  public listen(): void {
    window.addEventListener('resize', this)
  }

  public unlisten(): void {
    window.removeEventListener('resize', this)
  }

  public handleEvent(e: UIEvent): void {
    switch (e.type) {
      case 'resize':
        this.resize(e)
        break
    }
  }

  private resize(_e: UIEvent | null = null): void {
    const appSize = computeAppSize(true)

    this.canvas.width = appSize.size.width
    this.canvas.height = appSize.size.height

    this.canvas.style.width = `${appSize.size.width}px`
    this.canvas.style.height = `${appSize.size.height}px`

    Superapp.resize()
  }
}
