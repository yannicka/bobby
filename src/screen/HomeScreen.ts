import m from 'mithril'
import { Superapp } from '../Superapp'

export class HomeScreen {
  public view() {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
      ]),

      m('div', { 'class': 'main-wrapper' }, [
        m('div', { 'class': 'main-content' }, [
          m(m.route.Link, { 'href': '/choose-level', 'class': 'btn-play' }, 'Jouer'),
        ]),
      ]),

      m('div', { 'id': 'bottombar' }, [
        m(m.route.Link, { 'href': '/help', 'class': 'btn' }, 'Instructions'),
        m(m.route.Link, { 'href': '/options', 'class': 'btn' }, 'Options'),
      ]),
    ]
  }

  public oncreate(): void {
    Superapp.resize()
  }
}
