const BlackListToken = require("../../models/blackListToken.model");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const logout = asyncHandler(async (req, res) => {
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
      .json(new ApiResponse(500, null, "Error blacklisted token"));
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

module.exports = logout;
