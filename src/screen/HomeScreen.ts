import m from 'mithril'

export const HomeScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
      ]),
      m(m.route.Link, { 'href': '/choose-level', 'class': 'btn-play' }, 'Jouer'),
    ]
  },
}
