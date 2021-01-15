const express = require("express");
const multer = require("multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const upload = multer({ dest: "uploads/" });

var jwt = require("jsonwebtoken");
var student = require("../../database/index");
const ObjectID = require("mongoose").Types.ObjectId;


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
router.route("student/api/follow/:id").patch( async (req, res) => {

  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    // add to the follower list
    await Student.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    await Student.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err });
  }

});
// router.route("student/api/unfollow/:id").patch(async(req, res) => {
//   if (
//     !ObjectID.isValid(req.params.id) ||
//     !ObjectID.isValid(req.body.idToUnfollow)
//   )
//     return res.status(400).send("ID unknown : " + req.params.id);
//   try {
//     await Student.findByIdAndUpdate(
//       req.params.id,
//       { $pull: { following: req.body.idToUnfollow } },
//       { new: true, upsert: true },
//       (err, docs) => {
//         if (!err) res.status(201).json(docs);
//         else return res.status(400).json(err);
//       }
//     );
//     // remove to following list
//     await Student.findByIdAndUpdate(
//       req.body.idToUnfollow,
//       { $pull: { followers: req.params.id } },
//       { new: true, upsert: true },
//       (err, docs) => {
//         if (!err) return res.status(201).json(docs);
//         if (err) return res.status(400).json(err);
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }

// });
module.exports = router;
