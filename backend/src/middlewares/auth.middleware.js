const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const BlackListToken = require("../models/blackListToken.model");
const ApiResponse = require("../utils/ApiResponse");

module.exports.authUser = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req?.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Authorization token is missing"));
    }

    // Check if token is blacklisted
    const blacklistedToken = await BlackListToken.findOne({ token });
    if (blacklistedToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Unauthorized, token is blacklisted"));
    }

    // Verify token
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid or expired token"));
    }

    // Fetch user from database
    const user = await User.findById(tokenData._id);
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "User not found or unauthorized"));
    }

    // Attach user and tokenData to the request object
    req.user = user;
    req.tokenData = tokenData;

    // Proceed to the next middleware or route handler
    return next();
  } catch (err) {
    console.error("Authorization error:", err);
    // Generalized error response
    return res
      .status(401)
      .json(new ApiResponse(401, null, err.message || "Authorization failed"));
  }
};
