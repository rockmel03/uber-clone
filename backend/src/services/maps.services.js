const axios = require("axios");
const ApiError = require("../utils/ApiError");

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.getAddressCoordinates = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response?.data?.results[0]?.geometry?.location);
    const location = response?.data?.results[0]?.geometry?.location;

    return {
      ltd: location?.lat,
      lng: location?.lng,
    };
  } catch (error) {
    throw new ApiError(500, "Internal server error", error.message);
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination)
    throw new Error("Origin & destination are required");

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURIComponent(
    destination
  )}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (!response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
      throw ApiError.notFoundError("Routes");
    }
    return response.data.rows[0].elements[0];
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", error.message);
  }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
  if (!input) throw new ApiError(400, "query is required");

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data?.predictions);
    return response.data?.predictions;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", error.message);
  }
};