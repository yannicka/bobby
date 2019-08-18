export enum Key {
  Tab   = 9,
  Enter = 13,
  Shift = 16,
  Ctrl  = 17,
  Alt   = 18,
  Esc   = 27,
  Space = 32,

  Left  = 37,
  Up    = 38,
  Right = 39,
  Down  = 40,

  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,

  Num0 = 48,
  Num1 = 49,
  Num2 = 50,
  Num3 = 51,
  Num4 = 52,
  Num5 = 53,
  Num6 = 54,
  Num7 = 55,
  Num8 = 56,
  Num9 = 57,

  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,

  Add = 107,
  Sub = 109,
  Mul = 106,
  Div = 111,

  Capslock = 20,
  Pageup   = 33,
  Pagedown = 34,
  End      = 35,
  Home     = 36,
  Isert    = 45,
  Delete   = 46,
  Numlock  = 144,
}

export class Keyboard {
  private keys: { [key: number]: boolean }
  private lasts: Array<number>

  public constructor() {
    this.keys  = []
    this.lasts = []

    document.addEventListener('keyup', (e) => this.onkeyup(e))
    document.addEventListener('keydown', (e) => this.onkeydown(e))
  }

  public up(k: Key): boolean {
    return !this.keys[k]
  }

  public down(k: Key): boolean {
    return this.keys[k]
  }

  public press(k: Key): boolean {
    const v = this.keys[k]
    this.keys[k] = false

    return v
  }

  public release(k: Key): boolean {
    const last = this.lasts[this.lasts.indexOf(k)]

    if (typeof last !== 'undefined') {
      this.lasts.splice(this.lasts.indexOf(k), 1)
    }

    return last === k
  }

  private onkeyup(e: KeyboardEvent): void {
    this.lasts.push(e.keyCode)
    this.keys[e.keyCode] = false
  }

  private onkeydown(e: KeyboardEvent): void {
    this.keys[e.keyCode] = true
  }
}
