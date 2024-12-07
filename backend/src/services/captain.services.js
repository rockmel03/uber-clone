const { default: mongoose } = require("mongoose");
const Captain = require("../models/captain.model");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

module.exports.createCaptain = async ({
  vehicle: { color, plate, capacity, vehicleType },
  userId,
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
    const captain = await Captain.create({ userId, vehicle });
    return captain;
  } catch (error) {
    throw new ApiError(500, "Failed to create captain", [error]);
  }
};

module.exports.captainProfile = async (userId) => {
  const captainData = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId), // Match a specific user (optional)
      },
    },
    {
      $lookup: {
        from: "captains", // The target collection (captains)
        localField: "captain", // Field in users to join on (stores captain._id)
        foreignField: "_id", // Field in captains to join on
        as: "captain", // The resulting array field name
      },
    },
    {
      $unwind: {
        path: "$captain",
        preserveNullAndEmptyArrays: true, // Retain users even if they have no captain
      },
    },
    {
      $project: {
        password: 0, // Exclude the password field
      },
    },
  ]);

  return captainData;
};
