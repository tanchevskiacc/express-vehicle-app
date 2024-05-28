const _ = require('lodash');
const { check } = require('../models/auth');
const { User } = require('../models/user');
const CustomError = require('../../utils/CustomError');

class AuthController {

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async getToken(req, res) {
        const { error } = check(req.body);

        if (error) {
            return res.status(400).send(new CustomError(400, error.details[0].message));
        }

        let user = await User.findOne({ email: req.body.email }).select('+password');

        if (!user) {
            return res.status(400).send(new CustomError(400, `User with this email "${req.body.email}" does not exist`));
        }

        const passwordVerify = await user.passwordVerify(req.body.password);

        if (!passwordVerify) {
            return res.status(400).send(new CustomError(400, 'Invalid user password'));
        }

        const jwt = user.generateAuthToken();

        return res.json({
            status: 'success',
            user: _.omit(user.toObject(), 'password'),
            accessToken: jwt,
        });
    }
}


module.exports = AuthController