import m from 'mithril'

export const HomeScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
      ]),
      m('div', { 'class': 'middle' }, [
        m('div', { 'class': 'middle-content' }, [
          m(m.route.Link, { 'href': '/choose-level', 'class': 'btn-play' }, 'Jouer'),
        ]),
      ]),
      m('div', { 'class': 'bottombar' }, [
        m(m.route.Link, { 'href': '/help', 'class': 'btn' }, 'Instructions'),
        m(m.route.Link, { 'href': '/options', 'class': 'btn' }, 'Options'),
      ]),
    ]
  },
}
