import m from 'mithril'

import { computeAppSize } from './Game'
import { ImageManager } from './ImageManager'
import { ChooseLevelScreen } from './screen/ChooseLevelScreen'
import { EndGameScreen } from './screen/EndGameScreen'
import { GameScreen } from './screen/GameScreen'
import { HelpScreen } from './screen/HelpScreen'
import { HomeScreen } from './screen/HomeScreen'
import { OptionsScreen } from './screen/OptionsScreen'

export class Superapp {
  private superapp: HTMLElement

  public constructor() {
    const imagesLoader = ImageManager.load('assets/img/', {
      'tiles': 'tiles.png',
      'player': 'player.png',
      'background': 'background.png',
    })

    Promise.all(imagesLoader).then(() => {
      this.init()
    })
  }

  public init() {
    window.addEventListener('resize', this.resize)

    this.superapp = document.getElementById('superapp')

    m.route(this.superapp, '/', {
      '/': HomeScreen,
      '/options': OptionsScreen,
      '/help': HelpScreen,
      '/choose-level': ChooseLevelScreen,
      '/level/:level': GameScreen,
      '/end-game': EndGameScreen,
    })

    this.resize()
  }

  public resize(_e: UIEvent | null = null): void {
    const appSize = computeAppSize()
    const height = window.innerHeight

    this.superapp.style.width = `${appSize.size.width}px`
    this.superapp.style.height = `${height}px`
  }
}
