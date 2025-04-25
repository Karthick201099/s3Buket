const router = require('express').Router()
const controller = require('../controller/user.controller')
const catchAsync = require('../utils/catchAsync')

// create user
router.post('/createUser', catchAsync(controller.createUser))

// login user
router.post('/loginUser', catchAsync(controller.loginUser))

module.exports = router
