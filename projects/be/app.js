const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");

let appWindow;

function initWindow() {
  appWindow = new BrowserWindow({
    height: 800,
    width: 1500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Electron Build Path
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Initialize the DevTools.
  appWindow.webContents.openDevTools()

  appWindow.on('closed', function () {
    appWindow = null
  })
}

ipcMain.on('voice-notes', (event, arg) => {
  event.returnValue = fs.readdirSync("/Users/andresgilherrera/Downloads");
})

app.on('ready', initWindow)

// Close when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    initWindow()
  }
})
