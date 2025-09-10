const mongoose = require("mongoose");
const { logger } = require("../utils/logger.js");

async function connectToDb() {
  logger.info("connecting to database...");
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    logger.info("connected to database! host : " + response.connection.host);
  } catch (err) {
    logger.error("failed to connect database");
    process.exit(1);
  }
}

module.exports = connectToDb;
