import m from 'mithril'

import { Game } from '../Game'

export const GameScreen: m.Component = {
  view() {
    return m('canvas', { 'id': 'app' })
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
