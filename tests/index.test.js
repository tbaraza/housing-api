const Chai = require('chai');
const Http = require('chai-http');
const Server = require('../server.js');

const { expect } = Chai;
Chai.use(Http);

describe('When I visit the index route', () => {
  it('should return a message string', async () => {
    const response = await Server.inject({
      method: 'GET',
      url: '/'
    });
    expect(response).to.have.status(200);
    expect(response.payload).to.be.a('string');
    expect(response.payload).to.equal('Welcome to new beginnings');
  });
});
