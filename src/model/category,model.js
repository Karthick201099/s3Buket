const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    image: {
      type: [String]
    },
    categoryName: {
      type: String
    },
    slug: {
      type: String
    },

    weightUNit: {
      type: String
    },
    date: {
      type: String
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'disabled']
    },
    description: {
      type: String
    },
    metaTittle: {
      type: String
    },
    metaDescription: {
      type: String
    }
  },
  { versionKey: false },
  { timeStamps: true }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
