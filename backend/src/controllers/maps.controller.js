const mapServices = require("../services/maps.services");
const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

module.exports.getCoordinates = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { address } = req.query;
  if (!address) throw new ApiError(400, "address must be provided in query");

  const coordinates = await mapServices.getAddressCoordinates(address);

  return res
    .status(200)
    .json(ApiResponse.success(coordinates, "coordinates fetched successfully"));
});

module.exports.getDistanceTime = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { origin, destination } = req.query;

  const resultDistanceTime = await mapServices.getDistanceTime(
    origin,
    destination
  );

  return res
    .status(200)
    .json(
      ApiResponse.success(
        resultDistanceTime,
        "distance and time fetched successfully"
      )
    );
});

module.exports.getAutoCompleteSuggestion = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { search } = req.query;

  const data = await mapServices.getAutoCompleteSuggestion(search);

  return res
    .status(200)
    .json(ApiResponse.success(data, "Suggestions fetched successfully"));
});
