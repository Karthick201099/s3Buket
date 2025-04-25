const router = require('express').Router()
// const dialogRoute = require('./dialog.route')
const categoryRoute = require('./category.route')
const freshRoute = require('./fresh.route')
const productRoute = require('./product.route')
const userRoute = require('./user.route')

// router.use('/dialog',dialogRoute)
router.use('/category', categoryRoute)
router.use('/fresh', freshRoute)
router.use('/product', productRoute)
router.use('/user', userRoute)

module.exports = router
