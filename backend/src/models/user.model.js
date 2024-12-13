const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCOUNT_TYPES: ROLES } = require("../constants");

const userShema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        require: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    roles: {
      type: [String], // array of strings
      enum: ROLES,
      default: ["user"],
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      validate: {
        validator: async function (value) {
          if (!this.roles.includes("captain")) return true;
          const captainExists = await mongoose.models.Captain.findById(value);
          return !!captainExists; // True if the referenced captain exists (The primary use of !! is to ensure the value is strictly a true or false Boolean, rather than a truthy or falsy value.)
        },
        message: "Referenced captain does not exist",
      },
    },
  },
  { timestamps: true }
);

userShema.pre("save", function (next) {
  // Automatically clear captain reference if roles do not include 'captain'
  if (!this.roles.includes("captain")) {
    this.captain = null;
  }
  next();
});

userShema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, roles: this.roles },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

userShema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userShema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userShema);

module.exports = User;
