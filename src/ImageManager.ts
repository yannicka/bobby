/**
 * Gestion du chargement des images.
 *
 * Fonctionnement :
 *
 * ```
 * const images = {
 *   'image1': 'image1.png',
 *   'image2': 'image2.png',
 *   // ...
 * })
 * 
 * const imagesLoader = ImageManager.load('assets/img/', images)
 *
 * Promise.all(imagesLoader).then(() => {
 *   // code
 * })
 * ```
 *
 * Note : la classe est « statique » car c'est le seul moyen de pouvoir charger
 *        une image depuis n'importe où sans avoir à passer un objet partout.
 */
export class ImageManager {
  // Images chargées
  private static readonly images: { [key: string]: HTMLImageElement } = {}

  // Obtenir une image par son nom
  public static getImage(name: string): HTMLImageElement {
    return ImageManager.images[name]
  }

  // Exécute le chargement des images
  public static load(images: { [key: string]: string }): Array<Promise<HTMLImageElement>> {
    const promises = new Array<Promise<HTMLImageElement>>()

    for (const [ name, url ] of Object.entries(images)) {
      const img = document.createElement('img')

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.addEventListener('load', () => {
          ImageManager.images[name] = img
          resolve(img)
        })

        img.addEventListener('error', (e) => {
          console.error(e)

          reject(`Impossible de charger l'image « ${url} »`)
        })
      })

      img.src = url

      promises.push(promise)
    }

    return promises
  }
}
