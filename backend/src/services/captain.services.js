const Captain = require("../models/captain.model");
const ApiError = require("../utils/ApiError");

module.exports.createCaptain = async ({
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if ([color, plate, capacity, vehicleType].some((val) => val === ""))
    throw ApiError.validationError(["All fields are required"]);

  const existingCaptain = await Captain.findOne({ "vehicle.plate": plate });
  if (existingCaptain) {
    throw ApiError.validationError(["Vehicle with this plate already exists"]);
  }

  const vehicle = {
    color,
    plate,
    capacity,
    vehicleType,
  };

  try {
    const captain = await Captain.create({ vehicle });
    return captain;
  } catch (error) {
    throw new ApiError(500, "Failed to create captain", [error]);
  }
};
