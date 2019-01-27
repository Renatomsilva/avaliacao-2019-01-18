const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';

describe('Get Routes GroupType', () => {
  test('Should list Drivers Routes is own ', async () => {
    const response = await http('GET', `${BASE_PATH}/routes/group_type`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.be.an('object');
    expect(responseBody).to.be.key("Caminhão 3/4");
  });

});