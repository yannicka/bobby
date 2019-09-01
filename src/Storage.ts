interface LevelUser {
  success: boolean
}

interface LevelFixed {
  readonly map: Array<Array<number>>
}

interface Level {
  // Statique. Ne change pas.
  fixed: LevelFixed

  // Lié à ce que fait l'utilisateur.
  user: LevelUser
}

export class Storage {
  // public constructor() {
  // }

  public getLevelsFixed(): { [key: string]: LevelFixed } {
    return {
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
  }

  public getLevelsUser(): { [key: string]: LevelUser } {
    const levels: { [key: string]: LevelUser } = {}

    for (const [ name ] of Object.entries(this.getLevelsFixed())) {
      levels[name] = {
        success: false,
      }
    }

    if (localStorage.getItem('levels') !== null) {
      const jsonLevels = localStorage.getItem('levels')
      const l = JSON.parse(jsonLevels) as { [key: string]: LevelUser }

      for (const [ name, level ] of Object.entries(l)) {
        levels[name] = level
      }
    }

    localStorage.setItem('levels', JSON.stringify(levels))

    return levels
  }

  public getLevels(): { [key: string]: Level } {
    const levels: { [key: string]: Level } = {}

    const levelsUser = this.getLevelsUser()

    for (const [ name, fixed ] of Object.entries(this.getLevelsFixed())) {
      levels[name] = {
        fixed,
        user: levelsUser[name],
      }
    }

    return levels
  }

  public success(level: string): void {
    const jsonLevels = localStorage.getItem('levels')
    const l = JSON.parse(jsonLevels) as { [key: string]: LevelUser }

    l[level].success = true

    localStorage.setItem('levels', JSON.stringify(l))
  }
}
