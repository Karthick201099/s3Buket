const Product = require('../model/product.model')
const helperUtils = require('../utils/helper.utils')
const responseHandler = require('../utils/responseHandler')
const uploadFile = require('../utils/upload')

controller = {}

controller.createProduct = async (req, res) => {
  const {
    title,
    productCategory,
    weight,
    weightUnits,
    description,
    stock,
    productCode,
    productSKU,
    status,
    price,
    metaTittle,
    metaDescription
  } = req.body
  const productId = helperUtils.getRandomNumber(6)
  const product = new Product({
    title,
    productCategory,
    weight,
    weightUnits,
    description,
    stock,
    productCode,
    productSKU,
    status,
    price,
    metaTittle,
    metaDescription,
    productId
  })
  let ProdutImage = []

  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const uuId = helperUtils.getRandomNumber(10)
      const contentType = file.mimetype || 'image/jpeg'
      const storageName = `product/gallery/${uuId}`

      try {
        const result = await uploadFile(file.buffer, storageName, contentType)
        if (result.$metadata.httpStatusCode === 200) {
          return storageName // Store the S3 path
        } else {
          console.error(`Failed to upload image: ${file.originalname}`)
          return null
        }
      } catch (err) {
        console.error(`Error uploading image ${file.originalname}:`, err)
        return null
      }
    })
    console.log('uploadPromises', uploadPromises)

    const uploadedResults = await Promise.all(uploadPromises)
    ProdutImage = [...ProdutImage, ...uploadedResults.filter(Boolean)] // Append successful uploads
  }
  product.ProdutImage = ProdutImage
  const saveProduct = await product.save()

  return responseHandler.created(
    res,
    saveProduct,
    'Product created successfully'
  )
}

controller.getProduct = async (req, res) => {
  const product = await Product.find()
  if (product.length === 0) {
    return responseHandler.notFound(res, 'No Product found')
  }
  return responseHandler.ok(res, product, 'Product fetched successfully')
}

controller.getProductById = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return responseHandler.badRequest(res, 'Product ID is required')
  }
  const product = await Product.findById(id)
  if (!product) {
    return responseHandler.notFound(res, 'Product not found')
  }
  return responseHandler.ok(res, product, 'Product fetched successfully')
}

module.exports = controller
