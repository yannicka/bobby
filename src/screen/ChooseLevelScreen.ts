import m, { Attributes, Vnode } from 'mithril'

import { Level } from '../Level'
import { state } from '../State'

export const ChooseLevelScreen: m.Component = {
  oninit() {
    state.loadLevels()
  },

  view(vnode) {
    const childrens: Array<Vnode> = Object.values(state.levels).map((level: Level) =>
      m(LevelComponent, { level } as Attributes))

    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
      ]),
      m('div', { 'class': 'levels' }, childrens),
    ]
  },
}

const LevelComponent: m.Component = {
  view(vnode: m.Vnode) {
    const level = (vnode.attrs as any).level

    const classes: Array<string> = []
    classes.push('level')
    classes.push(level.dynamic.accessible ? 'accessible' : 'unaccessible')
    classes.push(level.user.success ? 'success' : 'unsuccess')

    const classesText = classes.join(' ')

    return m('div', { 'class': classesText }, m(m.route.Link, {
      'href': `/game/${level.fixed.name}`,
    },                                          level.fixed.number))
  },
}
