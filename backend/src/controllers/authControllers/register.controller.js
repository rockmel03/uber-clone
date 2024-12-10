const { validationResult } = require("express-validator");
const Captain = require("../../models/captain.model");
const User = require("../../models/user.model");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");
const userServices = require("../../services/user.services");
const captainService = require("../../services/captain.services");
const ApiResponse = require("../../utils/ApiResponse");

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw ApiError.validationError(errors.array());

  const { fullname, email, password, roles: reqRoles, vehicle } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User Already Exists");

  let user;
  let captain;

  try {
    const hasedPassword = await User.hashPassword(password);

    user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hasedPassword,
    });

    // Sanitize and validate roles
    const roles = reqRoles?.length
      ? reqRoles.filter((role) => ["user", "captain"].includes(role))
      : ["user"];

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
      captain = await captainService.createCaptain({
        vehicle,
        userId: user._id,
      });
    }

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
    // // If  creation fails, delete the document
    if (user) await User.findByIdAndDelete(user._id);
    if (captain) await Captain.findByIdAndDelete(captain._id);

    throw new ApiError(500, "Registration failed", [error]);
  }
});

module.exports = register;
