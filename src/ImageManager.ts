// Gestion du chargement des images.
//
// Fonctionnement :
// 
// ```
// ImageManager.setPath('assets/img')
//
// const loader = ImageManager.load(images)
//
// Promise.all(loader).then(() => {
//   // code
// })
// ```
export default class ImageManager {
  // Images chargées
  private static images: { [key: string]: HTMLImageElement } = {}

  // Chemin où sont recupérées les images
  private static path: string = ''

  // Obtenir une image par son nom
  public static getImage(name: string): HTMLImageElement {
    return this.images[name]
  }

  // Définir le chemin dans lequel les images sont chargées
  public static setPath(path: string): void {
    this.path = path
  }

  // Obtenir le chemin dans lequel les images sont chargées
  public static getPath(): string {
    return this.path
  }

  // Exécute le chargement des images
  public static load(images: { [key: string]: string }): Array<Promise<HTMLImageElement>> {
    const promises = new Array<Promise<HTMLImageElement>>()

    for (const [name, url] of Object.entries(images)) {
      const img = document.createElement('img') as HTMLImageElement

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.addEventListener('load', () => {
          this.images[name] = img
          resolve(img)
        })

        img.addEventListener('error', () => {
          reject(`Impossible de charger l'image « ${url} »`)
        })
      })

      img.src = this.getPath() + url

      promises.push(promise)
    }

    return promises
  }
}
