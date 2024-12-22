const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const rideServices = require("../services/ride.services");
const ApiResponse = require("../utils/ApiResponse");
const Ride = require("../models/ride.model");
const { sendmessage } = require("../socket");

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

module.exports.acceptRide = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { rideId } = req.body;

  const ride = await Ride.findById(rideId);
  if (!ride) throw ApiError.notFoundError("ride");

  ride.captain = req.user._id;
  ride.status = "accepted";

  await ride.save();

  const rideData = await rideServices.get(ride._id);
  delete rideData.otp;

  res.status(200).json(ApiResponse.success(rideData, "ride accepted"));

  // send message to user
  sendmessage("ride-accepted", rideData?.user?.socketId, rideData);
});

module.exports.getRide = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);
  if (!ride) throw ApiError.notFoundError("ride");

  let rideData = await rideServices.get(ride._id);
  if (req.user?.roles?.includes("captain")) {
    rideData = { ...rideData };
    delete rideData.otp;
  }
  res.status(200).json(ApiResponse.success(rideData));
});

module.exports.verifyOtp = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { rideId } = req.params;
  const { otp } = req.body;

  const ride = await Ride.findById(rideId).select(["+otp"]);
  if (!ride) throw ApiError.notFoundError("ride");

  if (ride.captain.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to do this action");
  }
  const isOtpMatch = Number(otp) === ride.otp;
  if (!isOtpMatch) throw new ApiError(403, "invalid OTP");

  ride.status = "ongoing";
  await ride.save();

  res.status(200).json(ApiResponse.success({}, "OTP verified successfully"));

  const rideData = await rideServices.get(rideId);

  // send message
  sendmessage("otp-verified", rideData?.user?.socketId, {
    message: "otp verified",
    data: rideData,
  });
});

module.exports.finishRide = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);
  if (!ride) throw ApiError.notFoundError("ride");

  if (ride.captain.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to do this action");
  }

  ride.status = "completed";
  await ride.save();

  res.status(200).json(ApiResponse.success({}, "OTP verified successfully"));

  const rideData = await rideServices.get(rideId);

  // send message
  sendmessage("ride-finished", rideData?.user?.socketId, {
    message: "ride finished",
    data: rideData,
  });
});
