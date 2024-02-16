const Product = require("../../models/products");
const ProductCategory = require("../../models/productsCategory");
const newPrice = require("../../helpers/newPrice");
const subHelper = require("../../helpers/subs");

// /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});

    newPrice.newPrice(products);

    const productCategory = await ProductCategory.find({
        deleted: false,
        status: "active"
    })

    
    res.render("client/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
    });
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory  = req.params.slugCategory;

  const category = await ProductCategory.findOne({
    slug: slugCategory,
    status: "active",
    deleted: false
  });


  const allCategory = await subHelper(category.id);

  const allCategoryId = allCategory.map(item => item.id);

  const products = await Product.find({
    product_category_id: {
      $in : [
        category.id,
        ...allCategoryId
      ]
    },
    status: "active",
    deleted: false
  }).sort({ position: "desc" });

  // console.log(products);

  for (const item of products) {
    item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
  }

  res.render("client/pages/product/index", {
    category: category,
    pageTitle: category.title,
    products: products
  });
}

//[GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {

  const slug = req.params.slugProduct;

  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active"
  })

  product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);

  if(product.product_category_id){

    const category = ProductCategory.findOne({
      _id: product.product_category_id,
      deleted: false
    })

    product.category = category;
  }

  res.render("client/pages/product/detail", {
    pageTitle: product.title,
    product: product
  })
}