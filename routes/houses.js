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
  },
  {
    method: 'GET',
    path: '/houses/{id}',
    handler: HouseController.fetchOne,
    options: {
      description: 'Fetch one house',
      notes: 'Id is a number',
      tags: ['api', 'houses'],
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/houses',
    handler: HouseController.create,
    options: {
      description: 'Create one house',
      notes: 'Pass in house details in the body',
      tags: ['api', 'houses'],
      validate: {
        payload: {
          name: Joi.string().required(),
          location: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/houses/{id}',
    handler: HouseController.update,
    options: {
      description: 'Update one house',
      notes: 'Pass in house details in the body',
      tags: ['api', 'houses'],
      validate: {
        payload: {
          name: Joi.string(),
          location: Joi.string()
        },
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/houses/{id}',
    handler: HouseController.delete,
    options: {
      description: 'Delete one house',
      notes: 'Id is a number',
      tags: ['api', 'houses'],
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  }
];
