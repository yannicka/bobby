const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    icon: 'src/assets/img/favicon.png',
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
    },
  })

  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenuBarVisibility(false)
 
  mainWindow.loadFile('../public/index.html')
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
