const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test("It should respond with 200 success", async () => {
    await request(app)
    .get('/launches')
    .expect('Content-Type', /json/)
    .expect(200);
  })
})

describe('Test POST /launch', () => {
  const launchData = {
    mission: "mission1",
    rocket: "rocket1",
    target: "target1",
    launchDate: 'January 1, 2028',
  }

  const launchDataWithoutDate = {
    mission: "mission1",
    rocket: "rocket1",
    target: "target1",
  }
  const launchDataWithInvalidDate = {
    mission: "mission1",
    rocket: "rocket1",
    target: "target1",
    launchDate: 'hello',
  }

  test("It should respond with 201 success", async () => {
    const response = await request(app)
    .post('/launches')
    .send(launchData)
    .expect('Content-Type', /json/)
    .expect(201);
  
    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate)
  })
  test("It should catch missing require properties", async () => {
    const response = await request(app)
    .post('/launches')
    .send(launchDataWithoutDate)
    .expect('Content-Type', /json/)
    .expect(400);
    expect(response.body).toStrictEqual({
      error: 'Missing required launch propery'
    })
  })
  test("It should catch invalid dates", async () => {
    const response = await request(app)
    .post('/launches')
    .send(launchDataWithInvalidDate)
    .expect('Content-Type', /json/)
    .expect(400);
    expect(response.body).toStrictEqual({
      error: 'Invalid launch date'
    })
  })
})

