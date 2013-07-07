var seaport = require('seaport')
  , async = require('async')
  , http = require('http')
  , distribute = require('distribute')
  , dockmaster = require('dockmaster');

var defaults = require('./defaults.json');

var createRouter = function(ports) {
  var httpServer = http.createServer();
  
  httpServer.listen(ports.register('router', { noroute: true, port: defaults.ports.router }), function() {
    console.log("Router listening on: "+defaults.ports.router);
  });

  // Wrap the httpServer with distribute
  var router = distribute(httpServer);

  // Use the Dockmaster middleware
  router.use(dockmaster(ports));

  return router;
}

var seaportServer = seaport.createServer();

seaportServer.listen(defaults.ports.seaport, function() {
  console.log("Seaport server listening on: "+defaults.ports.seaport);

  var ports = seaport.connect(defaults.ports.seaport)
    , router = createRouter(ports);
});