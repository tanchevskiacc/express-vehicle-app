/*
|--------------------------------------------------------------------------
| Helper functions for testing purposes only
|--------------------------------------------------------------------------
|
| Use this helpers in scope of integration/unit tests only
| and all test helpers related stuffs should live here
|
*/

const mongoose = require('mongoose');
const { User } = require('../../app/models/user');

/**
 * 
 * @returns {Object}
 */
function createFakeUserPayload() {
    return { _id: new mongoose.Types.ObjectId().toHexString(), role: 'user' };
}


/**
 * 
 * @returns {Object}
 */
function createFakeAdminPayload() {
    return { _id: new mongoose.Types.ObjectId().toHexString(), role: 'admin' };
}

/**
 * 
 * @returns {String} role based user token
 */
function generateFakeTokenFrom(payload) {
    const user = new User(payload);
    return user.generateAuthToken();
}

/**
 * 
 * @returns {String} role based user token
 */
function generateInvalidUserAuthToken() {
    const payload = { id: new mongoose.Types.ObjectId().toHexString(), role: 'invalid_user' };
    const user = new User(payload);
    return user.generateInvalidAuthToken();
}

/**
 * 
 * @returns {String} role based user token
 */
function generateInvalidAdminAuthToken() {
    const payload = { id: new mongoose.Types.ObjectId().toHexString(), role: 'invalid_admin' };
    const user = new User(payload);
    return user.generateInvalidAuthToken();
}

/**
 * 
 * @returns {String} object id
 */
function generateRandomId() {
    return new mongoose.Types.ObjectId().toHexString();
}

module.exports.createFakeUserPayload = createFakeUserPayload;
module.exports.createFakeAdminPayload = createFakeAdminPayload;
module.exports.generateFakeTokenFrom = generateFakeTokenFrom;
module.exports.generateInvalidUserAuthToken = generateInvalidUserAuthToken;
module.exports.generateInvalidAdminAuthToken = generateInvalidAdminAuthToken;
module.exports.generateRandomId = generateRandomId;