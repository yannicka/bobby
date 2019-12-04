# Niveaux

## Représentation interne de chaque cellule

Chaque cellule est représentée sous la forme d'un ou plusieurs caractères.

L'assemblage de ces caractères permet de former les niveaux.

- `.` : vide ;

- `#` : rocher ;

- `S` : balise de début de niveau *(start)* ;

- `E` : balise de fin de niveau *(end)* ;

- `$` : pièce ;

- `^`, `>`, `v` et `<` : tapis roulants (respectivement haut, droit, bas et
gauche) ;

- `T`, `F`, `J` et `L` : tourniquets à angle droit. Regarder où la lettre a un
angle droit pour se rappeler de la position de l'angle, sauf pour `T`
(respectivement haut-droit, haut-gauche, bas-droit et bas-gauche) ;

- `H` et `=` : tourniquets verticaux et horizontaux ;

- `8`, `6`, `2` et `4` : tourniquets à un seul bord. Le chiffre a été
sélectionné en fonction de la position sur le pavé numérique (respectivement
bord haut, droit, bas et gauche) ;

- `!` : glace (« ! » car c'est dangereux, ça glisse) ;

- `B`, `B2` et `B3` : bouton (respectivement avec 1, 2 et 3 passes
autorisées) ;

- `U` : motte de terre / élévation. Ce type de cellule n'est pas utilisé
  actuellement en jeu. Le passage de ce bloc n'est possible que du haut vers le
  bas.

## Astuces de création

- Les pièces servent à obliger le joueur à passer dans un endroit donné ;

- Un tourniquet à angle droit peut être assemblé avec un bouton pour ne
  permettre de le prendre qu'une fois dans un sens donné ;

- Un niveau difficile « à lire » peut être plus complexe à jouer qu'un niveau
  de difficulté similaire mais plus facile à lire, car le « bruit » déstabilise
  le joueur, qui cherche à comprendre l'utilité de chaque case ;

- Les tourniquets peuvent être utilisés pour de nombreux mécanismes :

  - Bloquer l'accès après l'avoir utilisé ;
  - Autoriser de multiples passages dans divers sens ;
  - Rendre possible un chemin dans un sens, puis ensuite dans un autre ;
  - Etc.
