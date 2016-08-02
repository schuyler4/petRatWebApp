const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

function renderPage(url, pageToRender) {
  app.get(url, (req, res) => {
      var collection = db.collection('infoPost')
          .find().toArray((err, collection) => {
             res.render(pageToRender,{infoPost: collection})
      })
  })
}

function updateInfo(url ,title, redirect) {
  app.post(url, (req, res) => {
    var contentToAdd = {
      content:req.body.content
    }
    db.collection('infoPost').updateOne({"title": title},
      {$set: contentToAdd}, (err, result) => {
        console.log('updated')
    })
    res.redirect(redirect)
  })
}

renderPage('/food','food')
renderPage('/editfood', 'food')
updateInfo('/addToFood','food','/food')

renderPage('/envirment','envirment')
renderPage('/editEnvirment','editEnvirment')
updateInfo('/addToEnvirment', 'envirment', '/envirment')

renderPage('/funAndTraining','funAndTraining')
renderPage('/editFunAndTraining', 'editFunAndTraining')
updateInfo('/addFunAndTraining', 'funAndTraining', '/funAndTraining')

app.get('/chat', (req, res) => {
   let chatCollection = db.collection('chatMessage')
   .find().toArray((err, chatCollection) => {
      console.log(chatCollection)
       res.render('chat', {chatMessage: chatCollection})
   })
})

app.post('/addingMessage', (req, res) => {
    let messages = db.collection('chatMessage').save(req.body,
                                            (err, result) => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/chat')
        }
    })
})
/*let timestamp = _id.toString().substring(0,8)
date = new Date( parseInt( timestamp, 16 ) * 1000 )*/

function deleteMessageAfterTime() {
  let collection = db.collection('chatMessage').find().toArray
  ((err, collection) => {
    if(collection.length > 0) {
      db.collection('chatMessage').deleteOne({"title": collection[0].title},
        (err, result) => {
          console.log("deleted" + collection[0].title)
      })
    }
  })
}

let collection = db.collection('chatMessage').find().toArray
((err, collection) => {
  if(collection.length > 0) {
    console.log(collection[0].id)
  }
})
/*db.penguins.find().sort({_id:-1}).limit(1).forEach(function (doc) {
  console.log(doc._id.getTimestamp())
})*/

let db;

let mongoClient = mongodb.MongoClient
let url = 'mongodb://localhost:27017/petRatData'

mongoClient.connect(url, (err, database) => {
    if(err) {
        console.log(err)
    }
    else {
        db = database;
        app.listen(3000, ()  => {
            console.log("Express started")
        })
    }
})
