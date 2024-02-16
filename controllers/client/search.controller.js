const Product = require("../../models/products");
const priceNew = require("../../helpers/newPrice");

module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    let products = [];

    if(keyword){
        const keywordRegEXP = new RegExp(keyword, "i");
        products = await Product.find({
            title: keywordRegEXP,
            deleted: false,
            status: "active"
        })

        priceNew.newPrice(products);

        // console.log(products);
    }
    res.render("client/pages/search/index", {
        products: products,
        pageTitle: keyword,
        keyword: keyword
    });
}