const Model = require('./model');
const { House } = require('./index');

class Room extends Model {
  static get tableName() {
    return 'rooms';
  }

  static get relationMappings() {
    return {
      rooms: {
        relation: Model.BelongsToOneRelation,
        modelClass: House,
        join: {
          from: 'rooms.house_id',
          to: 'houses.id'
        }
      }
    };
  }
}

module.exports = Room;
