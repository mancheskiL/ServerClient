const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://luman_og:12213119@lumandb.z488z.gcp.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // perform actions on the collection object
  console.log('connection successful!')
  client.close();
});
