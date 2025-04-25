const router = require('express').Router()
const controller = require('../controller/fresh.controller')
const catchAsync = require('../utils/catchAsync')

// category
router.post('/createFresh', catchAsync(controller.createFresh))
router.get('/getFresh/:email', catchAsync(controller.getFresh))
router.get('/getAllFresh', catchAsync(controller.getAllFresh))

module.exports = router
