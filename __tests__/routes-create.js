const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';
const id_drivers_trucks = 1;
const requestRoute = {
  "route": { 
    "origin": "51.498134, 48.00033" , 
    "destiny": "51.498134, 48.00033", 
    "id_drivers_trucks" : id_drivers_trucks
  }
};


describe('Create Routes', () => {

  test('Should create route', async () => {

    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestRoute
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.id).to.be.gt(0);
    expect(responseBody.origin).to.be.equal(requestRoute.route.origin);
    expect(responseBody.destiny).to.be.equal(requestRoute.route.destiny);
    expect(responseBody.id_drivers_trucks).to.be.equal(requestRoute.route.id_drivers_trucks);
  });

  test('Should failt to create the same route', async () => {
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestRoute
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('An active route already exists');
    expect(responseBody.error.status).to.be.equal(400);
  });
  
  test('Should failt to create if route is undedined ', async () => {
    const request = {};
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Route object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should failt to create if route is empty ', async () => {
    const request = {
      "route": { }
    };
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Route object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should failt to create route if origin not format', async () => {
    requestRoute.route.origin = 'aaaa';
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestRoute
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.origin does not conform to the "coordinates" format');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should failt to create route if destiny not format', async () => {
    requestRoute.route.destiny = 'aaaa';
    requestRoute.route.origin = '51.498134, 48.00033';
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestRoute
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.destiny does not conform to the "coordinates" format');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should failt to create route if destiny and origin not format', async () => {
    requestRoute.route.destiny = 'aaaa';
    requestRoute.route.origin = 'aaaa';
    const response = await http('PUT', `${BASE_PATH}/routes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestRoute
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.origin does not conform to the "coordinates" format. instance.destiny does not conform to the "coordinates" format');
    expect(responseBody.error.status).to.be.equal(400);
  });
});