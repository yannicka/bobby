import { Level, LevelDynamic, LevelManager, LevelUser } from './Level'

export class Storage {
  private readonly levelManager: LevelManager

  public constructor() {
    this.levelManager = new LevelManager()
  }

  public getLevelsUser(): { [key: string]: LevelUser } {
    const levels: { [key: string]: LevelUser } = {}

    for (const [ name ] of Object.entries(this.levelManager.getLevelsFixed())) {
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

    let previousLevel: Level | null = null

    for (const [ name, fixed ] of Object.entries(this.levelManager.getLevelsFixed())) {
      let accessible = false

      if (levelsUser[name].success) {
        accessible = true
      } else {
        if (previousLevel === null) {
          accessible = true
        } else {
          accessible = previousLevel.user.success
        }
      }

      const dynamic: LevelDynamic = {
        accessible,
      }

      const level: Level = {
        fixed,
        dynamic,
        user: levelsUser[name],
      }

      levels[name] = level

      previousLevel = level
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
