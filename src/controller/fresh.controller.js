const Fresh = require('../model/fresh.model.js')
const responseHandler = require('../utils/responseHandler.js')
const CryptoJS = require('crypto-js')
const { ENCRYPT_SECRET } = require('../config/index.js')
const encryptUtils = require('../utils/encrypt.js')

const controller = {}

controller.createFresh = async (req, res) => {
  const { name, email, phone, medical } = req.body

  const encryptedEmail = encryptUtils.encrypt(email)
  const encryptedPhone = encryptUtils.encrypt(phone)
  const encryptedMedical = encryptUtils.encrypt(medical)
  const emailHash = encryptUtils.hash(email)
  const phoneHash = encryptUtils.hash(phone)

  const fresh = new Fresh({
    name,
    email: encryptedEmail,
    phone: encryptedPhone,
    medical: encryptedMedical,
    emailHash,
    phoneHash
  })

  const savedFresh = await fresh.save()
  return responseHandler.created(res, savedFresh, 'Fresh created successfully')
}

controller.getFresh = async (req, res) => {
  const { email } = req.params
  console.log(email)
  if (!email) {
    return responseHandler.badRequest(res, 'Email is required')
  }

  const emailHash = encryptUtils.hash(email)
  console.log(emailHash)
  const fresh = await Fresh.findOne({ emailHash: emailHash })

  console.log(fresh)
  if (!fresh) {
    return responseHandler.notFound(res, 'Fresh not found')
  }

  const decryptedItem = {
    name: fresh.name,
    email: encryptUtils.decrypt(fresh.email),
    phone: encryptUtils.decrypt(fresh.phone),
    medical: encryptUtils.decrypt(fresh.medical)
  }

  const maskData = {
    name: decryptedItem.name,
    email: encryptUtils.maskEmail(decryptedItem.email),
    phone: encryptUtils.maskPhone(decryptedItem.phone),
    medical: decryptedItem.medical
  }
  return responseHandler.ok(res, maskData, 'Fresh fetched successfully')
}

controller.getAllFresh = async (req, res) => {
  const fresh = await Fresh.find({})
  if (fresh.length === 0) {
    return responseHandler.notFound(res, 'No Fresh found')
  }
  const decryptedFresh = fresh.map((item) => {
    return {
      name: item.name,
      email: encryptUtils.decrypt(item.email),
      phone: encryptUtils.decrypt(item.phone),
      medical: encryptUtils.decrypt(item.medical)
    }
  })
  const maskData = decryptedFresh.map((item) => {
    return {
      name: item.name,
      email: encryptUtils.maskEmail(item.email),
      phone: encryptUtils.maskPhone(item.phone),
      medical: item.medical
    }
  })
  return responseHandler.ok(res, maskData, 'All Fresh fetched successfully')
}

module.exports = controller
