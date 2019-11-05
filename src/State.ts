import { Level, LevelManager } from './Level'
import { Storage } from './Storage'

class State {
  private readonly storage: Storage
  private levels: { [key: string]: Level }

  public constructor() {
    const levelManager = new LevelManager()

    this.storage = new Storage(levelManager)
  }

  public getStorage(): Storage {
    return this.storage
  }

  public loadLevels(): void {
    this.levels = this.storage.getLevels()
  }

  public getLevels(): { [key: string]: Level } {
    return this.levels
  }
}

export const state = new State()
