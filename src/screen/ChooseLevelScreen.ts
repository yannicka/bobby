import m, { Attributes, Vnode } from 'mithril'
import { Level } from '../Level'
import { Storage } from '../Storage'

export const ChooseLevelScreen: m.Component = {
  view() {
    const storage = new Storage()

    const childrens: Array<Vnode> = Object.values(storage.getLevels()).map((level: Level) => {
      return m(LevelComponent, { level } as Attributes)
    })

    return [
      m('h1', 'Bobby'),
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
    }, level.fixed.number))
  },
}
