const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var instructor = require("../../database/index");
var  {Instructor } = require("../../database/models/instructorModel");
var  {Student } = require("../../database/models/studentModel");

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

router.route("/api/instructor/follow/:id").patch( async (req, res) => {
  try {
    // add to the follower list
    if(req.body.role==='student'){
      await Student.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
            if (!err) res.status(201).json(docs);
          
            else return res.status(400).json(err);
          
    })
  }else {
    await Instructor.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);

        else return res.status(400).json(err);
       
      }
    );
  }
    // add to following list
   
    await Instructor.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err)  {
          // return res.status(201).json(docs)   
        // }  else {
          if (err) return res.status(400).json(err);
        // }  
      }
    );
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }

});
router.route("/api/instructor/unfollow/:id").patch(async(req, res) => {
 
  try {
    if(req.body.role==='student'){
    await Student.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    )
  }else {
    await Instructor.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    )
  }
    // remove to following list
 
    await Instructor.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
      // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );
    
  } catch (err) {
    return res.status(500).json({ message: err });
  }

});

module.exports = router;
