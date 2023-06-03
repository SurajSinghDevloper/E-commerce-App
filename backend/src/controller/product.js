const Product = require('../models/product');
const shortid = require('shortid')
const slugify = require('slugify')

exports.addProduct = async (req, res) => {
    // Extract the necessary data from the request body
    const { name, price, description, category, createdBy, quantity } = req.body;
    let productPicture = [];

    if (req.files.length > 0) {
        // If there are files in the request, map them to create the productPicture array
        productPicture = req.files.map(file => {
            return { img: file.filename };
        });
    }

    // Create a new Product instance with the extracted data
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
        // Save the product to the database
        const savedProduct = await product.save();

        // Return a success response with the saved product
        res.status(201).json({ product: savedProduct });
    } catch (error) {
        // Return an error response if there's an error during the process
        res.status(400).json({ message: error.message });
    }
};


