// Gestion du chargement des images.
//
// Fonctionnement :
// 
// ```
// const imageManager = new ImageManager()
// imageManager.setPath('assets/img')
//
// const loader = imageManager.load(images)
//
// Promise.all(loader).then(() => {
//   // code
// })
// ```
export default class ImageManager {
  // Images chargées
  private images: { [key: string]: HTMLImageElement } = {}

  // Chemin où sont recupérées les images
  private path: string = ''

  // Obtenir une image par son nom
  public getImage(name: string): HTMLImageElement {
    return this.images[name]
  }

  // Définir le chemin dans lequel les images sont chargées
  public setPath(path: string): void {
    this.path = path
  }

  // Obtenir le chemin dans lequel les images sont chargées
  public getPath(): string {
    return this.path
  }

  // Exécute le chargement des images
  public load(images: { [key: string]: string }): Array<Promise<HTMLImageElement>> {
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
