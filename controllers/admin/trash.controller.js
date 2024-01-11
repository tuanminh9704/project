const { query } = require("express");
const Product = require("../../models/products");

//[GET] /admin/trash
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: true,
    })
    res.render("admin/pages/trash/index", {
        pageTitle: "Thùng rác",
        products: products
    })
}

//[PATCH] /admin/trash/restore/:id
module.exports.restorePatch = async (req, res) => {
    try {
        const id = req.params.id;

        const countProduct = await Product.countDocuments() + 1;
    
        await Product.updateOne({_id : id}, {deleted: false, position: countProduct});
    
        req.flash("success", "Khôi phục sản phẩm thành công!");
    
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Khôi phục sản phẩm thất bại!");

        res.redirect("back");
    }
}

//[DELETE] /admin/trash/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const find = {
            _id : id
        }
        await Product.deleteOne(find);
        req.flash("success", "Xóa sản phẩm thành công!");
        res.redirect("back");  
    } catch (error) {
        req.flash("error", "Xóa sản phẩm thất bại!");
        res.redirect("back");
    }
}

//[DELETE] /admin/trash/delete-all/:ids
module.exports.deleteAll = async (req, res) => {

    const ids = req.query.ids;

    await Product.deleteMany({_id: {$in : ids}});

    res.redirect("back");
}

//[PATCH] /admin/trash/restore/:ids

module.exports.restoreAll = async (req, res) => {
    try {
        const ids = req.query.ids;

        const countProducts = await Product.countDocuments();
    
        await Product.updateMany({_id : {$in : ids}}, {deleted: false, position: countProducts + 1});
    
        req.flash("success", `Khôi phục thành công ${ids.length} sản phẩm!`);
    
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Khôi phục thất bại!");
        res.redirect("back");
    }

}