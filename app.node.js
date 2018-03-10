//Istanza Express
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method=='OPTIONS'){
    res.sendStatus(200);
  }else{
    next();
  }
});

//Istanza bodyparser per leggere i JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var listaReq = [];

app.post('/assistente/', function(req, res, next) {
  console.log(req.body);
  listaReq.push(req.body);
  res.sendStatus(200);
});

app.get('/assistente/', function(req, res, next) {
  res.send(listaReq);
});

module.exports = app;
