const { Room, House } = require('../models');
const Boom = require('boom');

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const rooms = await Room.query();
      return res.response({ rooms, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  fetchOne: async (req, res) => {
    try {
      const { id } = req.params;
      const room = await Room.query()
        .findById(id)
        .eager('house');
      if (!room) {
        return res
          .response({
            error: 'Not Found',
            message: `Room with id ${id} does not exist`,
            success: false
          })
          .code(404);
      }

      return res.response({ room, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  create: async (req, res) => {
    try {
      const { house_id } = req.payload;
      const house = await House.query().findById(house_id);
      if (!house) {
        return res
          .response({
            error: 'Not Found',
            message: `House with id ${house_id} does not exist`,
            success: false
          })
          .code(404);
      }

      const room = await Room.query().insert(req.payload);
      return res.response({ room, success: true }).code(201);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      let room = await Room.query().findById(id);
      if (!room) {
        return res
          .response({
            error: 'Not Found',
            message: `Room with id ${id} does not exist`,
            success: false
          })
          .code(404);
      }

      const { house_id } = req.payload;
      if (house_id) {
        const house = await House.query().findById(house_id);
        if (!house) {
          return res
            .response({
              error: 'Not Found',
              message: `House with id ${house_id} does not exist`,
              success: false
            })
            .code(404);
        }
      }

      room = await Room.query().patchAndFetchById(id, req.payload);
      return res.response({ room, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const room = await Room.query().findById(id);
      if (!room) {
        return res
          .response({
            error: 'Not Found',
            message: `Room with id ${id} does not exist`,
            success: false
          })
          .code(404);
      }

      await Room.query().deleteById(id);
      return res
        .response({
          error: 'Not Found',
          message: 'Room deleted successfully',
          success: true
        })
        .code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  }
};
