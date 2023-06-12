const slugify = require('slugify');
const Category = require('../models/category');
const shortId = require('shortid')
//adding category to collection

exports.addCategory = async (req, res) => {

    // Create a category object with name and slug
    const categoryObject = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortId.generate()}`
    };

    if (req.file) {
        categoryObject.categoryImg = process.env.API + '/public/' + req.file.filename;
    }

    // Check if parentId is provided in the request body
    if (req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    }

    try {
        // Create a new category instance with the categoryObject
        const category = new Category(categoryObject);

        // Save the category to the database
        await category.save();

        // Return the created category in the response
        return res.status(201).json({ category });
    } catch (error) {
        // Return an error response if there's an error during the process
        return res.status(400).json({ error: error });
    }
};



//fetching category along children
exports.getCategory = async (req, res) => {
    try {
        // Retrieve all categories from the database
        const categories = await Category.find({}).exec();
        if (categories.length > 0) {
            // If categories exist, create the category list
            const categoryList = createCategoryList(categories);
            // Return the category list in the response
            return res.status(200).json({ categoryList });
        }
        // If no categories found, return an empty category list
        return res.status(200).json({ categoryList: [] });
    } catch (error) {
        // Return an error response if there's an error during the process
        return res.status(400).json({ message: error.message });
    }
};


//creating category children
function createCategoryList(categories, parentId = null) {
    const categoryList = [];

    for (let category of categories) {
        if (category.parentId == parentId) {
            // If the category's parentId matches the provided parentId, it is a child category

            // Recursively call the createCategoryList function to generate the children of the current category
            const children = createCategoryList(categories, category._id);

            // Create an object representing the current category and its children
            const categoryObject = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: children
            };
            // Add the category object to the categoryList
            categoryList.push(categoryObject);
        }
    }

    // Return the generated categoryList
    return categoryList;
}

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updatedCategories: updatedCategories });
    } else {
        const category = {
            name,
            type
        };
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({ updatedCategory });
    }
}


exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
        deletedCategories.push(deleteCategory);
    }
    if (deletedCategories.length == ids.length) {
        res.status(200).json({ message: "Category Deleted Successfully" });
    } else {
        res.status(400).json({ message: "Opps! Something Went Wrong" });
    }
}
