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

export class App {
  private readonly app: HTMLElement

  public constructor() {
    const imagesLoader = ImageManager.load('assets/img/', {
      'tiles': 'tiles.png',
      'player': 'player.png',
      'background': 'background.png',
    })

    this.app = document.getElementById('app')

    Promise.all(imagesLoader).then(() => {
      this.init()
    })
  }

  public init(): void {
    window.addEventListener('resize', App.resize)

    m.route(this.app, '/', {
      '/': HomeScreen,
      '/options': OptionsScreen,
      '/help': HelpScreen,
      '/credits': CreditsScreen,
      '/choose-level': ChooseLevelScreen,
      '/level/:level': GameScreen,
      '/end-game': EndGameScreen,
    })

    App.resize()
  }

  public static resize(_e: UIEvent | null = null): void {
    const app = document.getElementById('app')
    const game = document.getElementById('game')

    const appSize = computeAppSize(game ? true : false)
    const height = window.innerHeight

    app.style.width = `${appSize.size.width}px`
    app.style.height = `${height}px`
  }
}
