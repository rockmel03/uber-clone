const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const captainService = require("../services/captain.services");

module.exports.captainProfile = asyncHandler(async (req, res) => {
    const userData = req.user;
    
  const captainData = await captainService.captainProfile(userData._id);

  if (!captainData) throw ApiError.notFoundError("captain");

  return res.status(200).json(ApiResponse.success(captainData));
});
