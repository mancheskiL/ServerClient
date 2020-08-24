const electron = require('electron')
const { ipcRenderer } = require('electron')

function change_page(fileName){
  let end = '.html'
  let output = fileName + end
  ipcRenderer.invoke('perform-action', output)
}
