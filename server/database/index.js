var mongoose = require("mongoose");

var { Instructor } = require("./models/instructorModel");
var { Student } = require("./models/studentModel");
var { CourseModel } = require("./models/courseModel");


mongoose.connect("mongodb+srv://hbib:hbib@cluster0.m3m3t.mongodb.net/mindlab", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected!");
});

var insertInstructor = function (instructor) {
  return Instructor.create(instructor);
};

var insertStudent = function (student) {
  return Student.create(student);
};
var findStudent = function (student) {
  return Student.findOne(student);
};
var findInstructor = function (instructor) {
  return Instructor.findOne(instructor);
};

var updateStudent = function (id, student) {
  return Student.findByIdAndUpdate(id, student);
};

var updateInstructor = function (id, instructor) {
  return Instructor.findByIdAndUpdate(id, instructor);
};
var addCourse=function(course){
  return CourseModel.create(course);

}
var deleteCourse=function(id){
  return CourseModel.findByIdAndRemove(id);

}
var findCourses=function(){
  return CourseModel.find()
}

var getStudentById = function (id) {
  return Student.findOne({ _id: id });
};

var getInstructorById = function (id) {
  return Instructor.findOne({ _id: id });
};

var getInstructorByEmail = function (email) {
  return Instructor.findOne({ email: email });
};

var getStudentByEmail = function (email) {
  return Student.findOne({ email: email });
};
var updateCourse = function (id, course) {
  return CourseModel.findByIdAndUpdate(id, course);
};
var getCourseById= function (id){
  return CourseModel.findOne({ _id: id });
}

var courseComment=function (id, comment){
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $push:{ 
        comments:{
          commenterId:comment.commenterId,
          commenterUsername:comment.commenterUsername,
          text:comment.text,
          timestamp:new Date().getTime()
        }
      }
    },
    {new:true})
    
}
var editcommentCourse= function (id){
  return CourseModel.findById(id)
}
var deletecommentCourse=function (id,comment){
  return CourseModel.findByIdAndUpdate(id,{
    $pull:{
      comments:{
        _id:comment.commentId
      }
    }
  },{new:true})
}
var courserate=function (id,rate){
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $push:{ 
        rates:{
          raterId:rate.raterId,
          rates:rate.rates
        }
      }
    },
    {new:true})
    
}
var editrateCourse= function (id){
  return CourseModel.findById(id)
}
module.exports.getStudentByEmail = getStudentByEmail;
module.exports.getInstructorByEmail = getInstructorByEmail;
module.exports.insertInstructor = insertInstructor;
module.exports.insertStudent = insertStudent;
module.exports.updateStudent = updateStudent;
module.exports.updateInstructor = updateInstructor;
module.exports.findInstructor = findInstructor;
module.exports.findStudent = findStudent;
module.exports.getStudentById = getStudentById;
module.exports.getInstructorById = getInstructorById;
module.exports.deleteCourse = deleteCourse;
module.exports.updateCourse=updateCourse
module.exports.getCourseById=getCourseById
module.exports.addCourse = addCourse;
module.exports.findCourses = findCourses;
module.exports.courseComment=courseComment
module.exports.editcommentCourse= editcommentCourse
module.exports.deletecommentCourse=deletecommentCourse
module.exports.courserate=courserate
module.exports.editrateCourse=editrateCourse