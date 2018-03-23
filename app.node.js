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

//Istanza per api meteo di yahoo
var YQL = require('yql');

app.post('/assistente/', function(req, res, next) {
  //console.log(req.body);
  listaReq.push(req.body);

  var action = req.body.result.action;
  var parametri = req.body.result.parameters;
  var lingua = req.body.lang;

  console.log(action);
  console.log(parametri);

  if (action === 'getmeacabConfirmation'){

    if (lingua === "en"){
      risposta = 'Get a cab near ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees F.';
    } else if (lingua === 'it') {
      risposta = 'Cerco un taxi vicino a ' + location.city + ', ' + location.street-address + '.';
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': 'sono nel confirm cab', 'displayText': 'sono nel confirm cab' }));
  } else if (action === 'yahooWeatherForecast'){

    var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+parametri.geo_city+'")');

    query.exec(function(err, data) {
      var location = data.query.results.channel.location;
      var condition = data.query.results.channel.item.condition;
      var risposta = "";

      if (lingua === "en"){
        risposta = 'The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees F.';
      } else if (lingua === 'it') {
        risposta = 'Attualmente il tempo a ' + location.city + ', ' + location.region + ' è di ' + condition.temp + ' gradi F.';
      }
      console.log(risposta);

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'speech': risposta, 'displayText': risposta }));
    });
  }

  //res.sendStatus(200);
});

app.get('/assistente/', function(req, res, next) {
  res.send(listaReq);
});

module.exports = app;
