import { Level } from './Level'
import { Storage } from './Storage'

const storage = new Storage()

export const state = {
  levels: [] as Array<Level>,

  getStorage() {
    return storage
  },

  loadLevels() {
    this.levels = storage.getLevels()
  }
}
