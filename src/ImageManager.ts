// Gestion du chargement des images
//
// Fonctionnement :
//   const imageManager = new ImageManager()
//   imageManager.setPath('assets/img')
//   const loader = imageManager.load(images)
//   Promise.all(loader).then(() => {
//     // your code
//   })
export default class ImageManager {
  // Images chargées
  private images: { [key: string]: HTMLImageElement }

  // Chemin où sont recupérées les images
  private path: string

  public constructor() {
    this.images = {}
    this.path = ''
  }

  // Obtenir une image par son nom
  public getImage(name: string): HTMLImageElement {
    return this.images[name]
  }

  // Définir le chemin dans lequel les images sont chargées (sans la barre
  // oblique (slash) finale).
  public setPath(path: string): void {
    this.path = path
  }

  // Obtenir le chemin dans lequel les images sont chargées
  public getPath(): string {
    return this.path
  }

  // Exécute le chargement des images et lance la fonction callback une fois le
  // chargement terminé.
  // Note : si toutes les images ne sont pas chargées (par exemple une URL
  // incorrecte), la fonction callback n'est pas appelée.
  public load(images: { [key: string]: string }): Array<Promise<object>> {
      const promises = new Array<Promise<object>>()

    // Chargement des images
    for (const [name, url] of Object.entries(images)) {
      const img = new Image()

      const promise = new Promise<object>((resolve, reject) => {
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
