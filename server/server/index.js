const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const cloudinary=require('./cloudinary')
const fs = require('fs');
const PORT = process.env.PORT || 3000;
var express = require("express"),
  http = require("http");
var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);
app.use(bodyParser.urlencoded({extended:false}))
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

app.post("/image", upload.single("file"),async (req, res) => {
  const uploader=async(path)=>await cloudinary.uploads(path,'Images')
  if(req.method === "POST"){
    console.log(req.file)
    const {path}=req.file
    const newPath=await cloudinary.uploader.upload(path)
    console.log('newpath',newPath)

    fs.unlinkSync(path)
  
  res.status(200).json({
    message : 'Image uploaded successfully',
    data :newPath
   })
  }else {
    res.status(405).json({ 
      err:"Images not uploaded successfully"
    })
  }
  
  // if (!req.file) {
  //   console.log("No file received");
  //   return res.send({
  //     success: false
  //   });
  // } else {
  //   console.log("file received");
  //   return res.send(req.file.originalname);
  // }
});

app.use("/", studentRouter);

app.use("/", instructorRouter);

app.use("/", adminRouter);

app.use("/", courseRouter);

// live chat part noor
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
