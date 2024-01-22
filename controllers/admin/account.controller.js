const Account = require("../../models/account");
const Role = require("../../models/roles");
const md5 = require("md5");
const systemConfig = require("../../configs/system");

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false
    })

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
        })
        record.role = role;
        // console.log(record);
    }
    // console.log(records);
    res.render("admin/pages/account/index", {
        records: records,
        pageTitle: "Trang Danh sách tài khoản"
    });
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    })
    // console.log(roles);
    res.render("admin/pages/account/create", {
        roles: roles,
        pageTitle: "Tạo mới tài khoản"
    })
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const existsEmail = await Account.find({
        email: req.body.email,
        deleted: false
    })

    if(existsEmail){
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }
    
    req.body.password = md5(req.body.password);
    const records = new Account(req.body);
    await records.save();
    req.flash("success", "Tạo mới tài khoản thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    })

    const data = await Account.findOne({
        _id: req.params.id,
        deleted: false,
    })
    res.render("admin/pages/account/edit", {
        roles: roles,
        data: data,
        pageTitle: "Chỉnh sửa tài khoản"
    })
}

//[POST] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    // kiểm tra trươngf hợp nếu người dùng tahy đổi mà không thay đổi password thì giữ nguyên pass cũ

    const id = req.params.id;
    if(req.body.password){
        req.body.password = md5(req.body.password);
    }
    else{
        delete req.body.password;
    }

    const existsEmail = await Account.findOne({
        email: req.body.email,
        _id: {$ne : id},
        deleted: false
    })


    // console.log(existsEmail);
    if(existsEmail){
        req.flash("error", "Email đã tồn tại!");    
    }
    else{
        await Account.updateOne({_id : req.params.id}, req.body);
        req.flash("success", "Cập nhật tài khoản thành công!");
    }

    res.redirect("back");
}