const _ = require('lodash');
const BaseController = require('./BaseController');
const CustomError = require('../../utils/CustomError');
const { User, validate, validateOnUpdate, fillable } = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

class UserController extends BaseController {

    constructor() {
        super(User, validate, fillable);
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async me(req, res) {
        if (!req.user || !req.user._id) return res.status(403).send(new CustomError(403, 'Access denied'));
        const user = await User.findById(req.user._id);
        return res.send(user);
    }

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async store(req, res) {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send(new CustomError(400, error.details[0].message));
        }
        
        const user = await User.findOne({ email: req.body.email});

        if (user) {
            return res.status(400).send(new CustomError(400, 'User already exist'));
        }
 
        try {
            let user = new User(_.pick(req.body, fillable));
            let result = await user.save();
            res.status(201).send(_.omit(result.toObject(), 'password'));
        } catch (ex) {
            // @TODO logging the error
            res.status(400).send(new CustomError('none', 'Error while trying to create new user. Please, contact your administrator!'));
        }
    }

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async update(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(new CustomError(400, 'Invalid ID'))
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send(new CustomError(404, 'The user with the given ID was not found'));
        }

        if (req.body.email && req.body.email !== user.email) {
            return res.status(400).send(new CustomError(404, 'E-mail is not able for change'))
        }

        const { error } = validateOnUpdate(req.body);

        if (error) {
            return res.status(400).send(new CustomError(404, error.details[0].message))
        }

        user.set(req.body);

        res.send(await user.save());
    }
}

module.exports = UserController;
