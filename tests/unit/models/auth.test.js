
const auth = require('../../../app/models/auth');

describe('Schema', () => {
    it('Schema check should success', async () => {
        const { error } = await auth.check({
            email: 'test@mail.com',
            password: '12345'
        });

        expect(error).toBeUndefined();
    });

    it('Schema check should fail with a wrong email', async () => {
        const { error } = await auth.check({
            email: 'test',
            password: '12345'
        });

        expect(error).toBeInstanceOf(Error);
    });
});
