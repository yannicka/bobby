/**
 * Affiche le morceau `index` de l'image `img` sur la zone de dessin `ctx` à la
 * position `(x, y)` et de taille `(frameWidth, frameHeight)`.
 *
 * L'image est découpée en morceaux en fonction de `(frameWidth, frameHeight)`.
 *
 * L'indexation se fait ainsi (exemple), en commençant à 0 :
 *
 * +---+---+---+
 * | 0 | 1 | 2 |
 * +---+---+---+
 * | 3 | 4 | 5 |
 * +---+---+---+
 * | 6 | 7 | 8 |
 * +---+---+---+
 */
export function drawImageByIndex(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  index: number,
  frameWidth: number,
  frameHeight: number,
): void {
  // Nombre de tuiles par ligne
  const nbTilesByLine = Math.ceil(img.width / frameWidth)

  // Position x depuis laquelle découper le morceau
  const baseX = (index % nbTilesByLine) * frameWidth

  // Position y depuis laquelle découper le morceau
  const baseY = Math.floor(index / nbTilesByLine) * frameHeight

  // Afficher le morceau d'image
  ctx.drawImage(
    img,
    baseX,
    baseY,
    frameWidth,
    frameHeight,
    x,
    y,
    frameWidth,
    frameHeight,
  )
}

/**
 * Délimitation de valeur.
 *
 * - Si `num` est inférieur à `min`, retourne `min`  ;
 * - Si `num` est supérieur à `max`, retourne `max`  ;
 * - Sinon retourne `num`.
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, num))
}

// @todo Retenir le résultat afin d'éviter de le recalculer à chaque appel.
/**
 * L'appareil utilisé possède-t-il un écran tactile ?
 *
 * @see https://stackoverflow.com/a/4819886
 */
export function isTouchDevice(): boolean {
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
