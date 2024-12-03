const dotenv = require("dotenv");
dotenv.config({ path: "src/.env" });
const cors = require("cors");

const express = require("express");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hellow world!");
});

// routes
app.use("/users", require("./routes/user.routes"));

module.exports = app;
