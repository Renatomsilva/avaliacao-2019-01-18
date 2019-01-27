const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';

const requestDriver = {
  "driver": {
    "name": chance.name(),
    "license": chance.name(),
    "gender": 'F',
    "license_type": "A"
  }
};

describe('Create Driver', () => {

  test('Should create driver', async () => {
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestDriver
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.id).to.be.gt(0);
    expect(responseBody.name).to.be.equal(requestDriver.driver.name);
    expect(responseBody.license).to.be.equal(requestDriver.driver.license);
    expect(responseBody.gender).to.be.equal(requestDriver.driver.gender);
    expect(responseBody.license_type).to.be.equal(requestDriver.driver.license_type);
  });

  test('Should failt to create driver if duplicate license', async () => {
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestDriver
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('Duplicate entry');
    expect(responseBody.error.status).to.be.equal(409);
  });

  test('Should fail to create driver if name is empty', async () => {
    const request = {
      "driver": {
        "license": "Teste01",
        "gender": "F",
        "license_type": "A"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "name"');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create driver if license is empty', async () => {
    const request = {
      "driver": {
        "name": "Teste01",
        "gender": "F",
        "license_type": "A"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "license"');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to create driver if gender is empty', async () => {
    const request = {
      "driver": {
        "name": "Teste01",
        "license": "Teste01",
        "license_type": "A"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "gender"');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to create driver if license_type is empty', async () => {
    const request = {
      "driver": {
        "name": "Teste01",
        "license": "Teste01",
        "gender": "F"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance requires property "license_type"');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create driver if driver object is empty', async () => {
    const request = {
      "driver": {}
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
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


  test('Should fail to create driver if driver object is undefined', async () => {
    const request = {};
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
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

  test('Should fail to create driver if gender is not F or M', async () => {
    const request = {
      "driver": {
        "name": "Teste01",
        "license": "Teste01",
        "gender": "A",
        "license_type": "A"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.gender is not one of enum values: M,F');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create driver if license_type out of range', async () => {
    const request = {
      "driver": {
        "name": "Teste01",
        "license": "Teste01",
        "gender": "A",
        "license_type": "F"
      }
    };
    const response = await http('PUT', `${BASE_PATH}/drivers`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: request
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.gender is not one of enum values: M,F. instance.license_type is not one of enum values: A,B,C,D,E,ACC');
    expect(responseBody.error.status).to.be.equal(400);
  });
});