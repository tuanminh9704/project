const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");

const userValidate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/register", controller.register);

router.post("/register", userValidate.checkUser, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", userValidate.login, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot",userValidate.forgot,  controller.forgotPasswordPost);

router.get("/password/otp", controller.submitOtp);

router.post("/password/otp",userValidate.otp, controller.submitOtpPost)

router.get("/password/reset", controller.resetPassword);

router.post("/password/reset", controller.resetPasswordPost);

router.get("/info", authMiddleware.auth, controller.info);

module.exports = router;