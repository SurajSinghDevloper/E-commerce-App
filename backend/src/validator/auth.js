const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
    check('email')
        .notEmpty()
        .withMessage('Valid Email Is Required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character')
]

exports.validateSignInRequest = [
    check('email')
        .notEmpty()
        .withMessage('Valid Email Is Required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Valid Password Is Required')
]


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}