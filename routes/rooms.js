const Joi = require('joi');
const { RoomController } = require('../controllers');

module.exports = [
  {
    method: 'GET',
    path: '/rooms',
    handler: RoomController.fetchAll,
    options: {
      description: 'Fetch all rooms',
      notes: 'No params required at the moment',
      tags: ['api', 'rooms']
    }
  },
  {
    method: 'GET',
    path: '/rooms/{id}',
    handler: RoomController.fetchOne,
    options: {
      description: 'Fetch one room',
      notes: 'Id is a number',
      tags: ['api', 'rooms'],
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/rooms',
    handler: RoomController.create,
    options: {
      description: 'Create one room',
      notes: 'Pass in room details in the body',
      tags: ['api', 'rooms'],
      validate: {
        payload: {
          room_number: Joi.number().required(),
          house_id: Joi.number().required(),
          status: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/rooms/{id}',
    handler: RoomController.update,
    options: {
      description: 'Update one room',
      notes: 'Pass in room details in the body',
      tags: ['api', 'rooms'],
      validate: {
        payload: {
          room_number: Joi.number(),
          house_id: Joi.number(),
          status: Joi.number()
        },
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/rooms/{id}',
    handler: RoomController.delete,
    options: {
      description: 'Delete one room',
      notes: 'Id is a number',
      tags: ['api', 'rooms'],
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  }
];
