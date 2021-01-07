const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    IdInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    type: {
      // free/paid
      type: String
    },
    category: {
      type: String
    },
    price: {
      type: Number
    },
    picture: {
      type: String
    },
    video: {
      type: String
    },
    pdf: {
      type: String
    },
    likers: {
      type: [String]
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterUsername: String,
          text: String,
          timestamp: Number
        }
      ]
    },

    rates: {
      type: [
        {
          raterId: String,
          rates: Number
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

var CourseModel = mongoose.model("course", courseSchema);
module.exports.CourseModel = CourseModel;
