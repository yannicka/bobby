import { Level, LevelManager } from './Level'
import { Storage } from './Storage'

const levelManager = new LevelManager()
const storage = new Storage(levelManager)

export const state = {
  levels: {} as { [key: string]: Level },

  getStorage() {
    return storage
  },

  loadLevels() {
    this.levels = storage.getLevels()
  },
}
