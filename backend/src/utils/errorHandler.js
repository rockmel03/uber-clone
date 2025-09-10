const ApiError = require("./ApiError");
const { logger } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.log("debug", err.message);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...err,
    });
  }

  logger.error(err.message);
  console.log(err);
  // Handle other unexpected errors
  res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
