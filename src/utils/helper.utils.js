const utils = {}

utils.getRandomNumber = (max) => {
  return Math.floor(
    Math.pow(10, max - 1) + Math.random() * 9 * Math.pow(10, max - 1)
  )
}

module.exports = utils
