const electron = require('electron')
const { ipcRenderer } = require('electron')

function change_page(fileName){
  let end = '.html'
  let output = fileName + end
  ipcRenderer.invoke('perform-action', output)
}

function addListener(item){
  item.addEventListener('click', (event) => {
    console.log(item.innerHTML)
  })
}

var buttons = document.querySelectorAll('.js-switch')

buttons.forEach(addListener)
