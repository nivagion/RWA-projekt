/**
 * Central error handler.
 * Put AFTER all routes/middleware.
 */
module.exports = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    error: err.message || "Internal server error",
  });
};
