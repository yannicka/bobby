const DEFAULT_SCREEN_WIDTH = 9
const DEFAULT_SCREEN_HEIGHT = 9

export interface LevelUser {
  success: boolean
}

export interface LevelFixed {
  readonly map: Array<Array<string>>
  readonly name: string
  readonly number: number
  readonly screenWidth: number
  readonly screenHeight: number
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
 * Parseur de niveau :
 *
 * - Les espaces sont ignorés au début de chaque ligne
 * - Les lignes vides sont ignorées
 * - Les espaces séparent les cellules
 */
function parseStringLevel(level: string): Array<Array<string>> {
  // Retire les espaces au début de chaque ligne
  let levelWithoutSpace = level.replace(/^ +/gm, '')

  // Remplace les espaces consécutifs par une seule espace
  levelWithoutSpace = levelWithoutSpace.replace(/ +/g, ' ')

  // Coupe à chaque ligne
  let lines = levelWithoutSpace.split(/\n/)

  // Retire les lignes vides
  lines = lines.filter((el: string) => el.length > 0)

  const map = []

  for (const line of lines) {
    const cells = line.split(' ')

    map.push(cells)
  }

  return map
}

/**
 * Le nommage provient de :
 * https://fr.wikipedia.org/wiki/Liste_des_com%C3%A8tes_p%C3%A9riodiques_num%C3%A9rot%C3%A9es
 *
 * Avoir un nom à chaque niveau, plutôt qu'un numéro, permet d'intégrer des
 * nouveaux niveaux n'importe où.
 */
export class LevelManager {
  public getLevels(): { [key: string]: LevelFixed } {
    interface LevelType {
      [key: string]: {
        map: string;
        screenWidth?: number;
        screenHeight?: number;
      }
    }

    const levels: LevelType = {
      // Premier niveau, prise en main des déplacements, de la récupération des
      // pièces et de la balise de fin de niveau
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

      // Caméra
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

      // Tapis roulants
      'Biela': {
        map: `
          # # # # # # # # #
          # # . . E . . # #
          # # . . . . . # #
          # $ > . . . < $ #
          # $ # . # . # $ #
          # $ < . . . > $ #
          # # . . . . . # #
          # # . . S . . # #
          # # # # # # # # #
        `,
      },

      'Faye': {
        map: `
          # # # # # # # # #
          # # # # E # # # #
          # # # # . # # # #
          # . . > . > . . #
          # $ . # # # . $ #
          # # ^ # $ # v # #
          # # ^ # . # v # #
          # . . . S . . . #
          # # # # # # # # #
        `,
      },

      // Glace
      'Brorsen': {
        map: `
          # # # # # # # # #
          # S . ! ! ! ! . #
          # # # # # # ! . #
          # $ $ $ $ $ # . #
          # # # # ! ! # . #
          # . . . # ! # . #
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

      // Tourniquets
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
          # . . . . . . . #
          # . . # # # . . #
          # . # # $ # # . #
          # S . $ J $ # . #
          # . # # $ # # . #
          # . . # # # . . #
          # . . . E . . . #
          # # # # # # # # #
        `,
      },

      // Boutons
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

      // Mottes de terre
      'Brooks': {
        map: `
          # # # # # # # # #
          # . . . S . . . #
          # . . . . . . . #
          # U U U U U U U #
          # $ U $ U $ U $ #
          # . . . E . . . #
          # . . U . U . . #
          # . . $ . $ . . #
          # # # # # # # # #
        `,
      },

      'Holmes': {
        map: `
          # # # # # # # # #
          # S # $ $ $ $ $ #
          # . # . . . . . #
          # U # U U . U U #
          # . . . . . . . #
          # # # U # U # # #
          # . . . # . . . #
          # . . . # $ . E #
          # # # # # # # # #
        `,
      },

      // Premiers « vrais » niveaux
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
          # . . = . . . . . . . #
          # # # # # # # # # # # #
        `,
      },

      'Schaumasse': {
        map: `
          # # # # # # # # # # # # # # # # # # # #
          # S . . . . . . . . . . . . # . . . $ #
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
          # $ . . . . . . . . # . . . # . . . E #
          # # # # # # # # # # # # # # # # # # # #
        `,
      },

      'Crommelin': {
        map: `
          # # # # # # # # #
          # . . . . . . . #
          # . S . . $ $ . #
          # . . . ^ . . . #
          # . . = ! ! ! ! #
          # . . # . # # # #
          # . . # . . . . #
          # . . # $ . . E #
          # # # # # # # # #
        `,
      },

      'Reinmuth': {
        map: `
          # # # # # # # # #
          # S . . ! . . . #
          # . $ # ! . $ . #
          # # # # ! # # # #
          # ! ! ! L ! ! ! #
          # . # # ! # # . #
          # . $ # ! . $ . #
          # . . # ! # . E #
          # # # # # # # # #
        `,
      },

      // Par Aur36
      'Daniel': {
        map: `
          # # # # # # # # #
          # $ . . E . . $ #
          # $ $ . . . $ $ #
          # # # # ^ # # # #
          # $ B B $ B B $ #
          # B # # ^ # # B #
          # B # # ^ # # B #
          # $ B B $ B B $ #
          # B # # B # # ^ #
          # B # # B # # ^ #
          # $ B B $ B B $ #
          # B # # ^ # # B #
          # B # # ^ # # B #
          # $ B B S B B $ #
          # # # # # # # # #
        `,
      },

      // Par Aur36
      'Gale': {
        screenWidth: 13,
        screenHeight: 13,
        map: `
          # # # # # # # # # # # # # # # # #
          # . . . . . . . . # . . . . . . #
          # . $ $ . . . . . B . . . $ $ . #
          # . $ $ . . . . . # . . . $ $ . #
          # . . . . . . . . # . . . . . . #
          # # # ^ # # # # # # B # # # # # #
          # . . . . . . . . . . # . . . . #
          # . $ $ . . . T = T . # . . . . #
          # . $ $ . . . H $ H . # . $ $ . #
          # . $ $ . . . F = T . # . $ $ . #
          # . . . . . . . . . . # . . . . #
          # # # ^ # B # # # # # # . . . . #
          # . . . . . . . . . . # . . . . #
          # . . . . . . $ $ . . > . . . . #
          # . . . S . . $ $ . . # . E . . #
          # . . . . . . . . . . # . . . . #
          # # # # # # # # # # # # # # # # #
        `,
      },

      'Whipple': {
        map: `
          #  #  #  #  #  #  #  #  #
          #  S  #  .  .  .  .  .  #
          #  .  #  #  .  .  $  .  #
          #  .  .  #  #  .  .  .  #
          #  .  .  .  #  #  B2 #  #
          #  .  .  .  .  .  .  .  #
          #  .  $  $  $  .  .  .  #
          #  .  .  .  .  .  .  E  #
          #  #  #  #  #  #  #  #  #
        `,
      },

      'Forbes': {
        map: `
          #  #  #  #  #  #  #  #  #
          #  S  .  .  #  .  .  .  #
          #  .  $  .  #  .  $  .  #
          #  .  .  #  .  .  .  .  #
          #  v  v  #  B2 #  ^  ^  #
          #  .  .  .  .  #  .  .  #
          #  .  $  .  #  .  $  .  #
          #  .  .  .  B  .  .  E  #
          #  #  #  #  #  #  #  #  #
        `,
      },

      'Oterma': {
        map: `
          # # # # # # # # #
          # S . . E . . . #
          # . . . . . . . #
          # . # # # # 2 # #
          # . # $ $ $ $ . #
          # . # . # . # . #
          # . 6 B B B B B #
          # . # $ $ $ $ # #
          # # # # # # # # #
        `,
      },

      'Wirtanen': {
        map: `
          # # # # # # # # #
          # # # # E # # # #
          # B . . . . . B #
          # $ # # . # # $ #
          # B . $ B $ . B #
          # # # $ B $ # # #
          # # # # . # # # #
          # . . . S . . . #
          # # # # # # # # #
        `,
      },

      'Johnson': {
        map: `
          # # # # # # # # #
          # S . . # . . . #
          # . . . B . . . #
          # . . # # # . . #
          # . $ T $ F $ . #
          # . . . # . . . #
          # . . . B . . . #
          # . . . # . . E #
          # # # # # # # # #
        `,
      },

      'Arend': {
        map: `
          # # # # # # # # #
          # S # . # . . . #
          # . # . # . # . #
          # . 6 . 8 . $ . #
          # B # # # . # . #
          # $ < . < . $ . #
          # . # . # . # . #
          # . # . # . . E #
          # # # # # # # # #
        `,
      },

      'Harrington': {
        map: `
          # # # # # # # # #
          # S # . B . # . #
          # . B $ # $ B # #
          # . J . # . J . #
          # . # . B . # . #
          # . B # . # # . #
          # . J $ J $ # . #
          # E # # $ # # . #
          # . < . B . . $ #
          # # # # # # # # #
        `,
      },

      'Tsuchinshan': {
        map: `
          #  #  #  #  #  #  #  #  #
          #  S  #  $  #  $  #  $  #
          #  $  #  $  B  T  B  $  #
          #  $  #  $  #  $  #  $  #
          #  $  B  F  B2 $  #  $  #
          #  $  #  $  #  $  #  $  #
          #  $  #  $  B  J  B  $  #
          #  $  B  $  #  $  #  E  #
          #  #  #  #  #  #  #  #  #
        `,
      },

      'Wild': {
        map: `
          # # # # . # # # #
          # S # # . . . . #
          # . # # # # # . #
          # . # . . # # . #
          . . # # $ # # . .
          # # # # . # # # #
          . . . . . # . . .
          # . . # . # . E #
          # # # # . # # # #
        `,
      },

      'Gunn': {
        map: `
          #  #  #  #  #  #  #  #  #
          #  $  B  $  #  .  .  .  #
          #  B  2  B2 $  T  .  .  #
          #  S  #  B  #  B  #  .  #
          #  B  2  B2 $  J  .  .  #
          #  .  #  $  #  $  #  .  #
          #  .  #  B  #  #  #  .  #
          #  .  .  .  .  .  .  E  #
          #  #  #  #  #  #  #  #  #
        `,
      },

      'Klemola': {
        map: `
          # # # # # # # # #
          # $ . # S # $ . #
          # . . ! ! ! . . #
          # ! ! ! ! ! ! ! #
          # ! $ ! B ! $ ! #
          # ! ! ! ! ! ! ! #
          # # # . . . # # #
          # . . . . . . E #
          # # # # # # # # #
        `,
      },

      'Taylor': {
        map: `
          # # # # # # # # #
          # . . . . < . $ #
          # # . # v # # ^ #
          # . . > $ B . . #
          # S # # F B B E #
          # . . > $ B . . #
          # # . # ^ # # v #
          # . . . . < . $ #
          # # # # # # # # #
        `,
      },

      'Kojima': {
        screenWidth: 10,
        screenHeight: 10,
        map: `
          # # # # # # # # # #
          # . . . . . . . . #
          # . . . . . . . . #
          # . . J J L L . . #
          # S . H J $ H . . #
          # . . H $ F H . E #
          # . . T T F F . . #
          # . . . . . . . . #
          # . . . . . . . . #
          # # # # # # # # # #
        `,
      },

      'Clark': {
        screenWidth: 11,
        screenHeight: 11,
        map: `
          # # # # # # # # # # # # #
          # . . . # . . . # . . . #
          # . $ . B . $ . B . $ . #
          # . . . # . . . # . . . #
          # # B # # # B # # # B # #
          # . . . # $ . $ # . . . #
          # . $ . B . S . B . $ . #
          # . . . # $ . $ # . . . #
          # # B # # # B # # # B # #
          # . . . # . . . # . . . #
          # . $ . B . E . B . $ . #
          # . . . # . . . # . . . #
          # # # # # # # # # # # # #
        `,
      },

      'Kohoutek': {
        screenWidth: 13,
        screenHeight: 13,
        map: `
          # # . # # # # # # # . # #
          # . . . # . . . # . . . #
          # . $ . # . $ . B . $ . #
          # . . . # . . . # . . . #
          # # B # # # B # # # B # #
          # . . . # . . . # . . . #
          . . $ . # . S . B . $ . .
          # . . . # . . . # . . . #
          # # B # # # B # # # B # #
          # . . . # . . . # . . . #
          # . $ . # . E . # . $ . #
          # . . . # . . . # . . . #
          # # . # # # # # # # . # #
        `,
      },

      'Longmore': {
        screenWidth: 13,
        screenHeight: 13,
        map: `
          # # # # # # # # # # # # #
          # . . . # . . . # . . . #
          # . $ . 4 . $ . 6 . $ . #
          # . . . # . . . # . . . #
          # # # 8 B F # T B 8 # # #
          # . . . # . S . # . . . #
          # . $ . 6 . . . 4 . $ . #
          # . . . # . E . # . . . #
          # # # 2 B L # J B 2 # # #
          # . . . # . . . # . . . #
          # . $ . 4 . $ . 6 . $ . #
          # . . . # . . . # . . . #
          # # # # # # # # # # # # #
        `,
      },

      'Longmore2': { // Copie du niveau Longmore, mais avec la sortie en bas
        screenWidth: 13,
        screenHeight: 13,
        map: `
          # # # # # # # # # # # # #
          # . . . # . . . # . . . #
          # . $ . 4 . $ . 6 . $ . #
          # . . . # . . . # . . . #
          # # # 8 B F # T B 8 # # #
          # . . . # . . . # . . . #
          # . $ . 6 . S . 4 . $ . #
          # . . . # . . . # . . . #
          # # # 2 B L # J B 2 # # #
          # . . . # . . . # . . . #
          # . $ . 4 . E . 6 . $ . #
          # . . . # . . . # . . . #
          # # # # # # # # # # # # #
        `,
      },

      'Gehrels': {
        screenWidth: 11,
        screenHeight: 11,
        map: `
          # # # # # # # # # # # # #
          # E . . . B . $ . $ . . #
          # . . . . # # # # # # . #
          # # # # B T $ $ $ $ . . #
          # $ . . . H $ $ $ $ # . #
          # # # $ . L = F = = T # #
          # # # F = = = H = = J # #
          # . . H . $ . H . $ . # #
          # . . H # # # H # # # . #
          # . . H . $ . ! . $ $ . #
          # . . . . $ . ! . $ $ . #
          # . . . S . . B . . . . #
          # # # # # # # # # # # # #
        `,
      },

      /*

      'Namcap': {
        map: `
          # # # # # # # # # # # # # # # # #
          # $ $ $ $ $ $ $ # $ $ $ $ $ $ $ #
          # $ # # $ # # $ # $ # # $ # # $ #
          # $ # # $ # # $ # $ # # $ # # $ #
          # $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ #
          # $ # # $ # $ # # # $ # $ # # $ #
          # $ $ $ $ # $ $ # $ $ # $ $ $ $ #
          # # # # $ # # . # . # # $ # # # #
          # # # # $ # . . . . . # $ # # # #
          # # # # $ # . # . # . # $ # # # #
          . . . . $ # . # E # . # $ . . . .
          # # # # $ # . # # # . # $ # # # #
          # # # # $ # . . . . . # $ # # # #
          # # # # $ # . # # # . # $ # # # #
          # $ $ $ $ $ $ $ # $ $ $ $ $ $ $ #
          # $ # # $ # # $ # $ # # $ # # $ #
          # $ $ # $ $ $ $ S $ $ $ $ # $ $ #
          # # $ # $ # $ # # # $ # $ # $ # #
          # $ $ $ $ # $ $ # $ $ # $ $ $ $ #
          # $ # # # # # $ # $ # # # # # $ #
          # $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ #
          # # # # # # # # # # # # # # # # #
        `,

        screenHeight: 22,
        screenWidth: 17,
      },

      */

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
        screenWidth: 'screenWidth' in level ? level.screenWidth : DEFAULT_SCREEN_WIDTH,
        screenHeight: 'screenHeight' in level ? level.screenHeight : DEFAULT_SCREEN_HEIGHT,
      }

      levelsReturned[name] = l

      i += 1
    }

    return levelsReturned
  }
}
