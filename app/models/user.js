const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Fillable 
 */
const fillable = ['name', 'email', 'password'];

/**
 * Schema
 * using build-in mongoose validation
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true,
        immutable: true // not allowing you to modify this value
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024, // for hashed string
        select: false // exclude this field from the model by default
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    __v: {
        type: Number,
        select: false
    }
});

// pre-hook
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Additional methods
userSchema.methods.passwordVerify = async function (actual) {
    return await bcrypt.compare(actual, this.password);
};
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
userSchema.methods.generateInvalidAuthToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

/**
 * An additional client validation
 * 
 * @param {object} body user body object 
 */
function validate(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(5).max(255).required() // 255 for plain text
    });

    return schema.validate(body);
}

/**
 * An additional client validation
 * 
 * @param {object} body user body object 
 */
function validateOnUpdate(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        email: Joi.string().min(6).max(255).optional().email(),
        password: Joi.string().min(5).max(255).optional() // 255 for plain text
    });

    return schema.validate(body);
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.fillable = fillable;
module.exports.validate = validate;
module.exports.validateOnUpdate = validateOnUpdate;
