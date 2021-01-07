var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var Admin = require("../../database/index");

router.route("/create").post((req, res) => {
  const saltRounds = 10;
  var obj = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      obj.password = hash;
      Admin.insertAdmin(obj).then((data, err) => {
        if (err) res.send(err);
        res.end();
      });
    });
  });
});

router.route("/login").post((req, res) => {
  Admin.getAdminByEmail(req.body.email).then((data) => {
    var user = data[0];
    bcrypt.compare(req.body.password, user.password, (err, bool) => {
      if (bool) {
        res.send(user);
      } else {
        res.send({ message: "wrong password" });
      }
    });
  });
});

module.exports = router;
