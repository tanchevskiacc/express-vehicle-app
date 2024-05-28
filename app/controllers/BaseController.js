const { _ } = require('lodash');
const CustomError = require('../../utils/CustomError');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * This acts as an abstract class which contains encapsulated logic
 * DO NOT instantiate this class anywhere
 */
class BaseController {
    constructor(Model, validate, fillable) {
        if (this.constructor == BaseController) {
            throw new Error('Cannot instantiate abstract class BaseController');
        };
        this.Model = Model;
        this.validate = validate;
        this.fillable = fillable;
        this.entity = _.toLower(this.Model.collection.modelName)
    }


    /**
     * Get all entities
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async index(req, res) {
        return res.send(await this.Model.find().select('-password'));
    }

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object
     */
    async show(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(new CustomError(400, 'Invalid ID'))
        }

        const result = await this.Model.findById(req.params.id).select('-password');

        if (!result) {
            return res.status(404).send(new CustomError(404, `The ${this.entity} with the given ID was not found`));
        }

        res.send(result);
    }

    /**
     * 
     * @param {Object} req request
     * @param {Object} res respons
     * @returns {Object} json object or 204
     */
    async destroy(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(new CustomError(400, 'Invalid ID'))
        }

        const result = await this.Model.findById(req.params.id);

        if (!result) {
            return res.status(204).send();
        }

        res.send(await this.Model.findByIdAndDelete(result._id));
    }
}

module.exports = BaseController;
