
const _ = require('lodash');
const { decodeJwt } = require('../models/auth');
const CustomError = require('../../utils/CustomError');

/**
 * Checking for valid x-auth-token value in the header
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next calling the next() middleware function
 * @returns 
 */
module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).send(new CustomError(401, 'Access token missing.'))
    }

    try {
        var decoded = decodeJwt(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send(new CustomError(400, 'Invalid access token'));
    }
}
