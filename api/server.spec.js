function sum(...numbers) {
  // work to do...
  return numbers.reduce((acc, n) => acc + n);
}

const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('[GET] / WORKS!', () => request(server)
  // chain a lot of stuff
    .get('/')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect('Content-Length', '12')
    .then((res) => {
      expect(res.body).toEqual({ api: 'up' });
    }));

  it('[POST /api/auth/register] - should return 201 because request was successful', async () => {
    const expectedStatusCode = 201;

    const response = await request(server)
      .post('/hobbits')
      .send({ name: 'john' });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.message).toEqual('Hobbit created successfully');
  });

  it('[DELETE /hobbit/:id] - should return 201 because request was successful', async () => {
    const expectedStatusCode = 200;

    const response = await request(server).delete('/hobbits/2');
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.message).toEqual('Hobbit deleted successfully');
  });
});
