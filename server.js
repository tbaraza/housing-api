const Hapi = require('hapi');

const server = Hapi.server({
  host: 'localhost',
  port: 9000
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => 'Welcome to new beginnings'
});

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
