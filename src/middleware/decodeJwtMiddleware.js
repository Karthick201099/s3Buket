const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

const decodeJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log('authHeader', authHeader)
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    console.log(token)
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: 'Invalid token' })
        }
        const { _id, mobileNumber, role } = decodedToken
        req.user = {
          id: _id,
          mobileNumber: mobileNumber,
          role: role
        }
        next()
      })
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'Authorization header missing' })
  }
}

module.exports = decodeJwtMiddleware
