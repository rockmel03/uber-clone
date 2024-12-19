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

  res
    .status(201)
    .json(ApiResponse.success(createdRide, "ride created successfully", 201));

  // send message to captains
  await rideServices.sendRideMessageToCaptains(createdRide);
});

module.exports.getFare = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { pickup, destination } = req.query;

  const fare = await rideServices.calculateFare(pickup, destination);
  if (!fare) throw new ApiError(500, "failed to calculate fare");

  return res
    .status(200)
    .json(ApiResponse.success(fare, "fair calculated successfully"));
});
