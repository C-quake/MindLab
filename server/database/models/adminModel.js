var mongoose = require("mongoose");

var adminSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "admin"
  }
});

var Admin = mongoose.model("admin", adminSchema);
module.exports.Admin = Admin;
