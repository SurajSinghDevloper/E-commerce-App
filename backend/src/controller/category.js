const slugify = require('slugify');
const Category = require('../models/category');

//adding category to collection
exports.addCategory = async (req, res) => {
    const categoryObject = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };
    if (req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    }

    try {
        const category = new Category(categoryObject);
        await category.save();
        return res.status(201).json({ category });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}


//fetching category along children
exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.find({}).exec();
        console.log("🚀 ~ file: category.js:119 ~ exports.getCategory= ~ categories:", categories);
        if (categories.length > 0) {
            const categoryList = createCategoryList(categories);
            console.log("🚀 ~ file: category.js:122 ~ exports.getCategory= ~ categoryList:", categoryList);
            return res.status(200).json({ categoryList });
        }
        return res.status(200).json({ categoryList: [] });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//creating category children
function createCategoryList(categories, parentId = null) {
    const categoryList = [];

    for (let category of categories) {
        if (category.parentId == parentId) {
            const children = createCategoryList(categories, category._id);

            categoryList.push({
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: children
            });
        }
    }

    return categoryList;
}















// exports.getCategory = async (req, res) => {
//     //getting only parent category
//     try {
//         const categories = await Category.find({}).exec();
//         console.log("🚀 ~ file: category.js:119 ~ exports.getCategory= ~ categories:", categories)
//         if (categories.length > 0) {
//             const categoryList = createCategoryList(categories);
//             console.log("🚀 ~ file: category.js:122 ~ exports.getCategory= ~ categoryList:", categoryList)
//             return res.status(200).json({ categoryList });
//         }
//         // return res.status(200).json({ categories });
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };
