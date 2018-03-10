//Istanza Express
var express = require('express');
var app = express();

//Istanza bodyparser per leggere i JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var listaReq = [];

app.post('/assistente', function(req, res, next) {
  listaReq.push(req);
  res.sendStatus(200);
});

app.get('/assistente', function(req, res, next) {
  res.send(listaReq);
});

module.exports = app;
