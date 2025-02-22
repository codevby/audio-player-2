const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    // icon: path.join(__dirname, 'public/logo.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });


  // mainWindow.loadFile(
  //   path.join(__dirname, 'dist/audio-player-angular-electron/browser/index.html')
  // );

  mainWindow.loadURL(
    'http://localhost:4200'
  )

  ipcMain.on('minimize', () => mainWindow.minimize());
  ipcMain.on('maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize());
  ipcMain.on('close', () => mainWindow.close());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
