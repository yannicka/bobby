import m from 'mithril'

export const EndGameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'actionbar-menu' }, [
          m('button', { 'class': 'actionbar-button', 'onclick': goToHome }, 'Aller à l\'écran d\'accueil'),
        ]),
      ]),
      'Vous avez fini le jeu. Félicitations.',
    ]
  },
}

function goToHome(e: any): void {
  m.route.set('/')
}
