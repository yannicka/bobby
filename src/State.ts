import { Level, LevelManager } from './Level'
import { Storage } from './Storage'

const levelManager = new LevelManager()
const storage = new Storage(levelManager)

class State {
  private levels: { [key: string]: Level }

  public getStorage(): Storage {
    return storage
  }

  public loadLevels(): void {
    this.levels = storage.getLevels()
  }

  public getLevels(): { [key: string]: Level } {
    return this.levels
  }
}

export const state = new State()
