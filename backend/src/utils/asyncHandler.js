const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      // Pass the error to the centralized error handler middleware
      next(err);
    }
  };
};

module.exports = asyncHandler;
