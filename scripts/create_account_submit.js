// const { ipcRenderer } = require('electron')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const button = document.getElementById('submit-account')

// for checking proper .env variables if debugging
// console.log(process.env.USER)
// console.log(process.env.PASSWORD)
// console.log(process.env.SITE)

// listen for submit button click
button.addEventListener('click', (event) => {
  console.log("submit button was pressed")
  // get String text from input box
  let input_name = document.getElementById("username-input").value
  console.log(input_name)

  // url for connection to server
  // gets credentials from env
  const uri = "mongodb+srv://" +
    process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SITE +
    ".z488z.gcp.mongodb.net/Pi_Serv?ssl=true&retryWrites=true&w=majority"

  // connect to cloud DB
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect((err, db) => {
    if (err) throw err
    console.log('connected to db!')
    // getting DB object
    var dbo = db.db('Pi_Serv')
    var query = { account: input_name}
    // query collection from DB with predefined query object
    dbo.collection('accounts').find(query).toArray((err, result) => {
      if (err) throw err
      // length > 0 means account already exists, otherwise make account
      if (result.length > 0) {
        console.log('username already exists')
      } else {
        console.log('creating new user account')
        var entry = { account: input_name }
        dbo.collection('accounts').insertOne(entry, (err, res) => {
          if (err) throw err
          console.log(input_name + ' :user account created')
        })
      }
      db.close()
    })
  })
  // refresh page so input line blanks after submission
  location.reload()

  // TODO: make input line blank using JS after submit click
  // instead of reloading the entire page and losing console.log info

  // TODO: make DB response text area for displaying status of DB
  // communications. Submit click can reset the text area
})
