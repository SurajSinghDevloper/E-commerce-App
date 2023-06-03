const Product = require('../models/product');
const shortid = require('shortid')
const slugify = require('slugify')




// exports.addProduct = async (req, res) => {
//     // res.status(200).json({ file: req.files, body: req.body });

//     const { name, price, description, category, createdBy } = req.body
//     let productPicture = [];

//     if (req.files.length > 0) {
//         productPicture = req.files.map(file => {
//             return { img: file.filename }
//         });
//     }

//     const product = new Product({
//         name: name,
//         slug: slugify(name),
//         price,
//         description,
//         productPicture,
//         category,
//         createdBy: req.user._id
//     })
//     await product.save().exec((error, product) => {
//         if (error) return res.status(400).json({ error });
//         if (product) {
//             res.status(201).json({ product })
//         }
//     })
// }

exports.addProduct = async (req, res) => {
    const { name, price, description, category, createdBy, quantity } = req.body;
    let productPicture = [];

    if (req.files.length > 0) {
        productPicture = req.files.map(file => {
            return { img: file.filename };
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPicture,
        category,
        quantity,
        createdBy: req.user._id
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json({ product: savedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

