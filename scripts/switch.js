const electron = require('electron')
const { ipcRenderer } = require('electron')

// adds 'click' event listener to given object
// event communicates to main.js to relevant page
function addListener(item){
  item.addEventListener('click', (event) => {
    // console.log(item.innerHTML)
    // console.log(item.id)
    let beginning = item.id
    let end = '.html'
    let output = beginning + end
    ipcRenderer.invoke('perform-action', output)
  })
}

var buttons = document.querySelectorAll('.js-switch')

buttons.forEach(addListener)
