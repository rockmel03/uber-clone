const express = require("express");

const mapsController = require("../controllers/maps.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");
const router = express.Router();

router.get(
  "/get-coordinates",
  //validation
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be provided in qurey params."),
  //auth middleware
  authMiddleware(),
  //controller
  mapsController.getCoordinates
);

router.get(
  "/get-distance-time",
  [
    query("origin")
      .isString()
      .isLength({ min: 3 })
      .withMessage("origin must be provided in query params"),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("destination must be provided in query params"),
  ],
  authMiddleware(),
  mapsController.getDistanceTime
);

router.get(
  "/get-suggestion",
  [
    query("search")
      .isString()
      .isLength({ min: 1 })
      .withMessage(`"search" query must be provided`),
  ],
  authMiddleware(),
  mapsController.getAutoCompleteSuggestion
);

module.exports = router;
