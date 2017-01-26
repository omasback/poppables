const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function onClosed() {
  mainWindow = null
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1200,
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
