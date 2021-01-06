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
  role: String,
  store: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  provider: String
});

instructorSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

var Instructor = mongoose.model("Instructor", instructorSchema);
module.exports.Instructor = Instructor;
