var express = require('../node_modules/express')
  , paas = require('../')();

var app = express();

app.get('/', function(req, res) {
  res.send('testing');
});

paas.register(app, { 
  name:'example',
  serverName: 'local.host'
});
