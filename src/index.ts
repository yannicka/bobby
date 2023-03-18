import { App } from './App'
import * as OfflinePluginRuntime from '@lcdp/offline-plugin/runtime'

import './assets/style/style.css'

const _app = new App()

OfflinePluginRuntime.install()
