const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password)
    throw ApiError.validationError(["All fields are required"]);

  const user = await User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
