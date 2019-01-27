const http = require('sync-request');
const expect = require('chai').expect;
let Chance = require('chance');
let chance = new Chance();

const BASE_PATH = 'http://localhost:4000';

const requestCheckIn = {
  "checkinout": {
    "coordinates": "51.498134, 48.00033",
    "id_route": 1,
    "type": "IN",
    "is_load": true
  }
}

const requestCheckOut = {
  "checkinout": {
    "coordinates": "51.498134, 48.00033",
    "id_route": 1,
    "type": "OUT",
    "is_load": true
  }
}

describe('Create Routes CheckIn', () => {

  test('Should create CheckIn', async () => {
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckIn
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.id).to.be.gt(0);
    expect(responseBody.id_route).to.be.equal(requestCheckIn.checkinout.id_route);
    expect(responseBody.type).to.be.equal(requestCheckIn.checkinout.type);
    expect(responseBody.is_load).to.be.equal(requestCheckIn.checkinout.is_load);
  });

  test('Should create CheckOut', async () => {
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody.id_route).to.be.equal(requestCheckOut.checkinout.id_route);
    expect(responseBody.type).to.be.equal(requestCheckOut.checkinout.type);
    expect(responseBody.is_load).to.be.equal(requestCheckOut.checkinout.is_load);
  });

  test('Should fail to create CheckIn with no Route', async () => {
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckIn
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('There is an available route for checkin');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create CheckOut with no Route', async () => {
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('There is an available route for checkin');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create CheckOut if Coordinates invald', async () => {
    const requestCheckOut = {
      "checkinout": {
        "coordinates": "AAA",
        "id_route": 1,
        "type": "IN",
        "is_load": true
      }
    }
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('instance.coordinates does not conform to the \"coordinates\" format');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create CheckOut if Coordinates empty', async () => {
    const requestCheckOut = {
      "checkinout": {
        "id_route": 1,
        "type": "IN",
        "is_load": true
      }
    }
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('instance requires property \"coordinates\"');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create CheckOut if id_route empty', async () => {
    const requestCheckOut = {
      "checkinout": {
        "coordinates": "51.498134, 48.00033",
        "type": "IN",
        "is_load": true
      }
    }
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('instance requires property \"id_route\"');
    expect(responseBody.error.status).to.be.equal(400);
  });


  test('Should fail to create CheckOut if type out of range', async () => {
    const requestCheckOut = {
      "checkinout": {
        "coordinates": "51.498134, 48.00033",
        "id_route": 1,
        "type": "AA",
        "is_load": true
      }
    }
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckOut
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('instance.type is not one of enum values: IN,OUT');
    expect(responseBody.error.status).to.be.equal(400);
  });

  test('Should fail to create CheckOut if checkinout empty', async () => {
    const requestCheckIn = {
      "checkinout": {}
    };
    const response = await http('PUT', `${BASE_PATH}/routes/checkinout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      json: requestCheckIn
    });
    const responseBody = JSON.parse(response.body.toString());
    expect(responseBody).to.have.property('error');
    expect(responseBody.error.message).to.be.contains('Checkinout object not informed');
    expect(responseBody.error.status).to.be.equal(400);
  });
});