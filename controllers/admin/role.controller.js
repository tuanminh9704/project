const { json } = require("body-parser");
const systemConfig = require("../../configs/system");
const Roles = require("../../models/roles");

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    const records = await Roles.find({
        deleted: false,
    })
    // console.log(records)
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Thêm mới vai trò"
    })
}

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const records = new Roles(req.body);
    await records.save();
    req.flash("success", "Tạo mới thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const records = await Roles.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        records: records
    })
}

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await Roles.updateOne({_id : id}, req.body);

    req.flash("success", "Chỉnh sửa thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/permission
module.exports.permission = async (req, res) => {
    const records = await Roles.find({
        deleted: false,
    })
    res.render("admin/pages/roles/permission", {
        records: records,
        pageTitle: "Phân quyền"
    })
}

//[PATCH] /admin/roles/permission
module.exports.permissionPatch = async (req, res) => {
    const data = JSON.parse(req.body.permissions);

    // console.log(data);

    for (const item of data) {
        await Roles.updateOne({_id: item.id}, {permissions: item.permission});
    }

    req.flash("success", "Cập nhật quyền thành công!");
    res.redirect("back");
}
