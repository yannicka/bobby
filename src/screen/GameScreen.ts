import m from 'mithril'

import { Game } from '../Game'

let game: Game = null

export const GameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-level' }, 'Niveau X/Y'),
        m('div', { 'class': 'actionbar-menu' }, [
          m('button', { 'class': 'actionbar-button', 'onclick': showMenu }, 'Menu'),
          m('nav', { 'class': 'actionbar-menu-nav' }, [
            m('button', { 'class': 'actionbar-nav-button', 'onclick': restartLevel }, 'Recommencer le niveau'),
            m('button', { 'class': 'actionbar-nav-button', 'onclick': goToMenu }, 'Retourner au menu'),
          ]),
        ]),
      ]),
      m('canvas', { 'id': 'app' }),
    ]
  },

  oncreate(vnode: m.Vnode) {
    const attrs = vnode.attrs as any

    game = new Game(attrs.level)
  },

  onupdate(vnode: m.Vnode) {
    const attrs = vnode.attrs as any

    game.stop()

    game = new Game(attrs.level)
  },

  onremove(vnode: m.Vnode) {
    game.stop()
  },
}

function showMenu(e: any): void {
  e.redraw = false

  const nav = document.querySelector('.actionbar-menu-nav')

  if (nav instanceof HTMLElement) {
    nav.classList.toggle('actionbar-menu-nav-displayed')
  }
}

function goToMenu(e: any): void {
  m.route.set('/choose-level')
}

function restartLevel(e: any): void {
  e.redraw = true

  const nav = document.querySelector('.actionbar-menu-nav')

  if (nav instanceof HTMLElement) {
    nav.classList.remove('actionbar-menu-nav-displayed')
  }
}
