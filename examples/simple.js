var express = require('../node_modules/express')
  , seaport = require('../node_modules/seaport')
  , ports = seaport.connect(4500)
  , paas = require('../')(ports);

var app = express();

app.get('/', function(req, res) {
  res.send('testing');
});

paas.register(app, { 
  name:'example',
  serverName: 'local.host'
});
