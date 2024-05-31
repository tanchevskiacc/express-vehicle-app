const Logger = require('../../lib/logger');
const CustomError = require('../../utils/CustomError');

/**
 * 
 * @param {Object} err error object
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next calling the next() middleware function
 * @returns 
 */
module.exports = function (err, req, res, next) {
    Logger.error(err.message, err);
    res.status(500).send(new CustomError(500, 'Something went wrong. Please, come back later'));
}