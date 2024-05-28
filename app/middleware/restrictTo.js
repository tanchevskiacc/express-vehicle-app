
const CustomError = require('../../utils/CustomError');

/**
 * Role-based route restriction
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next calling the next() middleware function
 * @returns 
 */
module.exports = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(405).send(new CustomError(405, 'You do not have permissions to access this route'));
        }
        next();
    }
}