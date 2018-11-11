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
  }
};
