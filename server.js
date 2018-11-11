const Hapi = require('hapi');
const Routes = require('./routes');

const server = Hapi.server({
  host: 'localhost',
  port: 9000
});

// Add routes
server.route(Routes);

// Start the server
const start = async () => {
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart']
    }
  });
  await server.start();
  console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
});

start();
module.exports = server;
