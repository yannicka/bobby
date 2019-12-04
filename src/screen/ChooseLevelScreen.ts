import m, { Attributes } from 'mithril'

import { Level } from '../Level'
import { state } from '../State'
import { Superapp } from '../Superapp'

class LevelComponent {
  public view(vnode: m.Vnode): m.Vnode {
    const attrs = vnode.attrs as { level: Level }
    const level: Level = attrs.level

    const classes: Array<string> = []
    classes.push('level')
    classes.push(level.dynamic.accessible ? 'accessible' : 'unaccessible')
    classes.push(level.user.success ? 'success' : 'unsuccess')

    const classesText = classes.join(' ')

    return m('div', { 'class': classesText }, [
      m(m.route.Link, {
        'href': `/level/${level.fixed.name}`,
        'onclick': (event: MouseEvent) => this.gotoLevel(event, level.fixed.name)
      }, level.fixed.number),
    ])
  }

  public oncreate(): void {
    Superapp.resize()
  }

  public gotoLevel(event: MouseEvent, levelName: string): void {
    event.preventDefault()

    const storage = state.getStorage()
    const level = storage.getLevels()[levelName]

    if (level.dynamic.accessible) {
      m.route.set('/level/:level', { level: levelName })
    }
  }
}

export class ChooseLevelScreen {
  public oninit(): void {
    state.loadLevels()
  }

  public view(_vnode: m.Vnode): Array<m.Vnode> {
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
