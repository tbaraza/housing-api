const Chai = require('chai');
const Http = require('chai-http');
const Server = require('../server.js');
const { Room } = require('../models');

const { expect } = Chai;
Chai.use(Http);

describe('Houses endpoints', () => {
  context('When I visit /rooms endpoints passing the correct data', () => {
    it('should return an array of rooms when I fetch all rooms', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/rooms'
      });
      expect(response).to.have.status(200);
      expect(response.result.rooms).to.be.an('array');
      expect(response.result.success).to.be.true;
    });

    it('It should successfully create a room', async () => {
      const response = await Server.inject({
        method: 'POST',
        url: '/rooms',
        payload: {
          room_number: 34,
          house_id: 20000,
          status: 0
        }
      });
      expect(response).to.have.status(201);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.room.room_number).to.equal(34);
      expect(response.result.room.house_id).to.equal(20000);
      expect(response.result.room.status).to.equal(0);
    });

    it('It should return an object of room details when I fetch an room', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/rooms/3000'
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.room.room_number).to.equal(1);
      expect(response.result.room.house_id).to.equal(20000);
      expect(response.result.room.status).to.equal('0');
      expect(response.result.room.id).to.equal(3000);
    });

    it('It should successfully update a room', async () => {
      const response = await Server.inject({
        method: 'PUT',
        url: '/rooms/2000',
        payload: {
          house_id: 3000
        }
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.room.house_id).to.equal(3000);
    });

    it('It should delete a room successfully', async () => {
      const response = await Server.inject({
        method: 'DELETE',
        url: '/rooms/3000'
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.message).to.equal('Room deleted successfully');
    });
  });

  context('When I visit the /rooms endpoints passing incorrect data', () => {
    it('It should return an error when I do not pass all the required fields when creating a room', async () => {
      const response = await Server.inject({
        method: 'POST',
        url: '/houses',
        payload: {
          room_number: 5
        }
      });
      expect(response).to.have.status(400);
      expect(response.result.error).to.equal('Bad Request');
      expect(response.result.message).to.equal('Invalid request payload input');
    });

    it('It should return an error when I pass a non-existing house_id when creating a room', async () => {
      const response = await Server.inject({
        method: 'POST',
        url: '/rooms',
        payload: {
          room_number: 34,
          house_id: 455,
          status: 0
        }
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'House with id 455 does not exist'
      );
    });

    it('It should return an error when I try to fetch a non existing room', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/rooms/33'
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'Room with id 33 does not exist'
      );
    });

    it('It should return an error when I try to update a non existing room', async () => {
      const response = await Server.inject({
        method: 'PUT',
        url: '/rooms/33',
        payload: {
          status: '1'
        }
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'Room with id 33 does not exist'
      );
    });

    it('It should return an error when I pass a non-existing house_id when updating a room', async () => {
      const response = await Server.inject({
        method: 'PUT',
        url: '/rooms/2000',
        payload: {
          house_id: 455
        }
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'House with id 455 does not exist'
      );
    });

    it('It should return an error when I try to delete a non existing room', async () => {
      const response = await Server.inject({
        method: 'DELETE',
        url: '/rooms/33'
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'Room with id 33 does not exist'
      );
    });
  });
});
