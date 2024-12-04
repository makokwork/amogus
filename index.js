const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const path = require('path');
const url = require('url');

menuTemplate = [
  {
    label: 'ඞ',
    submenu: [
      {
        label: ' ',
        click: () => {
          openAboutWindow();
        },
      },
    ],
  },
];

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  var menu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.setMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function openAboutWindow() {
  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 1280,
    height: 760,
  });
  aboutWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'amogus.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
  aboutWindow.setMenu(null);
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show();
  });
}

app.on('ready', () => {
  createWindow();
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore();
  });
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize();
  });
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
