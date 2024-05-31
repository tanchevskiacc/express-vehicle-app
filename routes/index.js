const AuthApi = require('./api/authApi');
const UserApi = require('./api/userApi');
const VehicleApi = require('./api/vehicleApi');
const auth = require('../app/middleware/auth');
const error = require('../app/middleware/error');

module.exports = (app) => {
    app.use('/api/auth', new AuthApi());

    // Protect all routes after this middleware
    app.use(auth);
    app.use('/api/users', new UserApi());
    app.use('/api/vehicles', new VehicleApi());

    app.use(error);
};
