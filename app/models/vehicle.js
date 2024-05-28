const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Fillable 
 */
const fillable = ['make', 'model', 'year', 'vin', 'type', 'eco', 'gearbox', 'fuel', 'seats', 'extras'];

/**
 * Model
 * using build-in mongoose validation
 */
const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
    make: String,
    model: String,
    year: String,
    type: {
        type: String,
        enum: ['car', 'bus', 'microbus']
    },
    eco: {
        type: String,
        enum: ['Euro 02', 'Euro 03', 'Euro 04', 'Euro 05', 'Euro 06']
    },
    gearbox: {
        type: String,
        enum: ['auto', 'semi-auto', 'manual']
    },
    fuel: {
        type: String,
        enum: ['diesel', 'petrol', 'gas']
    },
    vin: {
        type: String,
        required: true,
        minlength: 17,
        maxlength: 17,
        unique: true
    },
    seats: Number,
    extras: [ String ],
    isPublished: {
        type: Boolean,
        default: true
    },
    __v: {
        type: Number,
        select: false
    }
}));

/**
 * An additional client validation
 * 
 * @param {object} body vehicle body object 
 */
function validate(body) {
    const schema = Joi.object({
        make: Joi.string().required(),
        model: Joi.string().optional(),
        year: Joi.string().optional(),
        vin: Joi.string().min(17).max(17).required(),
        type: Joi.string().valid('car', 'bus', 'microbus').optional(),
        eco: Joi.string().valid('Euro 02', 'Euro 03', 'Euro 04', 'Euro 05', 'Euro 06').optional(),
        gearbox: Joi.string().valid('auto', 'semi-auto', 'manual').optional(),
        fuel: Joi.string().valid('diesel', 'petrol', 'gas').optional(),
        seats: Joi.number().optional(),
        extras: Joi.array().optional()
    });

    return schema.validate(body);
}

/**
 * An additional client validation
 * 
 * @param {object} body vehicle body object 
 */
function validateOnUpdate(body) {
    const schema = Joi.object({
        make: Joi.string().optional(),
        model: Joi.string().optional(),
        year: Joi.string().optional(),
        vin: Joi.string().min(17).max(17).optional(),
        type: Joi.string().valid('car', 'bus', 'microbus').optional(),
        eco: Joi.string().valid('Euro 02', 'Euro 03', 'Euro 04', 'Euro 05', 'Euro 06').optional(),
        gearbox: Joi.string().valid('auto', 'semi-auto', 'manual').optional(),
        fuel: Joi.string().valid('diesel', 'petrol', 'gas').optional(),
        seats: Joi.number().optional(),
        extras: Joi.array().optional()
    });

    return schema.validate(body);
}

module.exports.Vehicle = Vehicle;
module.exports.fillable = fillable;
module.exports.validate = validate;
module.exports.validateOnUpdate = validateOnUpdate;