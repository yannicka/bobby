export interface LevelUser {
  success: boolean
}

export interface LevelFixed {
  readonly map: Array<Array<number>>
  readonly name: string
  readonly number: number
}

export interface LevelDynamic {
  readonly accessible: boolean
}

export interface Level {
  // Statique. Ne change pas.
  fixed: LevelFixed

  // Dynamique.
  dynamic: LevelDynamic

  // Lié à ce que fait l'utilisateur.
  user: LevelUser
}

export class LevelManager {
  public getLevelsFixed(): { [key: string]: LevelFixed } {
    const levels = {
      'Halley': {
        map: [
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
          [  2, 14,  0,  8,  8,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  7,  4,  0,  2 ],
          [  2,  0,  0, 10,  0,  7,  0,  0,  2 ],
          [  2, 16, 17,  0,  0,  0,  0,  0,  2 ],
          [  2, 16, 17, 17,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  2,  2,  0, 18,  0,  2 ],
          [  2,  0,  0,  0,  2,  0,  0, 15,  2 ],
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
        ],
      },

      'Encke': {
        map: [
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
          [  2, 14,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0, 15,  2 ],
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
        ],
      },

      'Biela': {
        map: [
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
          [  2, 15,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
          [  2,  0,  0,  0,  0,  0,  0, 14,  2 ],
          [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
        ],
      },
    }

    const levelsReturned: { [key: string]: LevelFixed } = {}

    let i = 1

    for (const [ name, level ] of Object.entries(levels)) {
      const l: LevelFixed = {
        map: level.map,
        number: i,
        name,
      }

      levelsReturned[name] = l

      i += 1
    }

    return levelsReturned
  }
}
