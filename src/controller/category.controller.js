const responseHandler = require('../utils/responseHandler')
const moment = require('moment')
const Category = require('../model/category,model')
const uploadFile = require('../utils/upload')

const controller = {}

controller.createCategory = async (req, res) => {
  const {
    categoryName,
    slug,
    weightUNit,
    description,
    metaTittle,
    metaDescription,
    status
  } = req.body

  const date = moment().format('YYYY-MM-DD')

  const Categories = new Category({
    categoryName,
    slug,
    weightUNit,
    description,
    metaTittle,
    metaDescription,
    status,
    date
  })
  let image
  if (req.file) {
    contentType = req.file.mimetype || 'image/jpeg'
    storageName = `user/${Categories._id}`

    result = await uploadFile(req.file.buffer, storageName, contentType)
    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error('Failed to upload image to S3')
    }
    image = [storageName]
  } else {
    image = []
  }
  Categories.image = image

  const saveCategory = await Categories.save()

  return responseHandler.created(
    res,
    saveCategory,
    'Category created successfully'
  )
}

controller.getCategory = async (req, res) => {
  const category = await Category.find()
  if (category.length === 0) {
    return responseHandler.notFound(res, 'No Category found')
  }
  return responseHandler.ok(res, category, 'Category fetched successfully')
}

controller.getCategoryById = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id)
  if (!category) {
    return responseHandler.notFound(res, 'Category not found')
  }
  return responseHandler.ok(res, category, 'Category fetched successfully')
}

module.exports = controller
