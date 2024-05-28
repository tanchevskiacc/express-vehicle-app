const request = require('supertest');
const app = require('../../../bootstrap/app');
const { 
    createFakeUserPayload,
    generateFakeTokenFrom,
    generateInvalidUserAuthToken,
    generateInvalidAdminAuthToken
} = require('../../../utils/tests/helpers');

describe('Auth middleware', () => {
    let token;

    beforeEach(() => {
        const payload = createFakeUserPayload();
        token = generateFakeTokenFrom(payload);
    });

    const getProfile = () => {
        const req = request(app);
        return req.get('/api/users/me')
            .set('x-auth-token', token);
    }

    it('Should return 401 if token is missing', async () => {
        token = '';
        const res = await getProfile();
        expect(res.status).toBe(401)
    });

    it('Should return 403 if req._id does not exist in the request object for user', async () => {
        token = generateInvalidUserAuthToken();
        const res = await getProfile();
        expect(res.status).toBe(403)
    });

    it('Should return 403 if req._id does not exist in the request object for admin', async () => {
        token = generateInvalidAdminAuthToken();
        const res = await getProfile();
        expect(res.status).toBe(403)
    });

    it('Should return 400 if token is invalid', async () => {
        token = 'x';
        const res = await getProfile();
        expect(res.status).toBe(400)
    });

    it('Should return 200 if token is valid', async () => {
        const res = await getProfile();
        expect(res.status).toBe(200)
    });
})