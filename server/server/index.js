const express = require("express");
var app = express();
var http = require("http");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var nodemailer = require('nodemailer');
const fs = require('fs')


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
require("../database/index");

var studentRouter = require("./routers/studentRouter");
var instructorRouter = require("./routers/instructorRouter");
var adminRouter = require("./routers/adminRouter");
var courseRouter = require("./routers/courseRouter");

const DIR = "../front/src/assets/images";
var name_file;




app.use("/", studentRouter);

app.use("/", instructorRouter);

app.use("/", courseRouter);

app.use("/api/admin", adminRouter);







// email part 
var to;
var subject;
var description;
// var file;
// var path;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload0 = multer({
    storage: Storage
}).single("image"); //Field name and max count


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, callback) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    name_file = fileName;
    callback(null, fileName);
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, true);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

app.post('/api/sendemail',(req,res) => {
  upload0(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            to = req.body.to
            subject = req.body.subject
            description = req.body.description
            // file= req.body.file
            console.log(to)
            console.log(subject)
            console.log(description)
            // console.log(file)
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'mindlabsiteweb@gmail.com',
                  pass: 'mindlab123'
                }
              });
              
              var mailOptions = {
                from: 'mindlabsiteweb@gmail.com',
                to: to,
                subject:subject,
                text:description,
              //   attachments: [
              //     {
              //      file: file
              //     }
              //  ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                                 }
              });
        }
    })
})



// app.post("/image", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     console.log("No file received");
//     return res.send({
//       success: false
//     });
//   } else {
//     console.log("file received");
//     return res.send(req.file.originalname);
//   }
// });

// live chat part 
io.on("connection", function (socket) {
  console.log("user connected");

  socket.on("chat message", (message) => {
    console.log(message);
    io.emit("chat message", message);
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});






server.listen(PORT, function () {
  console.log(`started on port ${PORT}`);
});
