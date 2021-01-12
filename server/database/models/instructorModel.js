var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var instructorSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  image: String,
  about: String,
  firstName: String,
  lastName: String,
  mobile: String,
  location: String,
  experience: Array,
  social: Object,
  role: {
    type: String,
    enum: ["instructor", "student", "admin"],
    default: "instructor"
  },
  status: {
    type: String,
    enum: ["active", "banned", "unverified"],
    default: "active"
  },
  provider: String
});

instructorSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

var Instructor = mongoose.model("Instructor", instructorSchema);
module.exports.Instructor = Instructor;
