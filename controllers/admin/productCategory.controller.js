const ProductCategory = require("../../models/productsCategory");
const systemConfig = require("../../configs/system");
const treeHelpers = require("../../helpers/tree");

//[GET] /admin/productsCategory
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    })

    const newRecords = treeHelpers.tree(records);

    res.render("admin/pages/product-category/index", {
        newRecords: newRecords,
        pageTitle: "Danh mục sản phẩm"
    })
}

//[GET] /admin/productsCategory/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    });
    const newRecords = treeHelpers.tree(records);
    // console.log(newRecords);
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo mới danh mục sản phẩm",
        newRecords: newRecords
    })
}

//[POST] /admin/productsCategory/create
module.exports.createPost = async (req, res) => {
    if(req.body.position == ""){
        const countProduct = await ProductCategory.countDocuments();
        req.body.position = countProduct + 1;
      }
      else{
        req.body.position = parseInt(req.body.position);
    }

    const records = new ProductCategory(req.body);
    records.save();
    req.flash("success", "Thêm mới danh mục thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/productsCategory`);
}
