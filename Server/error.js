// Console log all errors
export function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

// If no other error handlers are preseneted use this as fallback
export function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
