
const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680,
    webPreferences: {
      javascript: true, 
      plugins: true,
      nodeIntegration: true,
      preload: path.join(__dirname, '../public/renderer.js')
    }
  });
  
  // mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')

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