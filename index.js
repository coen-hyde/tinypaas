var _ = require('lodash')
  , seaport = require('seaport');

var PAAS = module.exports = function(ports) {
  // Connect to default tiny-paas seaport server
  if (typeof ports === 'undefined') {
    ports = seaport.connect(4500);
  }

  // Connect to specified seaport server
  if (!_.isObject(ports)) {
    ports = seaport.connect(ports);
  }

  return {
    register: function(server, options, cb) {
      if (typeof options.name === 'undefined') {
        throw new Error('Option name is required to register an app with tiny-paas');
      }

      process.on('SIGTERM', function () {
        if (server != null) {
          server.close();
          console.log('Closing HTTP server');
        }
      });

      server.listen(ports.register(options.name, _.pick(options, ['serverName', 'mount'])), cb);
    }
  }
}