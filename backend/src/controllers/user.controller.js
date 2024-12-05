const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userServices = require("../services/user.services");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw ApiError.validationError(errors.array());

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
  const userData = user.toObject();
  delete userData.password;
  res
    .status(201)
    .json(
      new ApiResponse(
        202,
        { token, user: userData },
        "User Registered Sucessfully!"
      )
    );
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw ApiError.validationError(errors.array());

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, "Invalid email or passwerd");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(400, "Invalid email or passwerd");

  const token = user.generateAuthToken();

  const userData = user.toObject();
  delete userData.password;

  res
    .status(200)
    .json(new ApiResponse(200, { token, user: userData }, "Login Successful!"));
});
