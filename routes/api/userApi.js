const ApiBase = require('./baseApi');
const UserController = require('../../app/controllers/UserController');
const restrictTo = require('../../app/middleware/restrictTo');

class UserApi extends ApiBase {
    constructor() {
        super();

        const {
            index,
            me,
            show,
            store,
            destroy,
            update,
        } = new UserController();

        this.router.get('/me', me);

        // Protect all routes after this middleware
        this.router.use(restrictTo('admin'));

        this.router.get('/', index);
        this.router.get('/:id', show);
        this.router.post('/', store);
        this.router.put('/:id', update);
        this.router.delete('/:id', destroy);

        return this.router;
    }
}

module.exports = UserApi;