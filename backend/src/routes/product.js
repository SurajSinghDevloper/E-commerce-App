const express = require('express');
const router = express.Router();
const multer = require('multer')
const { requireSignin, adminMiddleware } = require('../common-middleware/Index');
const { addProduct, getProductBySlug, updateProduct, getProductDetailsById } = require('../controller/product');
const shortid = require('shortid')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/addProduct', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);
router.get('/products/:slug', getProductBySlug);
router.get(`/product/:productsId`, getProductDetailsById)
router.post('/products/updateProduct', updateProduct);

module.exports = router;
