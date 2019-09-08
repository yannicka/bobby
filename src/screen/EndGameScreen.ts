import m from 'mithril'

export const EndGameScreen: m.Component = {
  view() {
    return [
      m('h1', 'Bobby'),
      'Vous avez fini le jeu. Félicitations.',
    ]
  },
}
