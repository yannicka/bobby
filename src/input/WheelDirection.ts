export enum WheelDirection {
  None,
  Top,
  Bottom,
}

export class WheelDirectionUrl {
  public static toInt(wheelDirection: WheelDirection): number {
    switch (wheelDirection) {
      case WheelDirection.None:
        return 0

      case WheelDirection.Top:
        return -1

      case WheelDirection.Bottom:
        return 1
    }
  }
}
