const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var instructor = require("../../database/index");

router.route("/api/newinstructor").post((req, res) => {
  const saltRounds = 10;
  var obj = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      obj.password = hash;
      instructor.insertInstructor(obj).then((data, err) => {
        if (err) res.send(err);

        console.log(data);
        res.send(data);
      });
    });
  });
});

router.route("/api/instructor/login").post(function (req, res, next) {
  let promise = instructor.findInstructor({ email: req.body.email }).exec();

  promise.then(function (data) {
    if (data) {
      if (data.isValid(req.body.password)) {
        // generate token
        let token = jwt.sign(
          { username: data.username },
          "n1h2b100jk5525sd522hd442yg242d2d2sbdhjbd",
          { expiresIn: "3h" }
        );
        if (data.status === "banned") {
          return res.send({ message: "User Banned" });
        }
        return res.status(200).json({ data: data, token: token });
      } else {
        return res.status(501).json({ message: "Invalid Credentials" });
      }
    } else {
      return res
        .status(501)
        .json({ message: "instructor email is not registered." });
    }
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: "Some internal error" });
  });
});

router.route("/api/update/instructor/:id").put((req, res) => {
  instructor.updateInstructor(req.params.id, req.body).then((data) => {
    res.send(data);
  });
});

router.route("/api/instructor/:id").get((req, res) => {
  instructor.getInstructorById(req.params.id).then((data) => {
    res.send(data);
  });
});

router.route("/api/instructoremail/:email").get((req, res) => {
  instructor.getInstructorByEmail(req.params.email).then((data) => {
    if (data && data.status === "banned") {
      return res.send({ message: "user banned" });
    }

    res.send(data);
  });
});

router.route("/api/instructor").get((req, res) => {
  instructor.getAllInstructors().then((data) => {
    res.send(data);
  });
});

router.route("/api/instructor/ban/:id").put((req, res) => {
  instructor
    .changeInstructorStatus(req.params.id, req.body)
    .then((data) => res.send(data));
});

module.exports = router;
