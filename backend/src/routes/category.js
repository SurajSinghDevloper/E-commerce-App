const express = require('express');
const router = express.Router();
const { addCategory, getCategory } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware/Index');

router.post('/category/addCategory', requireSignin, adminMiddleware, addCategory);
router.get('/category/getCategory', getCategory);

module.exports = router;
