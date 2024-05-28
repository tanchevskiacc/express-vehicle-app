const auth = require('../../../app/middleware/auth');
const { createFakeUserPayload, generateFakeTokenFrom } = require('../../../utils/tests/helpers');

describe('Auth middleware', () => {
    it('Should have user object to be available in the request object', () => {
        const payload = createFakeUserPayload();
        const token = generateFakeTokenFrom(payload);
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {};
        const next = jest.fn();
        auth(req, res, next);

        expect(req.user).toMatchObject(payload);
    });
});