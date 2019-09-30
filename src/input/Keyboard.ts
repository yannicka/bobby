export class Keyboard {
  private readonly keys: { [key: string]: boolean }
  private readonly lasts: Array<string>

  public constructor() {
    this.keys = {}
    this.lasts = []

    this.listen()
  }

  public listen(): void {
    document.addEventListener('keyup', this)
    document.addEventListener('keydown', this)
  }

  public unlisten(): void {
    document.removeEventListener('keyup', this)
    document.removeEventListener('keydown', this)
  }

  public handleEvent(e: KeyboardEvent): void {
    switch (e.type) {
      case 'keyup':
        this.onkeyup(e)
        break
      case 'keydown':
        this.onkeydown(e)
        break
    }
  }

  public up(k: string): boolean {
    return !this.keys[k]
  }

  public down(k: string): boolean {
    return this.keys[k]
  }

  public press(k: string): boolean {
    const v = this.keys[k]
    this.keys[k] = false

    return v
  }

  public release(k: string): boolean {
    const last = this.lasts[this.lasts.indexOf(k)]

    if (typeof last !== 'undefined') {
      this.lasts.splice(this.lasts.indexOf(k), 1)
    }

    return last === k
  }

  private onkeyup(e: KeyboardEvent): void {
    this.lasts.push(e.code)
    this.keys[e.code] = false
  }

  private onkeydown(e: KeyboardEvent): void {
    this.keys[e.code] = true
  }
}
