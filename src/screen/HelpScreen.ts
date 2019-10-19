import m from 'mithril'

export const HelpScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Retour'),
        ]),
      ]),
      m('div', { 'class': 'middle' }, [
        m('div', { 'class': 'middle-content' }, [
          m('p', 'Récoltez les pièces dans chaque niveau.'),
        ]),
      ]),
    ]
  },
}
