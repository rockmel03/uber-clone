const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const BlackListToken = require("../models/blackListToken.model");
const ApiResponse = require("../utils/ApiResponse");

const authMiddleware =
  (roles = []) =>
  async (req, res, next) => {
    try {
      // Extract token
      const token =
        req?.cookies?.token || req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json(new ApiResponse(401, null, "Authorization token is missing"));
      }

      // Check if token is blacklisted
      const isBlacklisted = await BlackListToken.findOne({ token });
      if (isBlacklisted) {
        return res
          .status(401)
          .json(
            new ApiResponse(401, null, "Unauthorized, token is blacklisted")
          );
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

      // Role validation (if roles are provided)
      if (roles.length > 0) {
        const hasRequiredRole = roles.some((role) =>
          tokenData.roles?.includes(role)
        );
        if (!hasRequiredRole) {
          return res
            .status(403)
            .json(new ApiResponse(403, null, "Insufficient permissions"));
        }
      }

      // Fetch user
      const user = await User.findById(tokenData._id);
      if (!user) {
        return res
          .status(401)
          .json(new ApiResponse(401, null, "User not found or unauthorized"));
      }

      // Attach user and tokenData
      req.user = user;
      req.tokenData = tokenData;

      return next();
    } catch (err) {
      console.error("Authorization error:", err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Authorization failed"));
    }
  };

module.exports = authMiddleware;
