const mongoose = require("mongoose");
const { response } = require("../app");

async function connectToDb() {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database! host : ", response.connection.host);
  } catch (err) {
    console.error("failed to connect database");
    throw err;
  }
}

module.exports = connectToDb;
