import m, { Attributes, Vnode } from 'mithril'

import { Level } from '../Level'
import { state } from '../State'

const LevelComponent: m.Component = {
  view(vnode: m.Vnode) {
    const level: Level = (vnode.attrs as any).level

    const classes: Array<string> = []
    classes.push('level')
    classes.push(level.dynamic.accessible ? 'accessible' : 'unaccessible')
    classes.push(level.user.success ? 'success' : 'unsuccess')

    const classesText = classes.join(' ')

    return m('div', { 'class': classesText }, [
      m(m.route.Link, { 'href': `/game/${level.fixed.name}` }, level.fixed.number),
    ])
  },
}

export const ChooseLevelScreen: m.Component = {
  oninit() {
    state.loadLevels()
  },

  view(vnode) {
    const childrens: Array<Vnode> = Object.values(state.levels).map((level: Level) =>
      m(LevelComponent, { level } as Attributes),
    )

    return [
      m('div', { 'class': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Retour'),
        ]),
      ]),
      m('div', { 'class': 'main-wrapper main-wrapper-unaligned' }, [
        m('div', { 'class': 'main-content' }, [
          m('div', { 'class': 'levels' }, childrens),
        ]),
      ]),
    ]
  },
}
