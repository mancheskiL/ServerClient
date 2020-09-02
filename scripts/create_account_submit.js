const { ipcRenderer } = require('electron')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const button = document.getElementById('submit-account')

// listen for submit button click
button.addEventListener('click', (event) => {
  console.log("submit button was pressed")
  // debug_send('test')
  let output = document.getElementById("username-input").value
  console.log(output)
  // ipcRenderer.invoke('create-account', output)

  const uri = "mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + "@" process.env.SITE + ".z488z.gcp.mongodb.net/Pi_Serv?retryWrites=true&w=majority";
  // const uri = "mongodb+srv://" +
  //   process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SITE +
  //   ".z488z.gcp.mongodb.net/Pi_Serv?ssl=true&authSource=admin&retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true })
  // const client = new MongoClient(uri);
  client.connect(err => {
    if (err) throw err
    console.log('connected to db!')
    client.close()
  })

  // location.reload()
})
