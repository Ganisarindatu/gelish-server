import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    mainrole: {
      type: String,
      default: "user",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses", // Referensi ke koleksi Courses yang di-enroll
      },
    ],
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);


