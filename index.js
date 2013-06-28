
var PAAS = module.exports = function(ports) {
  return {
    register: function(server, options) {

      process.on('SIGTERM', function () {
        if (server != null) {
          server.close();
        }
        signalReceived = true;
      });

      var port = ports.register();


    }
  }
}