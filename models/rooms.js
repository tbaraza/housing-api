const Model = require('./model');

class Room extends Model {
  static get tableName() {
    return 'rooms';
  }

  static get relationMappings() {
    // Import models here to prevent require loops.
    const House = require('./houses');

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
