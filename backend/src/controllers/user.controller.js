const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userServices = require("../services/user.services");
const captainService = require("../services/captain.services");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const BlackListToken = require("../models/blackListToken.model");
const Captain = require("../models/captain.model");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw ApiError.validationError(errors.array());

  const { fullname, email, password, roles: reqRoles, vehicle } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User Already Exists");

  // Sanitize and validate roles
  const roles = reqRoles?.length
    ? reqRoles.filter((role) => ["user", "captain"].includes(role))
    : ["user"];

  let captain;
  if (roles.includes("captain")) {
    // Ensure vehicle details are complete
    if (
      !vehicle ||
      !vehicle.color ||
      !vehicle.plate ||
      !vehicle.capacity ||
      !vehicle.vehicleType
    ) {
      throw ApiError.validationError([
        "Complete vehicle details are required for captains",
      ]);
    }

    // Create captain document
    captain = await captainService.createCaptain(vehicle);
  }
  try {
    const hasedPassword = await User.hashPassword(password);

    const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hasedPassword,
    });

    // Link captain document to user if applicable
    if (captain) {
      user.roles.push("captain");
      user.captain = captain._id;
      await user.save();
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Remove sensitive fields before sending response
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
          201,
          { token, user: userData },
          "User Registered Sucessfully!"
        )
      );
  } catch (error) {
    // If user creation fails, delete the captain document
    if (captain) await Captain.findByIdAndDelete(captain._id);

    throw new ApiError(500, "Registration failed", [error.message]);
  }
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
