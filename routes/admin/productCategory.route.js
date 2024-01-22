const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/productCategory.controller");
const upload = multer();
const validate = require("../../validates/admin/productCategory");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",upload.single("thumbnail"), uploadCloud.uploadSingle, validate.createPost, controller.createPost);

module.exports = router;