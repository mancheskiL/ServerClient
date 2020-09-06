const { app, BrowserWindow, ipcMain, session } = require('electron')


function createWindow () {
  // Create the browser window.
  // not using var, let, or const so that 'win' becomes global
  // which lets us reload the page
  win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  win.loadFile('public/switcher.html')
  // win.loadFile('public/interface.html')
  // win.loadFile('public/login.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

function tellCookies () {
  session.defaultSession.cookies.get({name: 'login'})
    .then((cookies) => {
      console.log('cookies: ' + cookies)
    }).catch((error) => {
      console.log(error)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow('public/switcher.html'))
app.whenReady().then(createWindow)
app.whenReady().then((tellCookies))
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle('perform-action', async (event, file) => {
  console.log('reached ipcMain')
  console.log(file)
  const result = await win.loadFile('public/' + file)
})

ipcMain.on('cookie-build', (event, message) => {
  console.log('message: ' + message[0] + ':' + message[1])
  let cookie = { url: 'http://rasp_pi.luman.io', name: 'login', value: message[1] }
  if (message[0]){
    var expiration = new Date()
    var hour = expiration.getHours()
    hour = hour + 6
    expiration.setHours(hour)
    session.defaultSession.cookies.set({
      url: 'http://rasp_pi.luman.io',
      name: 'login',
      value: message[1],
      expirationDate: expiration.getTime()
    })
  } else {
  session.defaultSession.cookies.set(cookie)
    .then( () => {
      console.log('cookie was made')
    }, (error) => {
      console.error(error)
    })
  }
  tellCookies()
})
