const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");
const { body, query, param } = require("express-validator");

const router = express.Router();

router
  .route("/")
  .post(
    [
      body("pickup")
        .isString()
        .isLength({ min: 5 })
        .withMessage("pickup location is required"),
      body("destination")
        .isString()
        .isLength({ min: 5 })
        .withMessage("destination is required"),
      body("vehicleType")
        .isString()
        .isLength({ min: 2 })
        .withMessage("vehicleType is required"),
    ],
    authMiddleware(),
    rideController.createRide
  );

router.get(
  "/get-fare",
  [
    query("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("pickup is required in query params"),

    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("destination is required in query params"),
  ],
  authMiddleware(),
  rideController.getFare
);

router.post(
  "/accept",
  body("rideId").isMongoId().withMessage("rideId is required"),
  authMiddleware(),
  rideController.acceptRide
);

router.get("/:rideId", [
  param("rideId").isMongoId().withMessage("rideId is required"),
  authMiddleware(),
  rideController.getRide,
]);

router
  .route("/otp/:rideId")
  .post(
    [
      param("rideId").isMongoId().withMessage("rideId is required"),
      body("otp")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP is required, make sure otp is 6 digit long"),
    ],
    authMiddleware(),
    rideController.verifyOtp
  );

module.exports = router;
