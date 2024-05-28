const request = require('supertest');
const app = require('../../../bootstrap/app');
const { 
    createFakeUserPayload,
    createFakeAdminPayload,
    generateFakeTokenFrom,
} = require('../../../utils/tests/helpers');

describe('Restrict middleware', () => {
    let token;

    beforeEach(() => {
        const payload = createFakeUserPayload();
        token = generateFakeTokenFrom(payload);
    });

    const getUsers = () => {
        return request(app).get('/api/users')
            .set('x-auth-token', token);
    }

    it('Should return 405 if the user is not allowed to access the route', async () => {
        const res = await getUsers();
        expect(res.status).toBe(405)
    });

    it('Should return 200 if the user is allowed to access the route', async () => {
        const payload = createFakeAdminPayload();
        token = generateFakeTokenFrom(payload);
        const res = await getUsers();
        expect(res.status).toBe(200);
    });
})