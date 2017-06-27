var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var messages = [
    { text: 'some text', owner: 'Anderw' },
    { text: 'some koko text', owner: 'MotoAnderw'},
    { text: 'some text', owner: 'AlohaAnderw' }
];
var  users = [];

app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    next();
})

var api = express.Router();
var auth = express.Router();

api.get('/messages',(req, res) => {
    res.json(messages);
})

api.get('/messages/:user',(req, res) => {
    var user = req.params.user;
    var result = messages.filter(message=>message.owner == user);
    
    res.json(result);
})

api.post('/messages',(req, res) => {
    messages.push(req.body);
    res.json(req.body);
})

auth.post('/register', (req, res) => {
    // console.log(req.body);
    var index =  users.push(req.body) - 1;
    
    var user = users[index]; 
    user.id = index;

    var token = jwt.sign(user.id, '123'); 
    res.json(token);
})

app.use('/api', api);  //route
app.use('/auth', auth); //route


app.listen(63145);
 