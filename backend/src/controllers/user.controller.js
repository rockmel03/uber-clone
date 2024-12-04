const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userServices = require("../services/user.services");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User Already Exists");

  const hasedPassword = await User.hashPassword(password);

  const user = await userServices.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hasedPassword,
  });

  const token = user.generateAuthToken();

  res
    .status(201)
    .json(
      new ApiResponse(202, { token, user }, "User Registered Sucessfully!")
    );
});
