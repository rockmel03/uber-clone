const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userServices = require("../services/user.services");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const BlackListToken = require("../models/blackListToken.model");

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
    .cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      sameSite: "strict", // Mitigate CSRF attacks
    })
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
    .cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      sameSite: "strict", // Mitigate CSRF attacks
    })
    .json(new ApiResponse(200, { token, user: userData }, "Login Successful!"));
});

module.exports.getUserProfile = asyncHandler(async (req, res) => {
  const userData = req.user;
  return res.status(200).json(ApiResponse.success(userData));
});

module.exports.logoutUser = asyncHandler(async (req, res) => {
  const token =
    req?.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No token provided"));
  }

  try {
    // Blacklist the token using findOneAndUpdate with upsert
    await BlackListToken.findOneAndUpdate(
      { token }, // Query to find the token
      { token }, // No change to token, just "re-save"
      { upsert: true, new: true } // Insert a new document if not found
    );
  } catch (err) {
    console.error("Error blacklisting token:", err.message);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error blacklisting token"));
  }

  // Clear the token cookie with consistent settings
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
    sameSite: "strict", // Protects against CSRF
    path: "/", // Ensure this matches the path of your cookie
  });

  // Send success response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
