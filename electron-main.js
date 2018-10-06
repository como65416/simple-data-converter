const { app, BrowserWindow, Menu, MenuItem} = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({ width: 1280, height: 720, icon: 'icon.png' })

  let indexPageURL = `file://${__dirname}/index.html`;
  if (process.argv.includes('--dev')) {
    indexPageURL = `http://localhost:8081/index.html`;
  }
  win.loadURL(indexPageURL);

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
