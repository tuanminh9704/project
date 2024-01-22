const Account = require("../../models/account");
const Role = require("../../models/roles");
const systemConfig = require("../../configs/system");

module.exports.auth = async (req, res, next) => {

  if(!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const user = await Account.findOne({
    token: req.cookies.token
  }).select("-password");

  if(!user) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const role = await Role.findOne({
    _id: user.role_id
  }).select("title permissions")

  // bên file pug có thể sử dụng luôn role và pug còn bên file controller thì phải dùng là res.locals.user
  res.locals.user = user;
  res.locals.role = role;

  next();
}