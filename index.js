var _ = require('lodash');

var PAAS = module.exports = function(ports) {
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