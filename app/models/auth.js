const Joi = require('joi');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {Object} body request body 
 * @returns 
 */
function check(body) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(body);
}

/**
 * 
 * @param {String} token encoded token 
 * @returns {Object} payload
 */
function decodeJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports.check = check;
module.exports.decodeJwt = decodeJwt;
