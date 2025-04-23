const responseHandler = require('../utils/responseHandler')
const moment = require('moment')
const Category = require('../model/category,model')
const uploadFile = require('../utils/upload')

const controller = {}

controller.createCategory = async (req, res) => {
  const { categoryName, parentCategory, status } = req.body

  const date = moment().format('YYYY-MM-DD')

  const Categories = new Category({
    categoryName,
    parentCategory,
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

module.exports = controller
