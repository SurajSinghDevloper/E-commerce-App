const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSignInRequest } = require('../validator/auth');



router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSignInRequest, isRequestValidated, signin);


module.exports = router;