const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSignInRequest } = require('../../validator/auth');



router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);


module.exports = router;