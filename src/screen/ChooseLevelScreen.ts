import m, { Attributes } from 'mithril'

import { Level } from '../Level'
import { state } from '../State'

class LevelComponent {
  public view(vnode: m.Vnode) {
    const attrs = vnode.attrs as { level: Level }
    const level: Level = attrs.level

    const classes: Array<string> = []
    classes.push('level')
    classes.push(level.dynamic.accessible ? 'accessible' : 'unaccessible')
    classes.push(level.user.success ? 'success' : 'unsuccess')

    const classesText = classes.join(' ')

    return m('div', { 'class': classesText }, [
      m('button', { 'onclick': () => this.gotoLevel(level.fixed.name) }, level.fixed.number),
    ])
  }

  public gotoLevel(levelName: string): void {
    const storage = state.getStorage()
    const level = storage.getLevels()[levelName]

    if (level.dynamic.accessible) {
      m.route.set('/level/:level', { level: levelName })
    }
  }
}

export class ChooseLevelScreen {
  public oninit() {
    state.loadLevels()
  }

  public view(_vnode: m.Vnode) {
    const levels = state.getLevels()

    const childrens = Object.values(levels).map((level: Level) => {
      const levelAttribute: Attributes = { level }

      return m(LevelComponent, levelAttribute)
    })

    return [
      m('div', { 'id': 'topbar' }, [
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
  }
}
