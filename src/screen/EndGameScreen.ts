import m from 'mithril'

export const EndGameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'actionbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'actionbar-button' }, 'Aller à l\'écran d\'accueil'),
        ]),
      ]),
      'Vous avez fini le jeu. Félicitations.',
    ]
  },
}
