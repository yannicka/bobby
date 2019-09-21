# Bobby

```
npm install
npm run serve # ou npm run build
```

## Choses à faire

### Niveaux

- Des niveaux ;

- Mettre en forme l'écran de choix de niveau ;

- Mettre en forme l'écran de fin de jeu ;

- Possibilité de redémarrer un niveau ;

- Possibilité de remttre à zéro son avancement.

### Les détails

- Lorsqu'on essaye de se déplacer vers un bloc solide, l'animation ne s'active
  qu'au moment où le clic est lâché. À la place, il ne faudrait soit aucun
  mouvement, soit un mouvement tout le long de l'appui ;

- Améliorer les transitions, très peu paramétrables actuellement.

### Mobile

- Donner la possibilité de jouer depuis un téléphone.

### Graphismes

- Améliorer les graphismes.

### Nettoyage du code

- Nettoyer le code qui est sale par endroit ;

- Optimiser le code, qui est totalement sous-optimisé par endroit.

### Bogues connus (et à corriger)

- Dans certains cas, le jeu nous amène vers la page de fin de jeu en plein
  milieu d'un niveau ;

- Les tapis roulant (et sûrement la glace) ne changent pas le sens du joueur.

### En bonus *(si possible)*

- Compter le nombre de pas et attribuer un score à chaque niveau (3 = parfait,
  nombre de pas minimal atteint ; 2 = bien ; 1 = bof ; 0 = nul) ;

- Ajouter de nouveaux mécanismes (par exemple des caisses amovibles, mais cela
  nécessite une refonte du système de grille) ;

- Ajouter une vue d'oiseau.

## Ressources intéressantes

- https://github.com/mozdevs/gamedev-js-tiles/
- https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
