const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/profile", authMiddleware(), userController.getUserProfile);

module.exports = router;
