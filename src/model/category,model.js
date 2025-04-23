const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    image: {
      type: [String]
    },
    categoryName: {
      type: String
    },
    parentCategory: {
      type: String
    },
    date: {
      type: String
    },
    status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'Disabled']
    }
  },
  { versionKey: false },
  { timeStamps: true }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
