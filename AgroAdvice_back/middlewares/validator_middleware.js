const joi = require('joi');

exports.signupSchema = joi.object({
    fullName: joi.string().min(5).required(),
    email: joi.string().min(6).max(60).required().email({
        tlds: { allow: ['com', 'net', 'fr'] }
    }),
    password: joi.string().min(8).required()
});

exports.loginSchema = joi.object({
    email: joi.string().min(6).max(60).required().email({
        tlds: { allow: ['com', 'net', 'fr'] }
    }),
    password: joi.string().min(8).required()
});