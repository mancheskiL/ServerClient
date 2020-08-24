const electron = require('electron')
const { ipcRenderer } = require('electron')

function change_page(){
  ipcRenderer.invoke('perform-action', 'index.html')
}
