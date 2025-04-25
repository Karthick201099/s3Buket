const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
// You wrap your async route handlers with catchAsync so any errors thrown get passed to the error middleware automatically.
module.exports = catchAsync
