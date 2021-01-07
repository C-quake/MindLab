var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var studentSchema = mongoose.Schema({
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
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  image: String,
  about: String,
  firstName: String,
  lastName: String,
  mobile: String,
  location: String,
  experience: Array,
  social: Object,
  role: String,
  provider: String
});
studentSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

var Student = mongoose.model("Student", studentSchema);

module.exports.Student = Student;
