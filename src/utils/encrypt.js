const CryptoJS = require('crypto-js')
const { ENCRYPT_SECRET } = require('../config/index.js')

utils = {}

utils.encrypt = (text) => {
  if (!ENCRYPT_SECRET) {
    throw new Error('ENCRYPT_SECRET is not defined')
  }
  return CryptoJS.AES.encrypt(text, ENCRYPT_SECRET).toString()
}

utils.decrypt = (ciphertext) => {
  if (!ENCRYPT_SECRET) {
    throw new Error('ENCRYPT_SECRET is not defined')
  }
  return CryptoJS.AES.decrypt(ciphertext, ENCRYPT_SECRET).toString(
    CryptoJS.enc.Utf8
  )
}

utils.hash = (text) => {
  return CryptoJS.SHA256(text).toString()
}

utils.maskPhone = (phone) => {
  return phone.replace(/^(\d{2})\d{6}(\d{2})$/, '$1******$2')
}

utils.maskEmail = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) return ''

  const [username, domain] = email.split('@')

  if (username.length <= 2) {
    return '*'.repeat(username.length) + '@' + domain
  }

  const maskedUsername =
    username[0] +
    '*'.repeat(username.length - 2) +
    username[username.length - 1]
  return maskedUsername + '@' + domain
}

module.exports = utils
