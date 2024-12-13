const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const rideServices = require("../services/ride.services");
const ApiResponse = require("../utils/ApiResponse");

module.exports.createRide = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { pickup, destination, vehicleType } = req.body;

  const userId = req.user._id;
  const createdRide = await rideServices.create({
    userId,
    pickup,
    destination,
    vehicleType,
  });
  return res
    .status(201)
    .json(ApiResponse.success(createdRide, "ride created successfully", 201));
});
