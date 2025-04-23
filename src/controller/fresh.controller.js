const Fresh = require('../model/fresh.model.js')
const responseHandler = require('../utils/responseHandler.js')
const CryptoJS = require('crypto-js')
const { ENCRYPT_SECRET } = require('../config/index.js')
const { encrypt, hash, decrypt } = require('../utils/encrypt.js')

const controller = {}

controller.createFresh = async (req, res) => {
  const { name, email, phone, medical } = req.body

  const encryptedEmail = encrypt(email)
  const encryptedPhone = encrypt(phone)
  const encryptedMedical = encrypt(medical)
  const emailHash = hash(email)
  const phoneHash = hash(phone)

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

  const emailHash = hash(email)
  console.log(emailHash)
  const fresh = await Fresh.findOne({ emailHash: emailHash })

  console.log(fresh)
  if (!fresh) {
    return responseHandler.notFound(res, 'Fresh not found')
  }

  const decryptedItem = {
    name: fresh.name,
    email: decrypt(fresh.email),
    phone: decrypt(fresh.phone),
    medical: decrypt(fresh.medical)
  }

  return responseHandler.ok(res, decryptedItem, 'Fresh fetched successfully')
}

controller.getAllFresh = async (req, res) => {
  const fresh = await Fresh.find({})
  if (fresh.length === 0) {
    return responseHandler.notFound(res, 'No Fresh found')
  }
  const decryptedFresh = fresh.map((item) => {
    return {
      name: item.name,
      email: decrypt(item.email),
      phone: decrypt(item.phone),
      medical: decrypt(item.medical)
    }
  })
  return responseHandler.ok(
    res,
    decryptedFresh,
    'All Fresh fetched successfully'
  )
}

module.exports = controller
