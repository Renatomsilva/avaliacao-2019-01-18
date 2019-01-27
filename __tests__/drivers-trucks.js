const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';

describe('Get Divers Routes', () => {
  test('Should list Drivers Routes is own', async () => {
    const response = await http('GET', `${BASE_PATH}/drivers/trucks?is_own=1`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.be.an('array');
    expect(responseBody[0]).to.be.key('name');
  });

  test('Should list Drivers Routes is not is own', async () => {
    const response = await http('GET', `${BASE_PATH}/drivers/trucks?is_own=0`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.be.an('array');
    
  });

});