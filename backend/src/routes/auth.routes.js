const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const registerController = require("../controllers/authControllers/register.controller");
const loginController = require("../controllers/authControllers/login.controller");
const logoutController = require("../controllers/authControllers/logout.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("firstname should be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password should be at least 6 character long"),
  ],
  registerController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password should be at least 6 character long"),
  ],
  loginController
);

router.get("/logout", authMiddleware(), logoutController);

module.exports = router;
