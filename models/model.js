const { Model } = require('objection');
const Knex = require('knex');
const Connection = require('../knexfile');

const env = process.env.NODE_ENV || 'development';

const knexConnection = Knex(Connection[env]);

Model.knex(knexConnection);

module.exports = Model;
