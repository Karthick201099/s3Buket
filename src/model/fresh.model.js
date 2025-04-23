const mongoose = require('mongoose')

const freshSechma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    medical: {
      type: String,
      required: true
    },
    emailHash: {
      type: String,
      required: true
    },
    phoneHash: {
      type: String,
      required: true
    }
  },
  { versionkey: false },
  { timestamps: true }
)

const Fresh = mongoose.model('fresh', freshSechma)

module.exports = Fresh
