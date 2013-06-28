var express = require('../node_modules/express')
  , seaport = require('../node_modules/seaport')
  , ports = seaport.connect(4500)
  , paas = require('../')(ports);

var app = express();

paas.register(app, { 
  name:'example',
  serverName: 'example.com'
});
