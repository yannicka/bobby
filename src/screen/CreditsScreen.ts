import m from 'mithril'
import { Superapp } from '../Superapp'

const CREDITS = [
  `Yannick A. « Pif » : idée, code, graphisme.`,
]

const THANKS = [
  `Merci à Aur36 pour son aide sur la réalisation de niveaux, ses nombreux
  tests et retours et son enthousiasme sans limite.`,

  `Merci à oräkle - Ethan G. pour son assistance graphique.`,

  `Merci à Alceste_ pour ses améliorations de code et de fonctionnement
  global.`,

  `Merci à Polyson pour sa proposition de niveaux à bords ouverts et ses divers
  conseils et retours.`,

  `Merci aux membres du groupe de développement dont je fais partie pour leur
  soutien dans le développement du projet, et pour leurs divers retours.`,
]

export class CreditsScreen {
  public view() {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Retour'),
        ]),
      ]),

      m('div', { 'class': 'main-wrapper main-wrapper-unaligned' }, [
        m('div', { 'class': 'main-content' }, [
          m('h2', 'Crédits'),
          CREDITS.map((text: string) => m('p', text)),
          m('h2', 'Remerciements'),
          THANKS.map((text: string) => m('p', text)),
          m('h2', 'Code source'),
          m('p', 'Code source sous licence libre AGPLv3+.'),
          m('p', [
            m('a', { 'href': 'https://gitlab.com/yannicka/bobby' }, 'https://gitlab.com/yannicka/bobby'),
          ]),
        ]),
      ]),
    ]
  }

  public oncreate(): void {
    Superapp.resize()
  }
}
