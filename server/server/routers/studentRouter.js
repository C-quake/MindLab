const express = require("express");
const multer = require("multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const upload = multer({ dest: "uploads/" });

var jwt = require("jsonwebtoken");
var student = require("../../database/index");

router.route("/api/newstudent").post((req, res) => {
  const saltRounds = 10;
  var obj = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      obj.password = hash;
      student.insertStudent(obj).then((data, err) => {
        if (err) res.send(err);

        console.log(data);
        res.send(data);
      });
    });
  });
});

router.route("/api/student/login").post(function (req, res, next) {
  let promise = student.findStudent({ email: req.body.email }).exec();

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

      }
    } else {
      return res
        .status(501)
        .json({ message: "Student email is not registered." });
    }
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: "Some internal error" });
  });
});

router.route("/api/update/student/:id").put((req, res) => {
  student.updateStudent(req.params.id, req.body).then((data) => {
    res.send(data);
  });
});

router.route("/api/student/:id").get((req, res) => {
  student.getStudentById(req.params.id).then((data) => {
    res.send(data);
  });
});

router.route("/api/studentemail/:email").get((req, res) => {
  student.getStudentByEmail(req.params.email).then((data) => {
    if (data && data.status === "banned")
      return res.send({ message: "user banned" });

    res.send(data);
  });
});

router.route("/api/student/ban/:id").put((req, res) => {
  student
    .changeStudentStatus(req.params.id, req.body)
    .then((data) => res.send(data));
});

router.route("/api/student").get((req, res) => {
  student.getAllStudents().then((data) => {
    res.send(data);
  });
});

module.exports = router;
