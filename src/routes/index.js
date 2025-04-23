const router = require('express').Router()
// const dialogRoute = require('./dialog.route')
const categoryRoute = require('./category.route')
const freshRoute = require('./fresh.route')




// router.use('/dialog',dialogRoute)
router.use('/category',categoryRoute)
router.use('/fresh',freshRoute)

module.exports = router