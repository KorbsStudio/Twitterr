const {app, BrowserWindow, ipcMain, Menu, shell, webContents} = require('electron')
const isMac = process.platform === 'darwin'
const contextMenu = require('electron-context-menu');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 540,
    height: 733,
    minWidth: 400,
    minHeight: 520,
    darkTheme: true,
    frame: true,
    transparent: true,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })
  autoUpdater.checkForUpdatesAndNotify();
  mainWindow.loadURL('https://twitter.com/');
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1habvwh.r-1loqt21.r-6koalj.r-eqz5dr.r-16y2uox.r-1ny4l3l.r-oyd9sg.r-13qz1uu[href="/i/bookmarks"]{display:none!important}a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1habvwh.r-1loqt21.r-6koalj.r-eqz5dr.r-16y2uox.r-1ny4l3l.r-oyd9sg.r-13qz1uu[aria-label=Lists]{display:none!important}.r-1kqtdi0{border-color:transparent!important}.css-1dbjc4n.r-1ysxnx4.r-1igl3o0.r-rull8r.r-qklmqi.r-2sztyj.r-1efd50x.r-5kkj8d.r-tbmifm{display:none!important}.r-1igl3o0{border-bottom-color:transparent!important}.r-2sztyj{border-top-color:transparent!important}.css-1dbjc4n.r-1ysxnx4.r-1igl3o0.r-rull8r.r-qklmqi.r-tbmifm{display:none!important}');
 })
 const splash = new BrowserWindow({
   width: 400,
   height: 200,
   darkTheme: true,
   frame: false,
   transparent: false,
   minimizable: false,
   maximizable: false,
   autoHideMenuBar: true,
   skipTaskbar: true,
   webPreferences: {
     devTools: true
   }
 })
 splash.loadFile('file:///${__dirname}/../../src/html/splash.html');
 setTimeout(() => { // Show splash for 5 seconds (fixed time) then the main window
  mainWindow.show();
 }, 3000); 
 setTimeout(() => {
  splash.close();
 }, 3000);
 splash.setIcon(path.join(__dirname, '../../images/icons/icon.png'));
 mainWindow.setIcon(path.join(__dirname, '../../images/icons/icon.png'));
}

app.whenReady().then(() => {createWindow()})
contextMenu({});
const template = [
  {
    label: 'File',
    submenu: [
      { label: 'Version 2.0.0'},
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});