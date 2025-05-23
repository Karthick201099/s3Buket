const router = require('express').Router()
const controller = require('../controller/category.controller')
const catchAsync = require('../utils/catchAsync')
const decodeJwtMiddleware = require('../middleware/decodeJwtMiddleware')
const multer = require('multer')
const upload = multer()

// create category
router.post(
  '/createCategory',
  decodeJwtMiddleware,
  upload.single('categoryURL'),
  catchAsync(controller.createCategory)
)
//  get category
router.get(
  '/getCategory',
  decodeJwtMiddleware,
  catchAsync(controller.getCategory)
)
// get category by id
router.get(
  '/getCategory/:id',
  decodeJwtMiddleware,
  catchAsync(controller.getCategoryById)
)

module.exports = router
