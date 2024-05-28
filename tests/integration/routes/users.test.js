
const request = require('supertest');
const app = require('../../../bootstrap/app');
const { User } = require('../../../app/models/user');
const { 
    createFakeAdminPayload,
    generateFakeTokenFrom,
    generateRandomId
} = require('../../../utils/tests/helpers');

describe('route: /api/users', () => {
    const endpoint = '/api/users/';

    afterAll(async () => {
        await User.deleteMany();
    });

    let token;
    let payload;

    beforeEach(() => {
        token = generateFakeTokenFrom(createFakeAdminPayload());
        payload = { name: 'New user', email: 'new@mail.com', password: '12345' };
    });

    const post = async () => {
        return await request(app)
        .post(endpoint)
        .set('x-auth-token', token)
        .send(payload)
    }

    describe('CREATE', () => {
        it('Should return the created users if it is valid', async () => {
            await post();
            const user = await User.find({ email: payload.email });
            expect(user).not.toBeNull();
        });

        it('Should return 400 if req.body is not valid', async () => {
            payload.name = '';
            const res = await post();
            expect(res.status).toBe(400);
        });

        it('Should return 400 if the user already exists', async () => {
            payload.name = 'New user';
            payload.email = 'exist@mail.com';

            const user = new User(payload);
            await user.save();
    
            const res = await post();

            expect(res.status).toBe(400);
        });
    });

    const update = async (id) => {
        return await request(app)
        .put(endpoint + id)
        .set('x-auth-token', token)
        .send(payload)
    }

    describe('UPDATE', () => {
        describe('/api/users/:id', () => {

            it('Should return 400 for invalid user id', async () => {
                payload = {};
                const res = await update(1);
                expect(res.status).toBe(400);
            });

            it('Should return 404 if user not found in the database', async () => {
                payload = {};
                const res = await update(generateRandomId());
                expect(res.status).toBe(404);
            });

            it('Should return 400 if trying to change the email', async () => {
                const user = await User.findOne({ email: payload.email });
                payload = { email: 'different@mail.com' };
                const res = await update(user._id);
                expect(res.status).toBe(400);
            });

            it ('Should return 400 if req.body is invalid', async () => {
                const user = await User.findOne({ email: payload.email });
                payload.name = 'Te';
                const res = await update(user._id);
                expect(res.status).toBe(400);
            });

            it ('Should return 200 if user is updated', async () => {
                const user = await User.findOne({ email: payload.email });
                payload.name = 'Test';
                const res = await update(user._id);
                expect(res.status).toBe(200);
            });
        });
    });

    const get = async (id) => {
        return await request(app)
        .get(endpoint + id)
        .set('x-auth-token', token)
    }

    describe('GET', () => {
        describe('all users: /api/users', () => {
            it('Should return 200 if response is not empty', async () => {
                const res = await get('');
                expect(res.body).toHaveLength(2);
            });
        })

        describe('single user: /api/users/:id', () => {
            it('Should return 400 for invalid user', async () => {
                const res = await get('1');
                expect(res.status).toBe(400);
            });

            it('Should return 404 if user not found in the database', async () => {
                const res = await get(generateRandomId());
                expect(res.status).toBe(404);
            });

            it('Should return 200 if user exist', async () => {
                const user = await User.findOne({ email: payload.email });
                const res = await get(user._id);
                expect(res.status).toBe(200);
            });
        });
    });

    const destroy = async (id) => {
        return await request(app)
        .delete(endpoint + id)
        .set('x-auth-token', token)
    }

    describe('DELETE', () => {
        describe('/api/users/:id', () => {
            it('Should return 400 for invalid user id', async () => {
                const res = await destroy('1');
                expect(res.status).toBe(400);
            });

            it('Should return 204 if user is already deleted', async () => {
                const res = await destroy(generateRandomId());
                expect(res.status).toBe(204);
            });

            it('Should return 200 if user is now deleted', async () => {
                const user = await User.findOne({ email: payload.email });
                const res = await destroy(user._id);
                expect(res.status).toBe(200);
            });
        });
    });
});