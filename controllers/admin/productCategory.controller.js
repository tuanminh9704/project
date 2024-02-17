const ProductCategory = require("../../models/productsCategory");
const systemConfig = require("../../configs/system");
const treeHelpers = require("../../helpers/tree");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");


//[GET] /admin/productsCategory
module.exports.index = async (req, res) => {
    const find ={
        deleted : false,
    };

    // Search
    const objectSearch = searchHelpers(req.query);

    // console.log(objectSearch);
    if(req.query.keyword){
        find.title = objectSearch.regex;
    }

    // End Search


    // Filter status

    const filterStatus = filterStatusHelpers(req.query);


    if(req.query.status){
        find.status = req.query.status;
    }

    // Ed filter status
    const records = await ProductCategory.find(find);

    const newRecords = treeHelpers.tree(records);

    res.render("admin/pages/product-category/index", {
        newRecords: newRecords,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
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

//[PATCH] /admin/productsCategory/change-multi
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;

    switch (type) {
        case "active":
        case "inactive":
            await ProductCategory.updateMany({
                _id: {$in: ids}
            }, {
                status: type
            })
            break;
    
        default:
            break;
    }

    res.redirect("back");   
}

//[GET] /admin/productsCategory/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const productCategoryDetail = await ProductCategory.findOne({
        _id: id,
    })

    res.render("admin/pages/product-category/detail", {
        pageTitle: productCategoryDetail.title,
        productCategoryDetail: productCategoryDetail,
    })
}

//[DELETE] /admin/productsCategory/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    await ProductCategory.updateOne({
        _id: id,
    }, {
        deleted: true,
    })
    req.flash("success", "Xóa thành công danh mục!");
    res.redirect("back");
}

//[GET] /admin/productsCategory/èdit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const productCategory = await ProductCategory.findOne({
        _id: id,
    })

    // const currentParentCategory = await ProductCategory.findOne({
    //     _id: ""
    // })

    // console.log(currentParentCategory);

    const arrProductsCategory = await ProductCategory.find({
        deleted: false,
    })
    const records = treeHelpers.tree(arrProductsCategory);

    res.render("admin/pages/product-category/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        productCategory: productCategory,
        records: records,
        // currentParentCategory: currentParentCategory,
    })

}

// [PATCH] /admin/productsCategory/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    req.body.position = parseInt(req.body.position);

    if(req.file && req.file.filename) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    // console.log(req.body);
    await ProductCategory.updateOne({
        _id: id,
    }, req.body)
    
    res.redirect("back");
}