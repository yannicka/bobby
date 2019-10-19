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
      m('div', { 'class': 'main-wrapper' }, [
        m('div', { 'class': 'main-content' }, [
          m('p', 'Récoltez les pièces dans chaque niveau.'),
        ]),
      ]),
    ]
  },
}
