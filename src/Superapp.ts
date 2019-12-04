import m from 'mithril'

import { computeAppSize } from './Game'
import { ImageManager } from './ImageManager'
import { ChooseLevelScreen } from './screen/ChooseLevelScreen'
import { EndGameScreen } from './screen/EndGameScreen'
import { GameScreen } from './screen/GameScreen'
import { HelpScreen } from './screen/HelpScreen'
import { HomeScreen } from './screen/HomeScreen'
import { OptionsScreen } from './screen/OptionsScreen'
import { CreditsScreen } from './screen/CreditsScreen'

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

  public init(): void {
    window.addEventListener('resize', Superapp.resize)

    this.superapp = document.getElementById('superapp')

    m.route(this.superapp, '/', {
      '/': HomeScreen,
      '/options': OptionsScreen,
      '/help': HelpScreen,
      '/credits': CreditsScreen,
      '/choose-level': ChooseLevelScreen,
      '/level/:level': GameScreen,
      '/end-game': EndGameScreen,
    })

    Superapp.resize()
  }

  public static resize(_e: UIEvent | null = null): void {
    const superapp = document.getElementById('superapp')
    const app = document.getElementById('app')

    const appSize = computeAppSize(app ? true : false)
    const height = window.innerHeight

    superapp.style.width = `${appSize.size.width}px`
    superapp.style.height = `${height}px`
  }
}
