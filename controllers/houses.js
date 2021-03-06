const { House } = require('../models');
const Boom = require('boom');

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const houses = await House.query();
      return res.response({ houses, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  fetchOne: async (req, res) => {
    try {
      const { id } = req.params;
      const house = await House.query()
        .findById(id)
        .eager('rooms');
      if (!house) {
        return Boom.notFound(`House with id ${id} does not exist`);
      }

      return res.response({ house, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  create: async (req, res) => {
    try {
      const house = await House.query().insert(req.payload);
      return res.response({ house, success: true }).code(201);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      let house = await House.query().findById(id);
      if (!house) {
        return Boom.notFound(`House with id ${id} does not exist`);
      }

      house = await House.query().patchAndFetchById(id, req.payload);
      return res.response({ house, success: true }).code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  },
  delete: async (req, res) => {
    // TO DO: Find a way to perform soft delete
    try {
      const { id } = req.params;
      const house = await House.query().findById(id);
      if (!house) {
        return Boom.notFound(`House with id ${id} does not exist`);
      }

      await House.query().deleteById(id);
      return res
        .response({ message: 'House deleted successfully', success: true })
        .code(200);
    }
    catch (err) {
      return Boom.internal(err.message);
    }
  }
};
