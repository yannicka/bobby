import m from 'mithril'
import { Superapp } from '../Superapp'
import { state } from '../State'
import { EndGame } from '../EndGame'

export class EndGameScreen {
  private endGame: EndGame

  public view(): Array<m.Vnode> {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Aller à l\'écran d\'accueil'),
        ]),
      ]),

      m('div', { 'id': 'app-wrapper' }, [
        m('canvas', { 'id': 'app' }),
        m('div', { 'id': 'end-game' }, [
          m('p', { 'class': 'center' }, 'Félicitations, vous avez fini le jeu. 🎉'),
          m('p', { 'class': 'center' }, '🥳 Merci d\'avoir joué !'),
        ]),
      ]),
    ]
  }

  public oncreate(_vnode: m.Vnode): void {
    if (!state.getStorage().areAllLevelsSucceeded()) {
      m.route.set('/choose-level')
    }

    Superapp.resize()

    this.endGame = new EndGame()
  }

  public onremove(_vnode: m.Vnode): void {
    this.endGame.stop()
    this.endGame.unlisten()
  }
}
