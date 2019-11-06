# Bobby

```shell
npm install
npm run serve # ou npm run build
```

## Remerciements

Merci à Aur36 pour son aide sur la réalisation de niveaux.

Merci à oräkle - Ethan G. pour son assistance graphique.

Merci à Alceste_ pour ses améliorations de code et de fonctionnement global.

Merci aux membres de Bit My Code pour leur soutien dans le développement du
projet, et pour leurs divers retours.

## Inspirations

Ce jeu s'inspire de :

- [Pascal Penguin](http://www.luduminis.com/pascal/about/) ;

- Bobby Carrot ;

- Pokémon Rouge et Bleu.

## Choses à faire

### Bogues connus (et à corriger)

- Lorsqu'on clique sur un niveau inaccessible, il y a un petit saut
  d'affichage, à corriger ;

- Des traits noirs apparaissent parfois entre les cases ;

- Le déplacement lorsque trois touches sont appuyées n'est pas intuitif.

### Bogues connus (mais minimes)

- Lorsqu'on essaye de se déplacer vers un bloc solide, l'animation ne s'active
  qu'au moment où le clic est lâché. À la place, il ne faudrait soit aucun
  mouvement, soit un mouvement tout le long de l'appui ;

- La première ligne de définition d'un niveau fait preuve de largeur de ce
  niveau. Par conséquent le dernier bloc de la ligne définit la largeur de jeu.
  Cela peut poser problème si on souhaite ne pas mettre de bloc sur toutes les
  cellules de la première ligne.

### En bonus *(si possible)*

- Ajouter une vue d'oiseau.
