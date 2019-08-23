# Bobby

```
npm install
npm run serve # ou npm run build
```

## Choses à faire

### Niveaux

- Une caméra qui suit le joueur ;

- Des niveaux ;

- Une sauvegarde des niveaux faits/à faire ;

- La possibilité, pour moi, développeur, d'intégrer à tout moment des nouveaux
  niveaux, n'importe où (par exemple entre le 4e et le 5e) sans rien casser
  pour la sauvegarde du joueur ;

- Un écran de choix de niveau ;

- Un écran de fin de jeu.

### Les détails

- Lorsqu'on essaye de se déplcer vers un bloc solide, l'animation ne s'active
  qu'au moment où le clic est lâché. À la place, il ne faudrait soit aucun
  mouvement, soit un mouvement tout le long de l'appui ;

- Sur les blocs roulants/glissants (tapis roulant et glace), le personnage
  marche alors qu'il devrait plutôt « glisser » (ne pas bouger les pieds) ;

- Au chargement d'un niveau, l'animation de marche est lancé, ce qui fait que
  le personnage bouge les jambes dans le vide.

### Nettoyage du code

- Nettoyer le code qui est sale par endroit.

### En bonus

- Compter le nombre de pas et attribuer un score à chaque niveau (3 = parfait,
  nombre de pas minimal atteint ; 2 = bien ; 1 = bof ; 0 = nul) ;

- Ajouter de nouveaux mécanismes (par exemple des caisses amovibles, mais cela
  nécessite une refonte du système de grille).

## Ressources intéressantes

- https://github.com/mozdevs/gamedev-js-tiles/
- https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps
