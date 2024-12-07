const { validationResult } = require("express-validator");
const User = require("../../models/user.model");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const login = asyncHandler(async (req, res) => {
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
    .cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      sameSite: "strict", // Mitigate CSRF attacks
    })
    .json(new ApiResponse(200, { token, user: userData }, "Login Successful!"));
});

module.exports = login;
