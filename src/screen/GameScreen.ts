import m from 'mithril'

import { Game } from '../Game'

export const GameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-level' }, 'Niveau X/Y'),
        m('div', { 'class': 'actionbar-menu' }, [
          m('button', { 'class': 'actionbar-button', 'onclick': showMenu }, 'Menu'),
          m('nav', { 'class': 'actionbar-menu-nav' }, [
            m('button', { 'class': 'actionbar-nav-button' }, 'Recommencer le niveau'),
            m('button', { 'class': 'actionbar-nav-button' }, 'Retourner au menu'),
          ]),
        ]),
      ]),
      m('canvas', { 'id': 'app' }),
    ]
  },

  oncreate(vnode: m.Vnode) {
    const attrs = vnode.attrs as any

    const game = new Game(attrs.level)
  },

  onupdate(vnode): any {
    const attrs = vnode.attrs as any

    const game = new Game(attrs.level)
  },
}

function showMenu(): void {
  const nav = document.querySelector('.actionbar-menu-nav')

  if (nav) {
    nav.classList.toggle('actionbar-menu-nav-displayed')
  }
}
