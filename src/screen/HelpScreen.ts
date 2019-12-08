import m from 'mithril'
import { App } from '../App'

export class HelpScreen {
  public view(): Array<m.Vnode> {
    return [
      m('div', { 'id': 'topbar' }, [
        m('div', { 'class': 'topbar-gamename' }, 'Bobby'),
        m('div', { 'class': 'topbar-menu' }, [
          m(m.route.Link, { 'href': '/', 'class': 'topbar-button' }, 'Retour'),
        ]),
      ]),

      m('div', { 'class': 'main-wrapper main-wrapper-unaligned' }, [
        m('div', { 'class': 'main-content' }, [
          m('h2', 'Touches'),
          m('p', 'Déplacer le personnage avec les flèches directionnelles 🡨 🡪 🡩 🡫 ou ZQSD, ou bien via la souris ou l\'écran tactile.'),

          m('h2', 'Objectif'),
          m('p', 'Réussir tous les niveaux.'),
          m('p', 'Pour chaque niveau, récupérer toutes les pièces puis atteindre la sortie.'),

          m('h2', 'Blocs'),
          m('p', 'Les rochers vous bloque.'),
          m('p', 'Les tapis roulant vous emmène dans une direction donnée.'),
          m('p', 'Les boutons ne vous permettent qu\'un nombre restreint de passages.'),
          m('p', 'Les tourniquets vous bloque certaines directions et tournent dans le sens horaire quand vous en sortez.'),
          m('p', 'La glace vous fait glisser jusqu\'au prochain vide ou bloc solide que vous rencontrez.'),
        ]),
      ]),
    ]
  }

  public oncreate(): void {
    App.resize()
  }
}
