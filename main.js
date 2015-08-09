var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

var windows = [];

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 300, height: 200, "min-width": 300, "resizable": false});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;

    // TODO close windows
    // ...
    // ...

    // TODO somehow handle setting of a stop point
    // if the app is closed.

    // windows.each(function(k,v) {
    //   console.log("Close window: "+k)
    //   v = null;
    // });

    app.quit()
  });

  var fs = require('fs')

  // Config
  // Load the default configuration
  console.log("Loading configuration")
  if (fs.existsSync(__dirname + '/config/user.json')) {
    console.log("Using user config")
    global["config"] = JSON.parse(fs.readFileSync(__dirname + '/config/user.json','utf8'));
  } else {
    console.log("No user config - loading default")
    global["config"] = JSON.parse(fs.readFileSync(__dirname + '/config/default.json','utf8'));
  }

});

// // ---- Settings window ----
// ipc.on('save-settings',function(event,config) {
//   console.log("Saving settings")
//   var fs = require('fs')
//   // The string will have been quoted and escaped so we need to unquote it
//   config = config.replace(/^"/,'').replace(/"$/,'').replace(/\\"/,'"')
//   global["config"] = JSON.parse(config)
//
//   fs.writeFileSync(__dirname+'/config/user.json',config,'utf8')
//   windows["config"].close()
//   event.sender.send('saved-settings')
// });
// ipc.on('open-settings',function(event,arg) {
//   console.log("Opening config window")
//   if (windows["config"]) {
//     console.log("Already got window - showing")
//     windows["config"].show()
//     windows["config"].focus()
//   }
//   else
//   {
//     windows["config"] = new BrowserWindow({width: 300, height: 400, "resizable": false});
//     windows["config"].loadUrl('file://' + __dirname + '/settings.html');
//     windows["config"].on('closed',function() {
//       windows["config"] = null
//     });
//   }
//
//   event.sender.send('opened-settings')
// });
