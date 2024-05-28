
const request = require('supertest');
const app = require('../../../bootstrap/app');
const { User } = require('../../../app/models/user');

describe('Route GET /api/auth ', () => {
    let payload;

    beforeEach(async () => {
        payload = { email: 'test@mail.com', password: '12345' };
    });
    
    afterAll(async () => {
        await User.deleteMany();
    })

    const getToken = () => {
        return request(app)
            .post('/api/auth')
            .send(payload)
    }

    it('Should return the access token if user is valid', async () => {
        const newPayload = { name: 'Test user', email: payload.email, password: payload.password };
        const user = new User(newPayload);
        await user.save();
        const res = await getToken();
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body.accessToken).not.toBeUndefined();
    });

    it('Should return 400 if request body is invalid', async () => {
        delete payload.password;
        const res = await getToken();
        expect(res.status).toBe(400);
    });

    it('Should return 400 if user password is incorrect', async () => {
        payload = { email: payload.email, password: '123456' };
        const res = await getToken();
        expect(res.status).toBe(400);
    });

    it('Should return 400 if user does not exist', async () => {
        payload = { email: 'fake@mail.com', password: '12345' };
        const res = await getToken();
        expect(res.status).toBe(400);
    });
})