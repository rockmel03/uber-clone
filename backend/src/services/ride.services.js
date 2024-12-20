const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const { VEHICLE_TYPES, VEHICLE_FARE_RATES } = require("../constants");
const Payment = require("../models/payment.model");
const Ride = require("../models/ride.model");
const ApiError = require("../utils/ApiError");
const mapServices = require("./maps.services");
const { sendmessage } = require("../socket");
const { distinct } = require("../models/user.model");

// function to calculate fare
async function calculateFare(pickup, destination) {
  if (!pickup || !destination)
    throw new ApiError(400, "pickup and destination are required");

  const distanceTime = await mapServices.getDistanceTime(pickup, destination);

  const vehicleTypes = VEHICLE_FARE_RATES;

  const distance = distanceTime.distance.value / 1000; // Convert meters to kilometers
  const time = distanceTime.duration.value / 60; // Convert seconds to minutes

  const fare = Object.keys(vehicleTypes)
    .map((key) => {
      const vehicle = vehicleTypes[key];
      const fareValue = Math.round(
        vehicle.baseFare +
          distance * vehicle.distanceRate +
          time * vehicle.timeRate
      );

      return [key, fareValue];
    })
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1];
      return acc;
    }, {});

  return fare;
}

module.exports.calculateFare = calculateFare;

// generate Otp function
function generateOtp(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num);
  return crypto.randomInt(min, max);
}

module.exports.create = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (
    [userId, pickup, destination, vehicleType].some(
      (item) => item === "" || !item
    )
  )
    throw ApiError.validationError("All feilds must are required");

  if (!VEHICLE_TYPES.includes(vehicleType))
    throw new ApiError(400, "invalid vehicle type");

  const calculatedFare = await calculateFare(pickup, destination);
  const fare = Number(calculatedFare[vehicleType].toFixed(2));
  const otp = generateOtp(6);

  try {
    const ride = new Ride({
      user: userId,
      pickup,
      destination,
      fare,
      otp,
    });

    const payment = await Payment.create({
      userId,
      amount: fare,
    });

    if (!payment)
      throw new ApiError(500, "failed to create a Payment document");

    // add payment id to ride object
    ride.paymentId = payment._id;
    await ride.save();

    return await this.get(ride._id);
  } catch (error) {
    throw new ApiError(500, "Failed to create a ride", error.message);
  }
};

module.exports.get = async (rideId) => {
  if (!rideId) throw ApiError.validationError("rideId not found");

  const ride = await Ride.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(rideId) },
    },
    {
      $lookup: {
        from: "payments",
        localField: "paymentId",
        foreignField: "_id",
        as: "paymentDetails",
      },
    },
    {
      $unwind: {
        path: "$paymentDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              password: false,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "captain",
        foreignField: "_id",
        as: "captain",
        pipeline: [
          {
            $lookup: {
              from: "captains",
              localField: "captain",
              foreignField: "_id",
              as: "details",
            },
          },
          {
            $unwind: {
              path: "$details",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              fullname: 1,
              email: 1,
              socketId: 1,
              roles: 1,
              details: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$captain",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        user: 1,
        captain: 1,
        paymentDetails: 1,
        pickup: 1,
        destination: 1,
        fare: 1,
        status: 1,
        duration: 1,
        distance: 1,
        otp: 1,
      },
    },
  ]);

  return ride[0];
};

module.exports.sendRideMessageToCaptains = async (rideData) => {
  delete rideData.otp; // remove sensitive feild

  const coords = await mapServices.getAddressCoordinates(rideData?.pickup);
  const captains = await mapServices.getCaptainsInTheRadius(
    coords.ltd,
    coords.lng,
    200 //20 km
  );
  console.log(coords, captains);
  captains.forEach((captain) => {
    // send message to all captains by socketId
    const socketId = captain?.captainDetails?.socketId;
    console.log(socketId);
    sendmessage("new-ride", socketId, rideData);
  });
};
