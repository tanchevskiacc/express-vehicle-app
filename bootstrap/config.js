const { resolve } = require('path');

/**
 * Loading env variables
 */
require('dotenv').config({ path: resolve(__dirname, '../.env') });

module.exports = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('FATAR ERROR: jwtPrivateKey is not defined');
    }
}
