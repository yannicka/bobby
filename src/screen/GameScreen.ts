import m from 'mithril'

import { Game } from '../Game'
import { state } from '../State'

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

    const levelName = attrs.level as string

    game = new Game(levelName)

    updateActionbarLevel(levelName)

    document.addEventListener('click', documentClickEvent)
  },

  onupdate(vnode: m.Vnode) {
    const attrs = vnode.attrs as any

    game.stop()

    const levelName = attrs.level as string

    game = new Game(levelName)

    updateActionbarLevel(levelName)
  },

  onremove(vnode: m.Vnode) {
    game.stop()

    document.removeEventListener('click', documentClickEvent)
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

function updateActionbarLevel(levelName: string) {
  const actionbarLevel = document.querySelector('.actionbar-level')

  if (actionbarLevel instanceof HTMLElement) {
    const levels = state.getStorage().getLevels()
    const nbLevels = Object.keys(levels).length
    const levelNumber = levels[levelName].fixed.number

    actionbarLevel.innerText = `${levelNumber}/${nbLevels}`
  }
}

function documentClickEvent(e: MouseEvent) {
  const button = document.querySelector('.actionbar-button')
  const nav = document.querySelector('.actionbar-menu-nav')
  const target = e.target as Node

  if (!nav.contains(target) && target !== button) {
    nav.classList.remove('actionbar-menu-nav-displayed')
  }
}
