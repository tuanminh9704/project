const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/trash.controller");

router.get("/", controller.index);

router.patch("/restore/:id", controller.restorePatch);

router.delete("/delete/:id", controller.delete);

router.delete("/delete-all", controller.deleteAll);

router.patch("/restore-all", controller.restoreAll);

module.exports = router;