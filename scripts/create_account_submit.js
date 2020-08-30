const { ipcRenderer } = require('electron')

function debug_send(message){
  console.log('sending to main')
  let output = message
  ipcRenderer.send('debug-message', output)
}

const button = document.getElementById('submit-account')

button.addEventListener('click', (event) => {
  console.log("submit button was pressed")
  // debug_send('test')
  let output = document.getElementById("username-input").value
  console.log(output)
  ipcRenderer.invoke('debug-message', output)
  location.reload()
})
