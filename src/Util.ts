export function drawImageByIndex(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  index: number,
  width: number,
  height: number,
): void {
  // Nombre de tuiles par ligne
  const nbTilesByLine = Math.ceil(img.width / width)

  // Position x depuis laquelle découper le morceau
  const basex = (index % nbTilesByLine) * width

  // Position y depuis laquelle découper le morceau
  const basey = Math.floor(index / nbTilesByLine) * height

  // Afficher le morceau d'image
  ctx.drawImage(
    img,
    basex,
    basey,
    width,
    height,
    x,
    y,
    width,
    height,
  )
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, num))
}

// @todo Retenir le résultat afin d'éviter de le recalculer à chaque appel.
//
// @see https://stackoverflow.com/a/4819886
export function isTouchDevice() {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')

  const mq = function(mediaQuery: string): boolean {
    return window.matchMedia(mediaQuery).matches
  }

  if ('ontouchstart' in window) {
    return true
  }

  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')

  return mq(query)
}
