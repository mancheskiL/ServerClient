var check = 0
// TODO: need to check status of Pi node.js server instance
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    check = check + 1
    console.log(check)
  }
}

xhttp.open("GET", "http://192.168.178.43:8080", true)
xhttp.send()


// TODO: check for persistent user cookie type file
// if file exists, skip login screen
// only main process can handle cookies
// send event to main process for cookie handling
// TODO: load interface page once done
// if no cookie type files, then load login page
