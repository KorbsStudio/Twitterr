// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { Menu, Tray } = require('electron')
const electron = require('electron')
const ipc = require('electron').ipcRenderer




function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    defaultWidth: 500,
    defaultHeight: 730,
    width: 500,
    height: 730,
    minWidth: 500,
    minHeight: 500,
    resizable: true,
    maximizable: true,
    frame: true,
    darkTheme: true,
    transparent: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './icon/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      autoplayPolicy: true,
      scrollBounce: true,
      devTools: false,
      enableBlinkFeatures: true,
      safeDialogsMessage: true,
      navigateOnDragDrop: true,
      spellcheck: true,
    }
  })
  
  
  var newWindow = null
  
  function openAboutWindow() {
    if (newWindow) {
      newWindow.focus()
      return
    }
  
    newWindow = new BrowserWindow({
      height: 200,
      resizable: false,
      width: 440,
      frame: true,
      title: 'About',
      minimizable: false,
      fullscreenable: false,
      autoHideMenuBar: true,
      darkTheme: true,
      icon: path.join(__dirname, './icon/icon.ico'),
    })

    newWindow.loadURL('file://' + __dirname + './about.html')
  
    newWindow.on('closed', function() {
      newWindow = null
    })
  }

  var newWindow = null
  
  function openDevWindow() {
    if (newWindow) {
      newWindow.focus()
      return
    }
  
    newWindow = new BrowserWindow({
      width: 500,
      height: 730,
      resizable: false,
      title: '@KorbsStudio',
      minimizable: true,
      fullscreenable: false,
      autoHideMenuBar: true,
      darkTheme: true,
      icon: path.join(__dirname, './icon/icon.ico'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true,
        autoplayPolicy: true,
        scrollBounce: true,
        devTools: false,
        enableBlinkFeatures: true,
        safeDialogsMessage: true,
        navigateOnDragDrop: true,
        spellcheck: true,
      }
    })

    newWindow.loadURL('file://' + __dirname + './dev.html')
  
    newWindow.on('closed', function() {
      newWindow = null
    })
  }

  var newWindow = null
  
  function openChangeLogWindow() {
    if (newWindow) {
      newWindow.focus()
      return
    }
  
    newWindow = new BrowserWindow({
      width: 500,
      height: 730,
      resizable: false,
      title: 'Twitterr | Changelog',
      minimizable: false,
      fullscreenable: false,
      autoHideMenuBar: true,
      darkTheme: true,
      icon: path.join(__dirname, './icon/icon.ico'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true,
        autoplayPolicy: true,
        scrollBounce: true,
        devTools: false,
        enableBlinkFeatures: true,
        safeDialogsMessage: true,
        navigateOnDragDrop: true,
        spellcheck: true,
      }
    })

    newWindow.loadURL('file://' + __dirname + './changelog.html')
  
    newWindow.on('closed', function() {
      newWindow = null
    })
  }

  
  const template = [
    {
      label: 'Twitterr',
      submenu: [
        {
          label: 'About',
          click() {
            openAboutWindow()
          }
        },
        {
          label: '@KorbsStudio',
          click() {
            openDevWindow()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          label: 'Dev Tools(Disabled)',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        },
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Home Page',
          click () { require('electron').shell.openExternal('https://Twitterr.KorbsStudio.com/tw/') }
        },
        {
          label: 'Wiki',
          click () { require('electron').shell.openExternal('https://github.com/KorbsStudio/Twitterr/wiki/') }
        },
        {
          label: 'Changelog',
          click() {
            openChangeLogWindow()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Donate',
          click () { require('electron').shell.openExternal('https://Paypal.me/CorbsEditor') }
        },
        {
          label: 'Report Issue',
          click () { require('electron').shell.openExternal('https://github.com/KorbsStudio/Twitterr/issues') }
        },
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })
    // Edit menu.
    template[1].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Speech',
        submenu: [
          {
            role: 'startspeaking'
          },
          {
            role: 'stopspeaking'
          }
        ]
      }
    )
    // Window menu.
    template[3].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Zoom',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
