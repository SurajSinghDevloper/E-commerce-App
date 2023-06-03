const express = require('express');
const router = express.Router();
const { addCart } = require('../controller/cart');
const { requireSignin, userMiddleware } = require('../common-middleware/Index');

router.post('/user/cart/add-to-Cart', requireSignin, userMiddleware, addCart);
// router.get('/user/cart/getCart', getCart);

module.exports = router;
