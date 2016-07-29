var express = require('express');
var app = express()
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

app.get('/chat', () => {
    res.render('chat')
}) 

app.post('/addingMessage', (req, res) => {
    
})

app.listen(3000, ()  => {
    console.log("Express started")
});