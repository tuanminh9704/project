const User = require("../../models/user");
const md5 = require("md5");
const genarate = require("../../helpers/genarate");
const ForgotPassword = require("../../models/forgot-password");
const Cart = require("../../models/cart");

const { use } = require("../../routes/client/user.route");

const sendMailHelper = require("../../helpers/sendMail");

//[GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register",{
        pageTitle: "Đăng ký"
    })
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    const email = req.body.email;
    const existUser = await User.findOne({
        email: email
    })

    if(existUser){
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }
    
    const infoUser = {
        fullName: req.body.fullName,
        email: email,
        password: md5(req.body.password),
        tokenUser: genarate.randomString(30)
    }

    const user = new User(infoUser);

    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

//[GET] /user/logout
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;

    const existUser = await User.findOne({
        email: email,
        deleted: false
    })

    if(existUser.status !== "active"){
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    }

    if(!existUser){
        req.flash("error", "Email hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) !== existUser.password){
        req.flash("error", "Email hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(existUser.status == "inactive"){
        req.flash("error", "Tài khoản của bạn đã bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", existUser.tokenUser);

    await Cart.updateOne({
        _id: req.cookies.cartId
    }, {
        user_id: existUser.id
    })

    res.redirect("/");

}

//[GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

//[GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        pageTitle: "Quên mật khẩu"
    })
}

//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    // console.log(email);

    const existEmail = await User.findOne({
        email: email
    })

    if(!existEmail){
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    const otp = genarate.randomNumber(6);

    // const expirationTime = new Date();
    // expirationTime.setMinutes(expirationTime.getSeconds() + 10);

    const recordsForgotPassword = {
        email: email,
        otp: otp,
        expiresAt: Date.now() + 5,
    }

    const forgotPassword = new ForgotPassword(recordsForgotPassword);

    await forgotPassword.save();

    const subject = `Mã OTP lấy lại lại mật khẩu`;
    const html = `Mã OTP của bạn là <b>${otp}</b>. Vui lòng không chia sẻ với bất cứ ai để tránh mất tài khoản.`;
  
    sendMailHelper.sendMail(email, subject, html); 


    res.redirect(`/user/password/otp?email=${email}`);
}

//[GET] /user/password/otp
module.exports.submitOtp = async (req, res) => {
    const email = req.query.email;
    // console.log(email);
    res.render("client/pages/user/otp",{
        pageTitle: "Xác minh tài khoản",
        email: email
    })
}

//[POST] /user/password/otp
module.exports.submitOtpPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const checkOTP = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })

    const user = await User.findOne({
        email: email,
    })

    if(!checkOTP){
        req.flash("error", "Mã OTP không chính xác!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

//[GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Thay đổi mật khẩu"
    })
}

//[POST] /user/password/reset
module.exports.resetPasswordPost = async ( req, res) => {
    const tokenUser = req.cookies.tokenUser;

    const password = req.body.password;

    await User.updateOne({
        tokenUser: tokenUser,
    }, {
        password: md5(password),
    })
    
    req.flash("success", "Thay đổi mật khẩu thành công!");
    res.redirect("/");
}

//[GET] /user/info
module.exports.info = (req, res) => {
    res.render("client/pages/user/info", {
        pageTitle: "Thông tin cá nhân"
    })
}