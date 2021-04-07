const request = require('supertest');
const nock = require('nock');
const server = require('../src/index');
const sinon = require('sinon');
const { connection } = require('../src/db')
const { users, user } = require('./mocks/users/users.model.mock')
describe('TEST ENDPOINTS', () => {
    let mysqlConnection;
    let mysqlMock;
    beforeEach(() => {
        jest.clearAllMocks();
        mysqlConnection = connection;
        mysqlMock = sinon.mock(mysqlConnection);
    });
    afterEach(function() {
        mysqlMock.restore()
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

    it('[GET] api test mysql', async(done) => {
        var results = [{
            "login_id": 1,
            "provider_name": "alamrsfake",
            "created_date": "2021-02-07T23:52:11.000Z",
            "modified_date": null,
            "enabled": 1
        }, {
            "login_id": 2,
            "provider_name": "repairsfake",
            "created_date": "2021-02-07T23:52:11.000Z",
            "modified_date": null,
            "enabled": 1
        }];
        mysqlMock.expects('query')
            .withArgs('select * from owner_provider')
            .callsArgWith(2, null, results);
        const response = await request(server).get('/owner_provider');
        console.log('========================')
        console.log(response.body)
        console.log('========================')
        expect(true).toBeTruthy();
        expect(response.statusCode).toEqual(200);
        done();
    });

    it('[POST] api test mysql', async(done) => {
        const rule_name = 'test rule name 4';
        const rule_description = 'test rule description 4'
        const notification_condition = { test: 'Test message 4' };
        const login_id = 2;
        const company = 'Verison Four';
        const results = {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "serverStatus": 2,
            "warningCount": 0,
            "message": "",
            "protocol41": true,
            "changedRows": 0
        }
        mysqlMock.expects('query').withArgs("insert into customer_condition (customer_condition_id,rule_name,rule_description,notification_condition,login_id,company) values (?,?,?,?,?,?);")
            .callsArgWith(2, null, results);
        const response = await request(server).post('/owner_provider').send({
            rule_name,
            rule_description,
            notification_condition,
            login_id,
            company
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body.ok).toBeTruthy();
        done();
    });


})
afterAll(async done => {
    /* server.close(); */
    done();
});