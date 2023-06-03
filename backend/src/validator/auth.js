const { check, validationResult } = require('express-validator');

// Middleware to validate the signup request
exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
    check('email')
        .notEmpty()
        .withMessage('Valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
];

// Middleware to validate the signin request
exports.validateSignInRequest = [
    check('email')
        .notEmpty()
        .withMessage('Valid email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Valid password is required')
];

// Middleware to check if the request has been validated
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};
