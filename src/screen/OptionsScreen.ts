import m from 'mithril'

import { state } from '../State'
import { App } from '../App'

export class OptionsScreen {
  public view(): Array<m.Vnode> {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Retour'),
        ]),
      ]),

      m('div', { 'class': 'main-wrapper', 'role': 'main' }, [
        m('div', { 'class': 'main-content' }, [
          m('button', { 'onclick': reset, 'class': 'btn' }, 'Remise à zéro'),
          m('p', { 'class': 'center' }, 'Cela effacera votre progression et vous ramènera au niveau 1.'),
        ]),
      ]),
    ]
  }

  public oncreate(): void {
    App.resize()
  }
}

function reset(_e: object): void {
  if (confirm('Êtes-vous sûr de vouloir effacer votre progression ?')) {
    state.getStorage().reset()

    alert('Votre progression a bien été effacée.')
  }
}
