const Product = require("../../models/products");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});
    for (const item of products) {
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
      }
    // console.log(products);
    
    res.render("client/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const find = {
        deleted: false,
        slug: slug,
        status: "active",
    }

    const product = await Product.findOne(find);

    res.render("client/pages/product/detail", {
        pageTitle: product.title,
        product: product
    })
}