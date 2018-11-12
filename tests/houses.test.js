const Chai = require('chai');
const Http = require('chai-http');
const Server = require('../server.js');
const { House } = require('../models');

const { expect } = Chai;
Chai.use(Http);

const destroyHouse = async () => {
  await House.query()
    .delete()
    .where('name', 'ASIL');
};

describe('Houses endpoints', () => {
  before(destroyHouse);
  after(destroyHouse);
  context('When I visit /houses endpoints passing the correct data', () => {
    it('should return an array of houses when I fetch all houses', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/houses'
      });
      expect(response).to.have.status(200);
      expect(response.result.houses).to.be.an('array');
      expect(response.result.success).to.be.true;
    });

    it('It should successfully create a house', async () => {
      const response = await Server.inject({
        method: 'POST',
        url: '/houses',
        payload: {
          name: 'ASIL',
          location: 'Kilimani, Nairobi'
        }
      });
      expect(response).to.have.status(201);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.house.name).to.equal('ASIL');
      expect(response.result.house.location).to.equal('Kilimani, Nairobi');
    });

    it('It should return an object of house details when I fetch an house', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/houses/10000'
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.house.name).to.equal('Peniel House');
      expect(response.result.house.location).to.equal('Kibera, Nairobi');
      expect(response.result.house.id).to.equal(10000);
    });

    it('It should successfully update a house', async () => {
      const response = await Server.inject({
        method: 'PUT',
        url: '/houses/20000',
        payload: {
          name: 'Sizzlin House'
        }
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.house.name).to.equal('Sizzlin House');
    });

    it('It should delete a house successfully', async () => {
      const response = await Server.inject({
        method: 'DELETE',
        url: '/houses/3000'
      });
      expect(response).to.have.status(200);
      expect(response.result.success).to.be.true;
      expect(response.result).to.be.an('object');
      expect(response.result.message).to.equal('House deleted successfully');
    });
  });

  context('When I visit the /houses endpoints passing incorrect data', () => {
    it('It should return an error when I do not pass all the required fields when creating a house', async () => {
      const response = await Server.inject({
        method: 'POST',
        url: '/houses',
        payload: {
          name: 'Crow House'
        }
      });
      expect(response).to.have.status(400);
      expect(response.result.error).to.equal('Bad Request');
      expect(response.result.message).to.equal('Invalid request payload input');
    });

    it('It should return an error when I try to fetch a non existing house', async () => {
      const response = await Server.inject({
        method: 'GET',
        url: '/houses/34'
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'House with id 34 does not exist'
      );
    });

    it('It should return an error when I try to update a non existing house', async () => {
      const response = await Server.inject({
        method: 'PUT',
        url: '/houses/34',
        payload: {
          name: 'Crower House'
        }
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'House with id 34 does not exist'
      );
    });

    it('It should return an error when I try to delete a non existing house', async () => {
      const response = await Server.inject({
        method: 'DELETE',
        url: '/houses/111'
      });
      expect(response).to.have.status(404);
      expect(response.result.error).to.equal('Not Found');
      expect(response.result.message).to.equal(
        'House with id 111 does not exist'
      );
    });
  });
});
