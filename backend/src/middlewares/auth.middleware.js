const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.authUser = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req?.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authorization token is missing",
        type: "Authorization_error",
      });
    }

    // Verify token
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(tokenData._id);
    if (!user) {
      return res.status(401).json({
        message: "User not found or unauthorized",
        type: "Authorization_error",
      });
    }

    // Attach user and tokenData to the request object
    req.user = user;
    req.tokenData = tokenData;

    return next();
  } catch (err) {
    // Generalized error response
    res.status(401).json({
      message: err.message || "Authorization failed",
      type: "Authorization_error",
    });
  }
};
