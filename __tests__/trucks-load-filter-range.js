const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';
const date = new Date();
const dateFilter = date.getFullYear() + '/' + ( date.getMonth() + 1) + '/' +  date.getDate();

describe('Truck Loads', () => {

  test('Should list Trucks is load by range', async () => {
    const response = await http('GET', `${BASE_PATH}/trucks/load?start_day=${dateFilter}&end_day=${dateFilter}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    console.log(responseBody);
    expect(responseBody).to.be.an('object');
    expect(responseBody.count_trucks).to.be.gt(0);
  });

  test('Should list Trucks is load by date start', async () => {
    const response = await http('GET', `${BASE_PATH}/trucks/load?start_day=${dateFilter}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.be.an('object');
    expect(responseBody.count_trucks).to.be.gt(0);
  });

  test('Should fail Trucks is load if no range', async () => {
    const response = await http('GET', `${BASE_PATH}/trucks/load`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Day Start object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });
});