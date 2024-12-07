const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

module.exports.getUserProfile = asyncHandler(async (req, res) => {
  const userData = req.user;
  return res.status(200).json(ApiResponse.success(userData));
});
