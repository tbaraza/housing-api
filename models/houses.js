const Model = require('./model');
const { Room } = require('./index');

class House extends Model {
  static get tableName() {
    return 'houses';
  }

  static get relationMappings() {
    return {
      rooms: {
        relation: Model.HasManyRelation,
        modelClass: Room,
        join: {
          from: 'houses.id',
          to: 'rooms.house_id'
        }
      }
    };
  }
}

module.exports = House;
