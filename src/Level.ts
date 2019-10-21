export interface LevelUser {
  success: boolean
}

export interface LevelFixed {
  readonly map: Array<Array<string>>
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

/*
 * Parseur de niveaux :
 *
 * - Les espaces sont ignorés
 * - Les lignes vides sont ignorées
 * - « . » correspond à un vide
 * - Voir `cells` de `./Cell.ts` pour connaitre la signification des symboles
 */
function parseStringLevel(level: string): Array<Array<string>> {
  // Retirer tous les espaces
  const levelWithoutSpace = level.replace(/ /g, '')

  // Coupe à chaque ligne
  let lines = levelWithoutSpace.split(/\n/)

  // Retire les lignes vides
  lines = lines.filter((el: string) => el.length > 0)

  const map = []

  for (const line of lines) {
    const cells = line.split('')

    map.push(cells)
  }

  return map
}

export class LevelManager {
  public getLevelsFixed(): { [key: string]: LevelFixed } {
    const levels = {
      'Halley': {
        map: `
          # # # # # # # # #
          # # # . E . # # #
          # # . . . . . # #
          # $ . . . . . $ #
          # $ . . . . . $ #
          # $ . . . . . $ #
          # # . . . . . # #
          # # # . S . # # #
          # # # # # # # # #
        `,
      },

      'Encke': {
        map: `
          # # # # # # # # # # #
          # $ . . . . . . . $ #
          # . . . . . . . . . #
          # . . # # . # # . . #
          # . . # $ . $ # . . #
          # . . . . E . . . . #
          # . . # $ . $ # . . #
          # . . # # . # # . . #
          # . . . . S . . . . #
          # $ . . . . . . . $ #
          # # # # # # # # # # #
        `,
      },

      'Biela': {
        map: `
          # # # # # # # # #
          # # . . E . . # #
          # # . . . . . # #
          # $ > . . . < $ #
          # $ # . . . # $ #
          # $ < . . . > $ #
          # # . . . . . # #
          # # . . S . . # #
          # # # # # # # # #
        `,
      },

      'Faye': {
        map: `
          # # # # # # # # #
          # # . . E . . # #
          # # . . . . . # #
          # $ < ^ ^ ^ < $ #
          # $ # . . . # $ #
          # $ > . . . > $ #
          # # . . . . . # #
          # # . . S . . # #
          # # # # # # # # #
        `,
      },

      'Brorsen': {
        map: `
          # # # # # # # # #
          # S . ! ! ! ! . #
          # # # # # # # . #
          # $ $ $ $ $ # . #
          # # # # # ! # . #
          # . . . . ! # . #
          # . . . . ! # . #
          # . . . . . . E #
          # # # # # # # # #
        `,
      },

      'Tuttle': {
        map: `
          # # # # # # # # #
          # S # . . . . . #
          # . ! # . . . . #
          # # ! $ # $ . . #
          # . ! ! ! ! # . #
          # . # . # # . . #
          # . . . # . . . #
          # . . . # . . E #
          # # # # # # # # #
        `,
      },

      'Tempel': {
        map: `
          # # # # # # # # #
          # . . . S . . . #
          # . . # . # . . #
          # # # # $ # # # #
          # . . $ H $ . . #
          # . # # $ # # . #
          # . . # . # . . #
          # . . . E . . . #
          # # # # # # # # #
        `,
      },

      'Olbers': {
        map: `
          # # # # # # # # #
          # S . . . . . . #
          # . . # # # . . #
          # . # # $ # # . #
          # S . $ J $ # . #
          # . # # $ # # . #
          # . . # # # . . #
          # . . . E . . . #
          # # # # # # # # #
        `,
      },

      'Wolf': {
        map: `
          # # # # # # # # #
          # $ . . # . . $ #
          # . . . # . . . #
          # . . . # . . . #
          # S . . B . . E #
          # . . . # . . . #
          # . . . # . . . #
          # $ . . # . . $ #
          # # # # # # # # #
        `,
      },

      'Finlay': {
        map: `
          # # # # # # # # #
          # S . B . . . $ #
          # . . # . # . . #
          # . # . . . # . #
          # . B . . . # . #
          # B # . . . # . #
          # . . # # # # # #
          # $ . . . . . E #
          # # # # # # # # #
        `,
      },

      'Brooks': {
        map: `
          # # # # # # # # #
          # . . . S . . . #
          # . . . . . . . #
          # M M M M M M M #
          # $ M $ M $ M $ #
          # . . . E . . . #
          # . . M . M . . #
          # . . $ . $ . . #
          # # # # # # # # #
        `,
      },

      'Holmes': {
        map: `
          # # # # # # # # #
          # S # $ $ $ $ $ #
          # . # . . . . . #
          # M # M M . M M #
          # . . . . . . . #
          # # # M # M # # #
          # . . . # . . . #
          # . . . # $ . E #
          # # # # # # # # #
        `,
      },

      'Borrelly': {
        map: `
          # # # # # # # # #
          # S . . # . . . #
          # . . . # # . $ #
          # # # L = # . . #
          # . # L T $ . . #
          # . # # # # . . #
          # . . . . . . . #
          # . . . . . . E #
          # # # # # # # # #
        `,
      },

      'Westphal': {
        map: `
          # # # # # # # # #
          # S # # # . ! # #
          # . . ! ! $ ! $ #
          # # # ! ! . ! . #
          # . . ! ! ! ! ! #
          # . . . ! # . # #
          # # # # ! # . . #
          # . $ . $ # . E #
          # # # # # # # # #
        `,
      },

      'Kopff': {
        map: `
          # # # # # # # # # # # #
          # . . = . . . . . . . #
          # $ . # . . . . . . . #
          # . . # . . $ . . . . #
          # # H # . # # # . . . #
          # . . . = S E . J . $ #
          # # H # . # # # . . . #
          # . . # . . $ . . . . #
          # $ . # . . . . . . . #
          # . . = . . . . . . E #
          # # # # # # # # # # # #
        `,
      },

      'Schaumasse': {
        map: `
          # # # # # # # # # # # # # # # # # # # #
          # S . . . . . . . . . . . . # . . . . #
          # . # # # # # # # # # . # . # . # . . #
          # . . . . # . . . . . . # . # # # . # #
          # # # # . # . # # # # # # . # . . . . #
          # . . . . # . # . # . . . . # . # # . #
          # . # # . # . # . # . # # # # . # . . #
          # . . # . . . . . # . . . . . . # . # #
          # # . # # # # # . # # # # . # . # . . #
          # . . # . . . # . # . . . . # . # # # #
          # . # # . # . # . # # # # . # . . . . #
          # . . . . # . # . # . . . . # # # # . #
          # # # # # # . # . # . # # # # . # . . #
          # . # . . . . # . # . . # . . . # . # #
          # . . . # . # # . # # . # . # # # . . #
          # . # # # . # . . . . . # . # . # # . #
          # . # . . . # # # # # # # . # . . . . #
          # . # # # # # . # . . . # . # . # # # #
          # . . . . . . . . . # . . . # . . . E #
          # # # # # # # # # # # # # # # # # # # #
        `,
      },

      /*

      'empty': {
        map: `
          # # # # # # # # #
          # S . . . . . . #
          # . . . . . . . #
          # . . . . . . . #
          # . . . . . . . #
          # . . . . . . . #
          # . . . . . . . #
          # . . . . . . E #
          # # # # # # # # #
        `,
      },

      */
    }

    const levelsReturned: { [key: string]: LevelFixed } = {}

    let i = 1

    for (const [ name, level ] of Object.entries(levels)) {
      const l: LevelFixed = {
        map: parseStringLevel(level.map),
        number: i,
        name,
      }

      levelsReturned[name] = l

      i += 1
    }

    return levelsReturned
  }
}
