const Joi = require('joi');
const { HouseController } = require('../controllers');

module.exports = [
  {
    method: 'GET',
    path: '/houses',
    handler: HouseController.fetchAll,
    options: {
      description: 'Fetch all houses',
      notes: 'No params required at the moment',
      tags: ['api', 'houses']
    }
  }
];
