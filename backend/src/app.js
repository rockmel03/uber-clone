const dotenv = require("dotenv");
dotenv.config({ path: "src/.env" });
const cors = require("cors");

const express = require("express");
const app = express();

//middlewares
app.use(cors());

app.get("/", (req, res) => {
  // throw new Error("this is a test error")
  res.send("hellow world!");
});

module.exports = app; 
