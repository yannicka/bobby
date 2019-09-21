import m from 'mithril'

export const EndGameScreen: m.Component = {
  view() {
    return [
      m('div', { 'class': 'actionbar' }, [
        m('div', { 'class': 'actionbar-gamename' }, 'Bobby'),
      ]),
      'Vous avez fini le jeu. Félicitations.',
    ]
  },
}
