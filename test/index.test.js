const request = require('supertest');
const nock = require('nock');
const server = require('../src/index');
const { users, user } = require('./mocks/users/users.model.mock')
describe('TEST ENDPOINTS', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('[GET]', async(done) => {
        const response = await request(server).get('/users');
        expect(response.body.ok).toBeTruthy();
        done();
    });

    it('[POST]', async(done) => {
        const res = await request(server).post('/users').send({
            name: 'test',
            lastName: 'testlast'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.ok).toBeTruthy();
        expect(res.body.user.lastName).toEqual('testlast');
        done();
    });


    it('[GET] apitest return mock data', async() => {

        nock("https://jsonplaceholder.typicode.com")
            .get('/todos/1')
            .reply(200, {
                "userId": 100,
                "id": 100,
                "title": "test response",
                "completed": true
            });
        const res = await request(server).get('/apitest')
        expect(res.statusCode).toEqual(200);
        expect(res.body.ok).toBeTruthy();
    });


})
afterAll(async done => {
    server.close();
    done();
});