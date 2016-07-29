const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')   
})

app.get('/food', (req, res) => {
    res.render('food')
})

app.post('/editfood', (req, res) => {
    
})

app.get('/envirment', (req, res) => {
    res.render('envirment')
})

app.post('/editEnvirment', (req, res) => {
    
})

app.get('/health', (req, res) => {
    res.render('health')
})

app.post('/editHealth', (req, res) => {
    
})

app.get('/funAndTraining', (req, res) => {
    res.render('funAndTraing')
})

app.post('/editFunAndTraining', (req, res) => {
    
})

app.get('/chat', (req, res) => {
    var mongoClient = mongodb.MongoClient
    var url = 'mongodb://localhost:27017/petRatData'
    
    mongoClient.connect(url, (err, db) => {
        if(err) {
            console.log(err)   
        } 
        else {
           var collection = db.collection('chatMessage')
           collection.find().toArray((err, collection) => {
                                     
            })
           res.render('chat')
        }
    })
}) 

app.post('/addingMessage', (req, res) => {
    var collection = db.collection('chatMessage')
    collection.save(req.body, (err, result) => {
        if (err) {
            console.log(err)
        } 
        res.redirect('/chat')
    });
})

app.listen(3000, ()  => {
    console.log("Express started")
});