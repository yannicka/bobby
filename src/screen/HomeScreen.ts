import m from 'mithril'

export const HomeScreen: m.Component = {
  view() {
    return [
      m('h1', 'Bobby'),
      m(m.route.Link, { 'href': '/choose-level', 'class': 'btn-play' }, 'Jouer'),
    ]
  },
}
