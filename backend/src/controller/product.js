const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

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



exports.getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        // Find the category by slug and select only the _id field
        const category = await Category.findOne({ slug }).select('_id').exec();

        // If category is not found, return a 404 error
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // If category is found
        if (category) {
            // Find products that belong to the category
            const products = await Product.find({ category: category._id }).exec();

            // If there was an error while querying the products
            if (!products) {
                return res.status(404).json({ error: 'Something went wrong' });
            }

            // If there are matching products
            if (products.length > 0) {
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                        under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                        under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                        under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                        moreThan30k: products.filter(product => product.price > 30000)
                    }
                });
            } else {
                // If no matching products were found
                res.status(200).json({ message: "Matching products not found" });
            }
        }
    } catch (error) {
        // If an error occurs during execution
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Extract the necessary data from the request body
        const { name, price, description, category, quantity } = req.body;
        let productPicture = [];

        if (req.files && req.files.length > 0) {
            // If there are files in the request, map them to create the productPicture array
            productPicture = req.files.map((file) => {
                return { img: file.filename };
            });
        }

        // Find the product by productId and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                description,
                productPicture,
                category,
                quantity,
            },
            { new: true } // Return the updated product after the update
        );

        // If the product is not found, return a 404 error
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return a success response with the updated product
        res.status(200).json({ product: updatedProduct });
    } catch (error) {
        // Return an error response if there's an error during the process
        res.status(400).json({ message: error.message });
    }
};
