const { ipcRenderer } = require('electron')

function debug_send(message){
  console.log('sending to main')
  let output = message
  ipcRenderer.send('debug-message', output)
}

function print_test(){
  document.getElementById('demo').innerHTML = 'test'
}

const button = document.getElementById('submit-account')
const testButton = document.getElementById('test')


button.addEventListener('click', () => {
  document.getElementById('demo').innerHTML = 'test'
  console.log("test")
  // debug_send('test')
  let output = 'test'
  ipcRenderer.send('debug-message', output)
})

testButton.addEventListener('click', () => {
  ipcRenderer.invoke('debug-message', 'test')
})
