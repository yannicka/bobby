import { Level, LevelDynamic, LevelManager, LevelUser } from './Level'

const LEVELS_STORAGE_KEY = 'levels'

export class Storage {
  private readonly levelManager: LevelManager

  public constructor(levelManager: LevelManager) {
    this.levelManager = levelManager
  }

  public getLevels(): { [key: string]: Level } {
    const levels: { [key: string]: Level } = {}

    const levelsUser = this.getLevelsUser()

    let previousLevel: Level | null = null

    for (const [ name, fixed ] of Object.entries(this.levelManager.getLevels())) {
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

  public successfulLevel(levelName: string): void {
    const levels = this.getStoredLevels()

    levels[levelName].success = true

    this.saveLevels(levels)
  }

  public reset(): void {
    localStorage.clear()
  }

  public getNextLevelOf(levelName: string): Level | null {
    const levels = this.getLevels()

    const keys = Object.keys(levels)
    const nextIndex = keys.indexOf(levelName) + 1
    const nextLevelName = keys[nextIndex]

    if (nextLevelName in levels) {
      return levels[nextLevelName]
    }

    return null
  }

  /**
   * Tous les niveaux ont-ils été réussis ?
   */
  public areAllLevelsSucceeded(): boolean {
    const levels = this.getLevels()

    for (const [name, level] of Object.entries(levels)) {
      // Dès qu'on rencontre un niveau non-réussi, on retourne `false`
      if (!level.user.success) {
        return false
      }
    }

    return true
  }

  private getLevelsUser(): { [key: string]: LevelUser } {
    const levels: { [key: string]: LevelUser } = {}

    for (const [ name ] of Object.entries(this.levelManager.getLevels())) {
      levels[name] = {
        success: false,
      }
    }

    const l = this.getStoredLevels()

    for (const [ name, level ] of Object.entries(l)) {
      if (name in levels) {
        levels[name] = level
      }
    }

    this.saveLevels(levels)

    return levels
  }

  private getStoredLevels(): { [key: string]: LevelUser } {
    if (localStorage.getItem(LEVELS_STORAGE_KEY) !== null) {
      const jsonLevels = localStorage.getItem(LEVELS_STORAGE_KEY)

      let levels: { [key: string]: LevelUser } = {}

      try {
        levels = JSON.parse(jsonLevels) as { [key: string]: LevelUser }
      } catch (e) {
        // Si la donnée est corrompue, on repart à zéro
        return {}
      }

      return levels
    }

    return {}
  }

  private saveLevels(levels: { [key: string]: LevelUser }): void {
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels))
  }
}
