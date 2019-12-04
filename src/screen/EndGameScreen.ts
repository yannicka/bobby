import m from 'mithril'
import { Superapp } from '../Superapp'
import { state } from '../State'

async function delay(ms: number): Promise<unknown> {
  return new Promise((resolve: () => void) => setTimeout(resolve, ms))
}

export class EndGameScreen {
  public view(): Array<m.Vnode> {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Aller à l\'écran d\'accueil'),
        ]),
      ]),

      m('div', { 'class': 'main-wrapper' }, [
        m('div', { 'class': 'main-content' }, [
          m('p', { 'id': 'end-game-text', 'class': 'center' }, 'Jeu terminé.'),
        ]),
      ]),
    ]
  }

  public oncreate(_vnode: m.Vnode): void {
    if (!state.getStorage().areAllLevelsSucceeded()) {
      m.route.set('/choose-level')
    }

    Superapp.resize()

    const SECOND = 1000

    document.body.classList.add('end-game')

    const endGameText = document.getElementById('end-game-text')

    endGameText.innerText = '🥳 Bravo'

    delay(4 * SECOND).then(async () => {
      endGameText.innerText = 'Vous avez fini le jeu !'

      return delay(3 * SECOND)
    }).then(async () => {
      endGameText.innerText = 'Félicitations. 🎉'

      return delay(3 * SECOND)
    }).then(async () => {
      endGameText.innerText = 'Merci d\'avoir joué.'

      return delay(3 * SECOND)
    }).then(async () => {
      endGameText.innerText = '🥳 Vous avez terminé le jeu. 🎉'

      return delay(100 * SECOND)
    }).then(async () => {
      endGameText.innerText = 'Vous ne pourrez plus connaitre la joie de découvrir le jeu. 😞'

      return delay(50 * SECOND)
    }).then(async () => {
      endGameText.innerText = 'Vous pouvez partir.'

      return delay(10 * SECOND)
    }).then(async () => {
      endGameText.innerText = 'Vraiment, vous pouvez partir...'

      return delay(10 * SECOND)
    }).then(() => {
      endGameText.innerText = 'Vraiment... vous pouvez partir.'
    })
  }

  public onremove(_vnode: m.Vnode): void {
    document.body.classList.remove('end-game')
  }
}
