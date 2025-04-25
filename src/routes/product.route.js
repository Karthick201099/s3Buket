const router = require('express').Router()
const controller = require('../controller/product.controller')
const catchAsync = require('../utils/catchAsync')
const decodeJwtMiddleware = require('../middleware/decodeJwtMiddleware')
const multer = require('multer')
const upload = multer()

// create product
router.post(
  '/createProduct',
  decodeJwtMiddleware,
  decodeJwtMiddleware,
  upload.array('productURL', 5),
  catchAsync(controller.createProduct)
)

// get product
router.get(
  '/getProduct',
  decodeJwtMiddleware,
  catchAsync(controller.getProduct)
)
// get product by id
router.get(
  '/getProduct/:id',
  decodeJwtMiddleware,
  catchAsync(controller.getProductById)
)

module.exports = router
