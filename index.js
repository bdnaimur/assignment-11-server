const express = require('express');
const app = express();
const port =process.env.PORT || 5055;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.esvfp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const vramankariCollection = client.db(`${process.env.DB_NAME}`).collection("vramankaris");
  const reviewCollection = client.db(`${process.env.DB_NAME}`).collection("reviews");
  const adminPanelCollection = client.db(`${process.env.DB_NAME}`).collection("adminPanel");
  const reviewStatusCollection = client.db(`${process.env.DB_NAME}`).collection("reviewStatus");
  const serviceCollection = client.db(`${process.env.DB_NAME}`).collection("orders");
  console.log("db connect done")
  
  app.get('/vramankaris', (req, res) => {
  vramankariCollection.find()
    .toArray((err, items) => {
        res.send(items)
    })    
})

app.get('/services', (req, res) => {
  serviceCollection.find()
  .toArray((err, items) => {
      res.send(items)
  })    
})

app.get('/reviews', (req, res) => {
  reviewCollection.find()
  .toArray((err, items) => {
      res.send(items)
  })    
})

app.get('/ourTeams', (req, res) => {
  adminPanelCollection.find()
  .toArray((err, items) => {
      res.send(items)
  })    
})

app.get('/pithaUser', (req, res) => {
  console.log(req.query.email)
  vramankariCollection.find({email: req.query.email})
  .toArray((err, items) => {
    console.log(items)
    // res.redirect('/pithaUser')
    res.send(items)
  })    
})


app.post('/addServices', (req, res) => {
  const newEvent = req.body;
  console.log('adding new event: ', newEvent)
  serviceCollection.insertOne(newEvent)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})

app.post('/addStatus', (req, res) => {
  const newEvent = req.body;
  console.log('adding new event: ', newEvent)
  reviewStatusCollection.insertOne(newEvent)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})

app.post('/addReviews', (req, res) => {
  const newEvent = req.body;
  console.log('adding new event: ', newEvent)
  reviewCollection.insertOne(newEvent)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})

app.post('/addOurTeams', (req, res) => {
  const newEvent = req.body;
  console.log('adding new event: ', newEvent)
  adminPanelCollection.insertOne(newEvent)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})


app.post('/addProductWithUser', (req, res) => {
  const newEvent = req.body;
  console.log('adding new event: ', newEvent)
  vramankariCollection.insertOne(newEvent)
  .then(result => {
      console.log('inserted count', result.insertedCount);
      res.send(result.insertedCount > 0)
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = (req.params.id);
  console.log('delete this', id);
  pithaUserCollection.deleteOne({_id: id})
  .then(documents => {
    // if(documents.deletedCount>0){
    //   res.send(documents.deletedCount)
    // }
    res.send(documents.deletedCount> 0)
    console.log(documents)})
})


});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})