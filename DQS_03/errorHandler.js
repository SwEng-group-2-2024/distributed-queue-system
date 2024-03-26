module.exports = (err, req, res, next) => {
  // Log the error using your logger
  console.error(err);

  res.status(500).json({
    message: "An error occurred",
    error: err.message,
  });
};
