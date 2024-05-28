
const user = require('../../../app/models/user');

describe('Schema', () => {
    it('Schema check should success', async () => {
        const { error } = await user.validate({
            name: 'test',
            email: 'test@mail.com',
            password: '12345'
        });

        expect(error).toBeUndefined();
    });

    it('Schema check should fail with an invalid name', async () => {
        const { error } = await user.validate({
            name: 't',
            email: 'test@mail.com',
            password: '12345'
        });

        expect(error).toBeInstanceOf(Error);
    });
});
