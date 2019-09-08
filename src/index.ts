import m, { Attributes } from 'mithril'

import { Storage } from './Storage'
import { HomeScreen } from './screen/HomeScreen'
import { ChooseLevelScreen } from './screen/ChooseLevelScreen'
import { GameScreen } from './screen/GameScreen'

class Superapp {
  private superapp: HTMLElement
  private zoom: number
  private storage: Storage

  public constructor() {
    window.addEventListener('resize', (e: UIEvent) => this.resize(e))

    this.superapp = document.getElementById('superapp')

    this.storage = new Storage()

    this.resize()

    m.route(this.superapp, '/', {
      '/': HomeScreen,
      '/choose-level': ChooseLevelScreen,
      '/game/:level': GameScreen,
    })
  }

  public getScreenSize(): [ number, number ] {
    let [ width, height ] = [ 9, 9 ]

    width *= 16
    height *= 16

    return [ width, height ]
  }

  public resize(_e: UIEvent | null = null): void {
    const [ width, height ] = this.getScreenSize()

    const widthZoom = window.innerWidth / width
    const heightZoom = window.innerHeight / height

    this.zoom = Math.min(widthZoom, heightZoom)

    this.superapp.style.width = `${width * this.zoom}px`
    this.superapp.style.height = `${height * this.zoom}px`
  }
}

const superapp = new Superapp()
