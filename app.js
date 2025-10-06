const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let hasReloaded = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (process.env.ELECTRON_DEV) {
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `./dist/cmaker/browser/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (!hasReloaded) {
      hasReloaded = true;
      setTimeout(() => {
        mainWindow.reload();
      }, 5);
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
