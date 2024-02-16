const Product = require("../../models/products");
const newPrice = require("../../helpers/newPrice");

module.exports.index = async (req, res) => {
    const featuredProducts = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    })

    newPrice.newPrice(featuredProducts);

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        featuredProducts: featuredProducts
    });
}