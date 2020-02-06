const { app, BrowserWindow } = require('electron');
const path = require('path');
const MAIN_HTML = path.join('file://', __dirname, 'main.html');
const CHILD_PADDING = 50;
const { remote } = require('electron')
var theWindow = BrowserWindow.getFocusedWindow();
const contextMenu = require('electron-context-menu');

contextMenu({
  labels: {
    menu: actions => [
      actions.copyLink({
        transform: content => `modified_link_${content}`
      }),
      actions.separator(),
      {
        label: 'Unicorn'
      },
      actions.separator(),
      actions.copy({
        transform: content => `modified_copy_${content}`
      }),
      {
        label: 'Invisible',
        visible: false
      },
      actions.paste({
        transform: content => `modified_paste_${content}`
      })
    ]
  }
});

const onAppReady = function () {
  let parent = new BrowserWindow({
    width: 550,
    height: 680,
    minWidth: 550,
    minHeight: 680,
    maxWidth: 550,
    maxHeight: 680,
    resizable: false,
    contextMenu: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './icon/icon.png'),
    webPreferences: {
      experimentalFeatures: true,
      webviewTag: true,
      devTools: true,
      safeDialogsMessage: true,
      nodeIntegrationInSubFrames: true,
      scrollBounce: true,
      sandbox: true,
    }
  });

  parent.once('close', () => {
    parent = null;
  });

  parent.loadURL(MAIN_HTML);
};

//~ app.on('ready', onAppReady);
app.on('ready', () => setTimeout(onAppReady, 500));

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      console.log('This was blocked');
      newWindowEvent.preventDefault();
    });
  }
});