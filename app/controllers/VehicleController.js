const { _ } = require('lodash');
const BaseController = require('./BaseController');
const CustomError = require('../../utils/CustomError');
const { Vehicle, validate, validateOnUpdate, fillable } = require('../models/vehicle');
const ObjectId = require('mongoose').Types.ObjectId;

class VehicleController extends BaseController {

    constructor() {
        super(Vehicle, validate, fillable);
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
    async store(req, res) {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send(new CustomError(400, error.details[0].message));
        }

        const vehicle = await Vehicle.findOne({ vin: req.body.vin });

        if (vehicle) {
            return res.status(400).send(new CustomError(400, 'VIN number already exists'));
        }

        try {
            let result = new Vehicle(_.pick(req.body, fillable));
            res.status(201).send(await result.save());
        } catch (ex) {
            res.status(400).send(new CustomError())
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

        let vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            res.status(404).send(new CustomError(404, 'The vehicle with the given ID was not found'));
            return;
        }

        if (req.body.vin) {
            const vin = await Vehicle.findOne({ vin: req.body.vin });
            if (vin) return res.status(400).send(new CustomError(400, `Vehicle with VIN ${req.body.vin} already exist`));
        }

        const { error } = validateOnUpdate(req.body);

        if (error) {
            return res.status(400).send(new CustomError(400, error.details[0].message))
        }

        vehicle.set(req.body);

        res.send(await vehicle.save());
    }
}

module.exports = VehicleController;
