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

app.get('/food', (req, res) => {
    var foodCollection = db.collection('infoPost')
        .find().toArray((err,foodCollection) => {

           res.render('food',{infoPost: foodCollection})
    })
})

var updateFood = function(db, callback) {
   db.collection('infoPost').updateOne(
      { "content" : "this is changed content" },
      {
        $set: { "content": "this is somemore content" },
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

app.get('/editfood', (req, res) => {
    let collection = db.collection('infoPost')
      .find().toArray((err, collection) => {

         res.render('editfood',{infoPost: collection})
      })
})

app.put('/editFood', (req, res) => {
  db.collection('infoPost')
  .findOneAndUpdate({"title" : "food"}, {
    $set: {
      content: req.body.content
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
})

app.get('/envirment', (req, res) => {
    var envirmentCollection = db.collection('infoPost')
        .find().toArray((err,envirmentCollection) => {
           res.render('envirment',{infoPost: envirmentCollection})
    })
})

app.post('/editEnvirment', (req, res) => {
    db.collection('infoPosts').findOneAndUpdate(
        {title:"Food and Diet for Rats"},
        {
            $set: {
                content: req.body.content
            }
        }, {
            sort: {_id: -1},
            upsert: true
        }, (err, result) => {
            if(err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        }
    )
    res.redirect('/envirment')
})

app.get('/health', (req, res) => {
    var ratHealthCollection = db.collection('infoPost').find()
      .toArray((err,ratHealthCollection) => {
          res.render('health',{infoPost:ratHealthCollection})
      })
})

app.post('/editHealth', (req, res) => {

})

app.get('/funAndTraining', (req, res) => {
    res.render('funAndTraing')
})

app.post('/editFunAndTraining', (req, res) => {

})

app.get('/chat', (req, res) => {
   var chatCollection = db.collection('chatMessage')
   .find().toArray((err, chatCollection) => {

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
