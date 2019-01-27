const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';

const requestDriver = {
  "driver": {
    "name": chance.name(),
    "gender": 'F',
    "license_type": "A"
  }
};

const driver_id = 1;

describe('Update Driver', () => {
  delete requestDriver.driver.license;

  test('Should update driver if driver not found', async () => {
    const response = await http('PATCH', `${BASE_PATH}/drivers/99`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestDriver
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Truck driver not found');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should update driver', async () => {
    requestDriver.driver.name = chance.name();
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestDriver
    });
    const responseBody = JSON.parse(response.body.toString());
    console.log(responseBody);
    expect(responseBody.name).to.be.equal(requestDriver.driver.name);
    expect(responseBody.license_type).to.be.equal(requestDriver.driver.license_type);
    expect(responseBody.gender).to.be.equal(requestDriver.driver.gender);
  });


  test('Should update driver only name', async () => {
    const requestUpdate = {
      "driver": {
        "name": chance.name()
      }
    }
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdate
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.name).to.be.equal(requestUpdate.driver.name);
  });

  test('Should update driver only gender', async () => {
    const requestUpdate = {
      "driver": {
        "gender": 'M'
      }
    }
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdate
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.gender).to.be.equal(requestUpdate.driver.gender);
  });

  test('Should fail to  update driver if gender out of range', async () => {
    const requestUpdate = {
      "driver": {
        "gender": 'A'
      }
    }
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdate
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.gender is not one of enum values: M,F');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to update driver if license_type out of range', async () => {
    const requestUpdate= {
      "driver": {
        "license_type": 'F'
      }
    }
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdate    
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('instance.license_type is not one of enum values: A,B,C,D,E,ACC');
    expect(responseBody.error.status).to.be.equal(400);
  });



  test('Should fail to update driver if driver object is undefined', async () => {
    const requestUpdateEmpty = {
    }
    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdateEmpty
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Driver object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to update driver if driver object is empty', async () => {
    const requestUpdateEmpty = {
      "driver": {}
    };

    const response = await http('PATCH', `${BASE_PATH}/drivers/${driver_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestUpdateEmpty
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.equal('Driver object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });
});