const Page = require('../../models/page')
// exports.createPage = async (req, res) => {
//     const { banners, products } = req.files;

//     if (banners.length > 0) {
//         req.body.banners = banners.map((banner, index) => ({
//             img: `${process.env.API}/public/${banner.filename}`,
//             navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
//         }));
//     }

//     if (products.length > 0) {
//         req.body.products = products.map((product, index) => ({
//             img: `${process.env.API}/public/${product.filename}`,
//             navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
//         }));
//     }
//     req.body.createdBy = req.user._id;
//     const foundPage = await Page.findOne({ category: req.body.category }).exec()
//     if (foundPage) {
//         const updatedPage = Page.findOneAndUpdate({ category: req.body.category }, req.body).exec()
//         if (updatedPage) {
//             return res.status(201).json({ foundPage: updatedPage })
//         }
//     } else {
//         page = new Page(req.body)
//         // Check if required fields are present in the request body
//         if (!req.body.category || !req.body.description) {
//             return res.status(400).json({ error: 'Category and description are required fields' });
//         }
//         const savedPage = page.save();
//         if (savedPage) {
//             return res.status(200).json({ savedPage });
//         } else {
//             return res.status(400).json({ error: req.data.error });
//         }
//     }


// }
exports.createPage = async (req, res) => {
    const { banners, products } = req.files;
    req.body.createdBy = req.user._id;

    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }

    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }

    try {
        const pages = await Page.findOne({ category: req.body.category }).exec();
        if (pages) {
            const updatedPage = await Page.findOneAndUpdate({ category: req.body.category }, req.body).exec();
            if (updatedPage) {
                return res.status(201).json({ pages: updatedPage });
            }
        } else {
            // Check if required fields are present in the request body
            if (!req.body.category || !req.body.description) {
                return res.status(400).json({ error: 'Category and description are required fields' });
            }

            const pages = new Page(req.body);
            const savedPage = await pages.save();
            if (pages) {
                return res.status(200).json({ pages: savedPage });
            } else {
                return res.status(400).json({ error: req.data.error });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPage = async (req, res) => {
    const { category, type } = req.params;
    if (type === 'page') {
        try {
            const pages = await Page.findOne({ category: category }).exec();
            if (pages) {
                res.status(200).json({ pages });
            } else {
                res.status(400).json({ error });
            }
        } catch (error) {
            console.log("👉👉 ~~ file: page.js:96 ~~ exports.getPage= ~~ error:", error)
            res.status(400).json({ error });
        }
    }
}