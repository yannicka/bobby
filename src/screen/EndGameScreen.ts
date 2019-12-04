import m from 'mithril'
import { Superapp } from '../Superapp'
import { state } from '../State'

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
          m('div', { 'id': 'end' }, [
            m('p', { 'class': 'center' }, 'Félicitations, vous avez fini le jeu. 🎉'),
            m('p', { 'class': 'center' }, '🥳 Merci d\'avoir joué !'),
          ]),
        ]),
      ]),
    ]
  }

  public oncreate(_vnode: m.Vnode): void {
    if (!state.getStorage().areAllLevelsSucceeded()) {
      m.route.set('/choose-level')
    }

    Superapp.resize()
  }

  public onremove(_vnode: m.Vnode): void {
    document.body.classList.remove('end-game')

  }
}
