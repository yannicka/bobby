import Player from './Player'
import Direction from './Direction'

export const CELL_SIZE = 50

export enum CellType {
  Ground, // Sol

  Grass, // Herbe (bloquant : impossible de marcher dessus)
  Fence, // Barrière (bloquant)

  SpadeDeactivated, // Pique avant que l'on marche dessus
  SpadeActivated,   // Pique après avoir marché dessus

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

interface Cell {
  nextState?(): CellType
  onPassingEvent?(player: Player): CellType|null
  isSolid?(direction: Direction): boolean
  isBlocking?(direction: Direction): boolean
}

const cells2: { [key: number]: Cell } = {
  [CellType.Grass]: {
    isSolid(_direction: Direction): boolean {
      return true
    },
  },

  [CellType.Fence]: {
    isSolid(_direction: Direction): boolean {
      return true
    },
  },

  [CellType.SpadeActivated]: {
    isSolid(_direction: Direction): boolean {
      return true
    },
  },

  [CellType.SpadeDeactivated]: {
    nextState(): CellType {
      return CellType.SpadeActivated
    },
  },

  [CellType.TurnstileUpRight]: {
    nextState(): CellType {
      return CellType.TurnstileDownRight
    },

    isSolid(direction: Direction): boolean {
      return [ Direction.Down, Direction.Left ].includes(direction)
    },

    isBlocking(direction: Direction): boolean {
      return [ Direction.Up, Direction.Right ].includes(direction)
    },
  },

  [CellType.TurnstileUpLeft]: {
    nextState(): CellType {
      return CellType.TurnstileUpRight
    },

    isSolid(direction: Direction): boolean {
      return [ Direction.Down, Direction.Right ].includes(direction)
    },

    isBlocking(direction: Direction): boolean {
      return [ Direction.Up, Direction.Left ].includes(direction)
    },
  },

  [CellType.TurnstileDownRight]: {
    nextState(): CellType {
      return CellType.TurnstileDownLeft
    },

    isSolid(direction: Direction): boolean {
      return [ Direction.Up, Direction.Left ].includes(direction)
    },

    isBlocking(direction: Direction): boolean {
      return [ Direction.Down, Direction.Right ].includes(direction)
    },
  },

  [CellType.TurnstileDownLeft]: {
    nextState(): CellType {
      return CellType.TurnstileUpLeft
    },

    isSolid(direction: Direction): boolean {
      return [ Direction.Up, Direction.Right ].includes(direction)
    },

    isBlocking(direction: Direction): boolean {
      return [ Direction.Down, Direction.Left ].includes(direction)
    },
  },

  [CellType.ConveyorBeltRight]: {
    onPassingEvent(player: Player): CellType|null {
      player.move(Direction.Right)

      return null
    },
  },

  [CellType.Carrot]: {
    onPassingEvent(_player: Player): CellType|null {
      return CellType.CarrotHole
    },
  },
}


export function nextState(cellType: CellType): CellType {
  if (typeof cells2[cellType] !== 'undefined' && typeof cells2[cellType].nextState === 'function') {
    return cells2[cellType].nextState()
  }

  return cellType
}

export function onPassingEvent(cellType: CellType, player: Player): CellType|null {
  if (typeof cells2[cellType] !== 'undefined' && typeof cells2[cellType].onPassingEvent === 'function') {
    return cells2[cellType].onPassingEvent(player)
  }

  return null
}

export function isSolid(cellType: CellType, direction: Direction): boolean {
  if (typeof cells2[cellType] !== 'undefined' && typeof cells2[cellType].isSolid === 'function') {
    return cells2[cellType].isSolid(direction)
  }

  return false
}

export function isBlocking(cellType: CellType, direction: Direction): boolean {
  if (typeof cells2[cellType] !== 'undefined' && typeof cells2[cellType].isBlocking === 'function') {
    return cells2[cellType].isBlocking(direction)
  }

  return false
}

export const cells: { [key: number]: CellType } = {
  1: CellType.Ground,

  2: CellType.Grass,
  3: CellType.Fence,

  4: CellType.SpadeDeactivated,
  5: CellType.SpadeActivated,

  6: CellType.ConveyorBeltUp,
  7: CellType.ConveyorBeltDown,
  8: CellType.ConveyorBeltRight,
  9: CellType.ConveyorBeltLeft,

  10: CellType.TurnstileUpRight,
  11: CellType.TurnstileUpLeft,
  12: CellType.TurnstileDownRight,
  13: CellType.TurnstileDownLeft,

  14: CellType.Start,
  15: CellType.End,

  16: CellType.Carrot,
  17: CellType.CarrotHole,
}
