const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { captainProfile } = require("../controllers/captain.controller");

const router = express.Router();

router.get("/profile", authMiddleware(["captain"]), captainProfile);

module.exports = router;
