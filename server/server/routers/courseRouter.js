const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var Course = require("../../database/index");
var { CourseModel } = require("../../database/models/courseModel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const DIR = "../front/src/assets/uploads/courses/";
const storage = multer.diskStorage({});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 100024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});
cloudinary.config({
  cloud_name: "dtl8igxn0",
  api_key: "737957125387357",
  api_secret: "eyMhNYy2H39QyH-q5olfImKsquI"
});

router.route("/api/newCourse").post(upload.array("file", 2), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const video = await cloudinary.uploader.upload(req.files[0].path, {
    resource_type: "video"
  })
 
  const pdf = await cloudinary.uploader.upload(req.files[1].path, {resource_type: "image"})

  const product = new CourseModel({
    _id: new mongoose.Types.ObjectId(),
    IdInstructor: req.body.IdInstructor,
    title: req.body.title,
    description: req.body.description,
    video: video.url, 
    pdf: pdf.url,
    category: req.body.category,
    type: req.body.type,
    price: req.body.price
  });

  Course.addCourse(product)
    .then((data, err) => {
      if (err) res.send(err);
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/api/allcourses").get(function (req, res) {
  Course.findCourses()
    .sort()
    .then((courses, err) => {
      if (err) res.send(err);
      res.send(courses);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/api/course/:id").delete(function (req, res) {
  Course.deleteCourse(req.params.id)
    .then((course, err) => {
      if (err) res.send(err);
      res.send(course);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/api/course/:id").get(function (req, res) {
  Course.findCourseById(req.params.id).then((data) => {
    res.send(data);
  });
});

router.route("/api/course/comment/:id").patch((req, res) => {
  Course.courseComment(req.params.id, req.body).then((data) => {
    res.send(data);
  });
});
router.route("/api/course/edit/:id").patch((req, res) => {
  Course.editcommentCourse(req.params.id)
    .then((data) => {
      console.log(data);
      const thecomment = data.comments.find((comment) => {
        console.log(comment._id);
        console.log(req.body);
        return comment._id.equals(req.body.commentId);
      });

      if (!thecomment) return res.status(404).send("comment not found");
      thecomment.text = req.body.text;
      return data.save((err) => {
        console.log(data);
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.route("/api/course/delete-comment/:id").patch((req, res) => {
  Course.deletecommentCourse(req.params.id, req.body)
    .then((data, err) => {
      if (!err) return res.send(data);
      else return res.status(400).send(err);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.route("/api/course/rate/:id").patch((req, res) => {
  Course.courserate(req.params.id, req.body).then((data) => {
    res.send(data);
  });
});
router.route("/api/course/edit-rate/:id").patch((req, res) => {
  Course.editrateCourse(req.params.id)
    .then((data) => {
      console.log(data);
      const therate = data.rates.find((rate) => {
        console.log(rate._id);
        console.log(req.body);
        return rate._id.equals(req.body.rateId);
      });

      if (!therate) return res.status(404).send(" not found");
      therate.rates = req.body.rates;
      return data.save((err) => {
        console.log(data);
        if (!err) return res.status(200).send(data);
        return res.status(500).send(err);
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router
  .route("/api/update/course/:id")
  .put(upload.array("file", 2),async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
try{
  const video = await cloudinary.uploader.upload(req.files[0].path, {
    resource_type: "video"
  })
 
  const pdf = await cloudinary.uploader.upload(req.files[1].path, {resource_type: "image"})

  const product = new CourseModel({
    IdInstructor: req.body.IdInstructor,
    title: req.body.title,
    description: req.body.description,
    video: video.url, 
    pdf: pdf.url,
    category: req.body.category,
    type: req.body.type,
    price: req.body.price
  });


    Course.updateCourse(req.params.id, product)
      .then((data, err) => {
        if (err) res.send(err);
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }catch(err){
      console.log(err);
    }
  });

router.route("/api/course/instructor/:id").get((req, res) => {
  Course.findCourseByInstructor(req.params.id).then((data) => {
    res.send(data);
  });
});

module.exports = router;
