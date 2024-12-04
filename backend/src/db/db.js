const mongoose = require("mongoose");

async function connectToDb() {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database! host : ", response.connection.host);
  } catch (err) {
    console.error("failed to connect database");
    process.exit(1);
  }
}

module.exports = connectToDb;
