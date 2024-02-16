const systemConfig = require("../../configs/system");
const Account = require("../../models/account");

//[GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Thông tin cá nhân"
    })
}

//[GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    })
}

//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
    const existsEmail = await Account.findOne({
        email: req.body.email,
        _id: {$ne: id},
        deleted: false
    })
    
    if(existsEmail){
        req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    }
    else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }
        else{
            delete req.body.password;
        }
        await Account.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật thông tin thành công!");
    }
    res.redirect("back");
}