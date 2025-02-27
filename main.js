const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false,
    // icon: path.join(__dirname, 'public/logo.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // mainWindow.loadFile(
  //   path.join(__dirname, 'dist/audio-player-angular-electron/index.html')
  // );

  mainWindow.loadURL(
    'http://localhost:4200'
  )

  ipcMain.on('minimize', () => mainWindow.minimize());
  ipcMain.on('maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize());
  ipcMain.on('close', () => mainWindow.close());

  ipcMain.handle('get-open-files', () => {
    return process.argv.slice(1);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// app.on('ready', createWindow);

app.on('ready', () => {
  createWindow();

  if (process.argv.length > 1) {
    const filePaths = process.argv.slice(1);
    console.log('archivos abiertos: ', filePaths);

    mainWindow.webContents.send('open-files', filePaths);
  }
});


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
