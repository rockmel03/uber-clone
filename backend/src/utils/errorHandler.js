const ApiError = require("./ApiError");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...err,
    });
  }

  // Handle other unexpected errors
  res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
