const { ipcRenderer } = require('electron')

// function debug_send(message){
//   console.log('sending to main')
//   let output = message
//   ipcRenderer.send('debug-message', output)
// }
//
// function create_account(username){
//   console.log('sending username to main for processing')
//   let output = username
//   ipcRenderer.invoke('create-account', output)
// }

const button = document.getElementById('submit-account')

button.addEventListener('click', (event) => {
  console.log("submit button was pressed")
  // debug_send('test')
  let output = document.getElementById("username-input").value
  console.log(output)
  ipcRenderer.invoke('create-account', output)
  location.reload()
})
