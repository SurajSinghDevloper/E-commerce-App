const Page = require('../../models/page')
exports.createPage = async (req, res) => {
    const { banners, products } = req.files;

    if (banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }

    if (products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }
    req.body.createdBy = req.user._id;
    page = new Page(req.body)
    // Check if required fields are present in the request body
    // if (!req.body.category || !req.body.description) {
    //     return res.status(400).json({ error: 'Category and description are required fields' });
    // }
    const savedPage = page.save();
    if (savedPage) {
        return res.status(200).json({ savedPage });
    } else {
        return res.status(400).json({ error: req.data.error });
    }


    // res.status(200).json({ body: req.body });
}
/**
 *     try {
        const page = new Page(req.body);
        const savedPage = await page.save();
        console.log("👉👉 ~~ file: page.js:27 ~~ exports.createPage= ~~ savedPage:", savedPage)
        if (savedPage) {
            return res.status(200).json({ page: savedPage });
        } else {
            return res.status(400).json({ error: req.body.error });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
 */