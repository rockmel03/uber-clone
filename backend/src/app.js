const dotenv = require("dotenv");
dotenv.config({ path: "src/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ApiError = require("./utils/ApiError");
const errorHandler = require("./utils/errorHandler");
const express = require("express");
const app = express();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hellow world!");
});

// routes
app.use("/users", require("./routes/user.routes"));

// 404 route handler middleware
app.use("/*", (req, res, next) => {
  const error = ApiError.notFoundError(req.originalUrl);
  next(error);
});
// default error handler
app.use(errorHandler);

module.exports = app;
