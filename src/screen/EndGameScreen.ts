import m from 'mithril'

export const EndGameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Aller à l\'écran d\'accueil'),
        ]),
      ]),
      m('div', { 'class': 'main-wrapper' }, [
        m('div', { 'class': 'main-content' }, [
          m('p', 'Vous avez fini le jeu. Félicitations.'),
        ]),
      ]),
    ]
  },
}
