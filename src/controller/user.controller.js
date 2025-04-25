const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const responseHandler = require('../utils/responseHandler')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/index')

controller = {}

// create user
controller.createUser = async (req, res) => {
  const { name, email, mobileNumber, password, role } = req.body

  if (!name || !email || !mobileNumber || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }
  const mobileNumberRegex = /^[0-9]{10}$/
  if (!mobileNumberRegex.test(mobileNumber)) {
    return responseHandler.badRequest(res, 'Mobile number is not valid')
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return responseHandler.badRequest(res, 'Email is not valid')
  }

  const existingMobileNumber = await User.findOne({ mobileNumber })
  if (existingMobileNumber) {
    return responseHandler.conflict(res, 'Mobile number already exists')
  }

  const existingEmail = await User.findOne({ email })
  if (existingEmail) {
    return responseHandler.conflict(res, 'Email already exists')
  }

  const hashPassword = await bcrypt.hash(password, 12)
  const user = new User({
    name,
    email,
    mobileNumber,
    password: hashPassword,
    role
  })
  const savedUser = await user.save()
  return res.status(201).json({
    message: 'User created successfully',
    data: savedUser
  })
}

// login user
controller.loginUser = async (req, res) => {
  const { mobileNumberoremail, password } = req.body
  if (!mobileNumberoremail) {
    return responseHandler.badRequest(res, 'All fields are required')
  }
  const user = await User.findOne({
    $or: [{ email: mobileNumberoremail }, { mobileNumber: mobileNumberoremail }]
  })
  if (!user) {
    return responseHandler.notFound(res, 'Account does not exist')
  }
  const matchPassword = await bcrypt.compare(password, user.password)
  if (!matchPassword) {
    return responseHandler.badRequest(res, 'Invalid password')
  }
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    role: user.role
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3d' })

  payload.token = token
  return responseHandler.ok(res, payload, 'Login successfully')
}

module.exports = controller
