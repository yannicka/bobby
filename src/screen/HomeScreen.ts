import m from 'mithril'
import { App } from '../App'

export class HomeScreen {
  public view(): Array<m.Vnode> {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
      ]),

      m('div', { 'class': 'main-wrapper' }, [
        m('div', { 'class': 'main-content' }, [
          m('h1', { 'class': 'logo' }, 'Bobby'),
          m(m.route.Link, { 'href': '/choose-level', 'class': 'btn-play' }, 'Jouer'),
        ]),
      ]),

      m('div', { 'id': 'bottombar', 'role': 'main' }, [
        m(m.route.Link, { 'href': '/help', 'class': 'btn' }, 'Instructions'),
        m(m.route.Link, { 'href': '/credits', 'class': 'btn' }, 'Crédits'),
        m(m.route.Link, { 'href': '/options', 'class': 'btn' }, 'Options'),
      ]),
    ]
  }

  public oncreate(): void {
    App.resize()
  }
}
