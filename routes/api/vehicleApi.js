const ApiBase = require('./baseApi');
const VehicleController = require('../../app/controllers/VehicleController');
const restrictTo = require('../../app/middleware/restrictTo');

class VehicleApi extends ApiBase {
    constructor() {
        super();

        const {
            index,
            show,
            store,
            destroy,
            update
        } = new VehicleController();

        this.router.get('/', index);
        this.router.get('/:id', show);

        // Protect all routes after this middleware
        this.router.use(restrictTo('admin'));

        this.router.post('/', store);
        this.router.delete('/:id', destroy);
        this.router.put('/:id', update);

        return this.router;
    }
}

module.exports = VehicleApi;