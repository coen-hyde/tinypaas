var seaport = require('seaport')
  , async = require('async')
  , http = require('http')
  , distribute = require('distribute')
  , dockmaster = require('dockmaster');

var seaportPort = 4500
  , routerPort = 4501;

var createRouter = function(ports) {
  // Wrap the httpServer with distribute
  var router = distribute(http.createServer());

  // Use the Dockmaster middleware
  router.use(dockmaster(ports));

  return router;
}

var seaportServer = seaport.createServer();

seaportServer.listen(seaportPort, function() {
  console.log("Seaport server listening on: "+seaportPort);

  var ports = seaport.connect(seaportPort);
    , router = createRouter(ports);

  router.listen(ports.register('router', {noroute: true, port: routerPort}, function() {
    console.log("Router listening on: "+routerPort);
  });
});