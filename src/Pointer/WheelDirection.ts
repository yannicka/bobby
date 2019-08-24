export enum WheelDirection {
  None,
  Top,
  Bottom,
}

export namespace WheelDirection {
  export function toInt(wheelDirection: WheelDirection): number {
    switch (wheelDirection) {
      case WheelDirection.None:
        return 0

      case WheelDirection.Top:
        return -1

      case WheelDirection.Bottom:
        return 1
    }

    return 0
  }
}
