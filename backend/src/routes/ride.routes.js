const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");
const { body } = require("express-validator");

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

module.exports = router;
