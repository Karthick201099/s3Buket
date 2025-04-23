const router = require("express").Router();
const controller = require("../controller/category.controller");
const catchAsync = require("../utils/catchAsync");
const multer = require('multer')
const upload = multer()

// category
router.post("/createCategory",upload.single('categortURL'), catchAsync(controller.createCategory));

module.exports = router;
