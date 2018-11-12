const HouseRoutes = require('./houses');
const RoomRoutes = require('./rooms');

const index = {
  method: 'GET',
  path: '/',
  handler: (request, h) => 'Welcome to new beginnings'
};

module.exports = [...HouseRoutes, ...RoomRoutes, index];
