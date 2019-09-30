import m from 'mithril'

import { Game } from '../Game'
import { Keyboard } from '../input/Keyboard'
import { Pointer } from '../input/Pointer'
import { Touch } from '../input/Touch'
import { state } from '../State'

let game: Game = null

export class GameScreen {
  private keyboard: Keyboard
  private pointer: Pointer

  public view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-level' }, 'Niveau X/Y'),
        m('div', { 'class': 'actionbar-menu' }, [
          m('button', { 'onclick': showMenu, 'class': 'actionbar-button' }, 'Menu'),
          m('nav', { 'class': 'actionbar-menu-nav' }, [
            m('button', { 'onclick': restartLevel, 'class': 'actionbar-nav-button' }, 'Recommencer le niveau'),
            m(m.route.Link, { 'href': '/choose-level', 'class': 'actionbar-nav-button' }, 'Retourner au menu'),
          ]),
        ]),
      ]),
      m('div', { 'id': 'app-wrapper' }, [
        m('canvas', { 'id': 'app' }),
      ]),
    ]
  }

  public oncreate(vnode: m.Vnode) {
    const canvas = document.getElementById('app') as HTMLCanvasElement

    this.keyboard = new Keyboard()
    this.pointer = new Touch(canvas)

    const attrs = vnode.attrs as any

    const levelName = attrs.level as string

    game = new Game(this, levelName)

    updateActionbarLevel(levelName)

    document.addEventListener('click', documentClickEvent)

    document.body.classList.add('bg-dark')
  }

  public onupdate(vnode: m.Vnode) {
    const attrs = vnode.attrs as any

    game.stop()
    game.unlisten()

    const levelName = attrs.level as string

    game = new Game(this, levelName)

    updateActionbarLevel(levelName)
  }

  public onremove(vnode: m.Vnode) {
    game.stop()
    game.unlisten()

    document.removeEventListener('click', documentClickEvent)

    document.body.classList.remove('bg-dark')

    this.keyboard.unlisten()
    this.pointer.unlisten()
  }

  public getKeyboard(): Keyboard {
    return this.keyboard
  }

  public getPointer(): Pointer {
    return this.pointer
  }
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
