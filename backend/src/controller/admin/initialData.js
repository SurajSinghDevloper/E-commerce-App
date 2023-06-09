const category = require("../../models/category");
const Product = require("../../models/product");


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
                children: children
            };

            // Add the category object to the categoryList
            categoryList.push(categoryObject);
        }
    }

    // Return the generated categoryList
    return categoryList;
}


exports.initialData = async (req, res) => {
    const categories = await category.find({}).exec();
    const product = await Product.find({})
        .select('_id name price quantity slug category description productPicture')
        .exec();

    res.status(200).json({
        categories: createCategoryList(categories),
        product
    });
}