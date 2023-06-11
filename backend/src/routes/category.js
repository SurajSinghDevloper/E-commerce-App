const express = require('express');
const router = express.Router();
const { addCategory, getCategory, updateCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware/Index');
const multer = require('multer')
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


router.post('/category/addCategory', requireSignin, adminMiddleware, upload.single('categoryImg'), addCategory);
router.get('/category/getCategory', getCategory);
router.post('/category/updateCategory', upload.array('categoryImg'), updateCategories);

module.exports = router;
