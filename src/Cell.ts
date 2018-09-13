export const CELL_SIZE = 50

export enum CellType {
  Ground, // Sol

  Grass, // Herbe (bloquant : impossible de marcher dessus)
  Fence, // Barrière (bloquant)

  SpadeDeactivated, // Pique (avant que l'on marche dessus)
  SpadeActivated,   // Pique (après avoir marché dessus)

  ConveyorBeltUp,    // Tapis roulant vers le haut
  ConveyorBeltDown,  // Tapis roulant vers le bas
  ConveyorBeltRight, // Tapis roulant vers la droite
  ConveyorBeltLeft,  // Tapis roulant vers la gauche

  TurnstileUpRight,   // Tourniquet (haut/droite)
  TurnstileUpLeft,    // Tourniquet (haut/gauche)
  TurnstileDownRight, // Tourniquet (bas/droite)
  TurnstileDownLeft,  // Tourniquet (bas/gauche)

  Start, // Balise de début de niveau
  End,   // Balise de fin de niveau

  Carrot,     // Carotte à manger
  CarrotHole, // Trou de carotte (s'affiche après avoir mangé la carotte)
}

export function nextState(cellType: CellType) {
  switch (cellType) {
    case CellType.SpadeDeactivated:
      return CellType.SpadeActivated

    case CellType.TurnstileUpRight:
      return CellType.TurnstileDownRight

    case CellType.TurnstileUpLeft:
      return CellType.TurnstileUpRight

    case CellType.TurnstileDownRight:
      return CellType.TurnstileDownLeft

    case CellType.TurnstileDownLeft:
      return CellType.TurnstileUpLeft

    default:
      return cellType
  }
}
