const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    productCategory: {
      type: String,
      required: true
    },
    productId: {
      type: Number
    },
    ProdutImage: {
      type: [String]
    },
    weight: {
      type: Number
    },
    weightUnits: {
      type: String
    },
    description: {
      type: String
    },
    stock: {
      type: Boolean
    },
    productCode: {
      type: String
    },
    productSKU: {
      type: String
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'disabled']
    },
    price: {
      type: Number
    },
    metaTittle: {
      type: String
    },
    metaDescription: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false, timestamps: true }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
