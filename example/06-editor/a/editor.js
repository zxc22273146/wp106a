const {Menu, dialog} = require('electron').remote
const fs = require('fs')

function newFile() {
  var filePath = document.getElementById('filePath')
  filePath.innerText = ''
  var text = document.getElementById('text')
  text.value = ''
}

function saveFileAs() {
  var text = document.getElementById('text')
  dialog.showSaveDialog({ 
    filters: [ { name: 'All Files', extensions: ['*'] }, { name: 'text', extensions: ['txt'] } ]}, 
    function (fileName) {
      if (fileName === undefined) return;          
      fs.writeFile(fileName, text.value, function (err) {
        dialog.showMessageBox({ message: "Save successfully.", buttons: ["OK"] })
      })
      var filePath = document.getElementById('filePath')
      filePath.innerText = fileName
    })
}

function openFile() {
  dialog.showOpenDialog(
    function (fileName) {
      if (fileName === undefined) {
        console.log('No file selected')
        return
      }
      console.log('fileName=' + fileName)

      var filePath = document.getElementById('filePath')
      filePath.innerText = fileName
      fs.readFile(fileName.toString(), 'utf8', function (err, data) {
        if (err) window.alert('read fail!')
        var text = document.getElementById('text')
        text.value = data
      })
    }
  )
}

function saveFile() {
  var fileName = document.getElementById('filePath').innerText
//          if (fileName.trim().length === 0) window.alert('No file loaded!')
  if (fileName.trim().length === 0) {
    saveFileAs()
  }
  var text = document.getElementById('text')
  fs.writeFile(fileName, text.value)
}

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click: newFile
      },      
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: openFile
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: saveFile
      },
      {
        label: 'SaveAs',
        accelerator: 'CmdOrCtrl+A',
        click: saveFileAs
      },
      { label: 'Exit', role: 'close' }
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
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)