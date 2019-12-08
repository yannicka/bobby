import { levels } from './levels'

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

  // Remplace les espaces consécutives par une seule espace
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

export class LevelManager {
  public getLevels(): { [key: string]: LevelFixed } {
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
