const ProductCategory = require("../../models/productsCategory");
const systemConfig = require("../../configs/system");
const treeHelpers = require("../../helpers/tree");
const filterStatusHelpers = require("../../helpers/filterStatus");

//[GET] /admin/productsCategory
module.exports.index = async (req, res) => {

    // Filter status
    // console.log(req.query.status);

    const filterStatus = filterStatusHelpers(req.query);

    const find ={
        deleted : false,
    };

    if(req.query.status){
        find.status = req.query.status;
    }

    // Ed filter status
    const records = await ProductCategory.find(find);

    const newRecords = treeHelpers.tree(records);

    res.render("admin/pages/product-category/index", {
        newRecords: newRecords,
        filterStatus: filterStatus,
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

//[PATCH] /admin/productsCategory/change-status/:status:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({_id : id}, {status: status});

    req.flash("success", "Cập nhật trạng thái bản ghi thành công!");

    res.redirect("back");
}
