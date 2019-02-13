const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';
const driver_id = 1;
const requestTruck = {
  "truck": {
    "type": 1,
    "is_own": true,
    "tag": "XYZ-4453333"
  },
  "driver": {
    "id": driver_id
  }
};

describe('Create Truck', () => {

  test('Should create truck', async () => {
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestTruck
    });
    const responseBody = JSON.parse(response.body.toString());
    console.log(responseBody);
    expect(responseBody.id).to.be.gt(0);
    expect(responseBody.type).to.be.equal(requestTruck.truck.type);
    expect(responseBody.is_own).to.be.equal(requestTruck.truck.is_own);
    expect(responseBody.tag).to.be.equal(requestTruck.truck.tag);
    expect(responseBody.driver_id).to.be.equal(requestTruck.driver.id);
  });

  test('Should failt to create trucks if duplicate tag', async () => {
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestTruck
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('Duplicate entry');
    expect(responseBody.error.status).to.be.equal(409);
  });

  test('Should fail to create trucks if type is empty', async () => {
    const request = {
      "truck": {
        "is_own": true,
        "tag": "XYZ-23121"
      },
      "driver": {
        "id": driver_id
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "type"');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to create trucks if type out of range', async () => {
    const request = {
      "truck": {
        "is_own": true,
        "type": 9,
        "tag": "XYZ-12345"
      },
      "driver": {
        "id": driver_id
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.type must have a maximum value of 5. instance.type is not one of enum values: 1,2,3,4,5');
    expect(responseBody.error.status).to.be.equal(400);
  });

  
  test('Should fail to create trucks if is_own is empty', async () => {
    const request = {
      "truck": {
        "type": 1,
        "tag": "XYZ-12345"
      },
      "driver": {
        "id": driver_id
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "is_own"');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create trucks if is_own out of range', async () => {
    const request = {
      "truck": {
        "type": 1,
        "is_own": 1,
        "tag": "XYZ-12345"
      },
      "driver": {
        "id": driver_id
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.is_own is not of a type(s) boolean');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to create trucks if tag is empty', async () => {
    const request = {
      "truck": {
        "type": 1,
        "is_own": true
      },
      "driver": {
        "id": driver_id
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "tag"');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create trucks if truck is empty', async () => {
    const request = {
      "truck": {}
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Truck object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create trucks if driver is empty', async () => {
    const request = {
      "truck": {
        "truck": {
          "type": 1,
          "is_own": true
        },
      }
    };
    const response = await http('PUT', `${BASE_PATH}/trucks`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Driver object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });

});