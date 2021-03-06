// TODO: convert XHTTP to axios framework (axios is already installed (npm install axios))
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

function writeButtons(method){
  var btn = document.createElement("button")
  btn.innerHTML = method

  var body = document.getElementsByTagName("body")[0]
  body.appendChild(btn)

  btn.addEventListener('click', (event) => {
    console.log(btn.innerHTML + ' was clicked')
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      // console.log(this.readyState + ' ' + this.status)
      if (this.readyState == 4 && this.status == 200) {
        var jsonResponse = JSON.parse(this.responseText)
        console.log(jsonResponse[0]['message'])
      }
    }
    // connecting to dev server currently
    // port 2000 = dev server
    // port 3000 = production server
    xhttp.open('POST', 'http://192.168.178.43:2000/test', true)
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhttp.send(`message=${btn.innerHTML}`)
  })
}

const uri = "mongodb+srv://" +
  process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SITE +
  ".z488z.gcp.mongodb.net/Pi_Serv?ssl=true&retryWrites=true&w=majority"

console.log('connecting to DB')
const client = new MongoClient(uri, { useNewUrlParser: true })
client.connect((err, db) => {
  if (err) throw err
  console.log('connected to db')

  var dbo = db.db('Pi_Serv')
  var query = { account: 'test' }

  console.log('querying DB')
  dbo.collection('accounts').find(query).toArray((err, result) => {
    if (err) throw err

    var options = result[0]['methods']
    // console.log(result)
    // console.log(result[0]['methods'])

    options.forEach(writeButtons)

    db.close()
  })
})
