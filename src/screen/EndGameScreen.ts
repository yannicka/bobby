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
      m('div', { 'class': 'middle' }, [
        m('div', { 'class': 'middle-content' }, [
          m('p', 'Vous avez fini le jeu. Félicitations.'),
        ]),
      ]),
    ]
  },
}
