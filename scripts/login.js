const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const fs = require('fs')
const { ipcRenderer } = require('electron')

const submitButton = document.getElementById('login-submit')

submitButton.addEventListener('click', (event) => {
  console.log("submit button was pressed")

  let inputLogin = document.getElementById('username').value
  let rememberBox = document.getElementById('remember-me').checked

  // console.log("login value: " + inputLogin)
  // console.log("checkbox: " + rememberBox)

  const uri = "mongodb+srv://" +
    process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SITE +
    ".z488z.gcp.mongodb.net/Pi_Serv?ssl=true&retryWrites=true&w=majority"
  // uncomment for DB setup code, local test below this until internet available
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect((err, db) => {
    if (err) throw err
    console.log('connected to db')

    var dbo = db.db('Pi_Serv')
    var query = { account: inputLogin }

    dbo.collection('accounts').find(query).toArray((err, result) => {
      if (err) throw err

      if (result.length < 1) {
        console.log("username does not exist")
      } else {
        // cookie handling
        if (rememberBox) {
          // make long lasting cookie
          let message = true
          ipcRenderer.send('cookie-build', [message, inputLogin])
        } else {
          // make session only cookie
          let message = false
          ipcRenderer.send('cookie-build', [message, inputLogin])
        }
      }
      db.close()
    })
  })
  // const tempLogin = 'test'
  //
  // if (tempLogin !== inputLogin){
  //   console.log('username does not exist')
  // } else {
  //   if (rememberBox) {
  //     // make long lasting cookie
  //     let message = true
  //     ipcRenderer.send('cookie-build', [message, inputLogin])
  //   } else {
  //     // make session only cookie
  //     let message = false
  //     ipcRenderer.send('cookie-build', [message, inputLogin])
  //   }
  // }
})

// receives cookie info from main process
// I don't think i actually need this here...*thinking*
// ipcRenderer.on('cookie-reply', (event, arg) => {
//   const cookieUser = arg
//   console.log('cookie user: ')
//   console.dir(cookieUser)
// })
