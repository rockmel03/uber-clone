const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");
const { body, query } = require("express-validator");

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

module.exports = router;
