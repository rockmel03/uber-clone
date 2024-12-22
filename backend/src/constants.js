module.exports.ACCOUNT_TYPES = ["user", "captain"]; // roles
module.exports.VEHICLE_TYPES = ["car", "motorcycle", "auto"];

module.exports.VEHICLE_FARE_RATES = {
  car: { baseFare: 50, distanceRate: 10, timeRate: 2 },
  auto: { baseFare: 30, distanceRate: 5, timeRate: 1 },
  motorcycle: { baseFare: 20, distanceRate: 3, timeRate: 0.5 },
};

module.exports.RIDE_STATUS = [
  "pending",
  "accepted",
  "ongoing",
  "completed",
  "cancelled",
];

module.exports.RIDE_STATUS_ENUM = {
  pending: "pending",
  accepted: "accepted",
  ongoing: "ongoing",
  completed: "completed",
  cancelled: "cancelled",
};
