const { ipcRenderer } = require('electron')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const button = document.getElementById('submit-account')

// listen for submit button click
button.addEventListener('click', (event) => {
  console.log("submit button was pressed")
  // debug_send('test')
  let input_name = document.getElementById("username-input").value
  console.log(input_name)
  // ipcRenderer.invoke('create-account', output)

  const uri = "mongodb+srv://" +
    process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SITE +
    ".z488z.gcp.mongodb.net/Pi_Serv?ssl=true&retryWrites=true&w=majority"

  const client = new MongoClient(uri, { useNewUrlParser: true })
  // const client = new MongoClient(uri);
  client.connect((err, db) => {
    if (err) throw err
    console.log('connected to db!')
    var dbo = db.db('Pi_Serv')
    var query = { account: input_name}
    dbo.collection('accounts').find(query).toArray((err, result) => {
      if (err) throw err
      if (result.length > 0) {
        console.log('username already exists')
      } else {
        console.log('creating new user account')
      }
      console.log(result)
      db.close()
    })
  })

  // location.reload()
})
