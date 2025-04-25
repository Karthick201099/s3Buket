const errorHanding = (err, req, res, next) => {
  console.log(err)
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || 'Internal server error' })
}

module.exports = errorHanding
