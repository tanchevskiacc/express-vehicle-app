const ApiBase = require('./baseApi');
const AuthController = require('../../app/controllers/AuthController');

class AuthApi extends ApiBase {
    constructor() {
        super();

        const { getToken } = new AuthController();

        this.router.post('/', getToken);

        return this.router;
    }
}

module.exports = AuthApi;
