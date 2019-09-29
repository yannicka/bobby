import m from 'mithril'

import { state } from '../State'

export const OptionsScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'actionbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'actionbar-button' }, 'Retour'),
        ]),
      ]),
      m('button', { 'onclick': reset, 'class': 'btn' }, 'Remise à zéro'),
      m('p', 'Cela effacera votre progression et vous ramènera au niveau 1'),
    ]
  },
}

function reset(e: any): void {
  if (confirm('Êtes-vous sûr ?')) {
    state.getStorage().reset()
  }
}
