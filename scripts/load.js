const { ipcRenderer } = require('electron')

var check = 0
// check status of Pi node.js server instance
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    check = check + 1
    console.log(check)
  }
}

xhttp.open("GET", "http://192.168.178.43:8080", true)
xhttp.send()

// TODO: behvaior for when webserver not reachable
// still want app to load, just not perform anything which requires webserver
// connection

// TODO: if webserver not available, an icon or something should communicate
// that status

ipcRenderer.send('cookie-check')
