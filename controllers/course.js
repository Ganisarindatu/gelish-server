import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import crypto from "crypto";


export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json({ course });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  if (!lectures.length) {
    return res
      .status(404)
      .json({ message: "No lectures found for this course" });
  }

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.enrolledCourses.includes(req.params.id)) {
    return res
      .status(400)
      .json({ message: "You are not enrolled in this course" });
  }

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found" });
  }

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.enrolledCourses.includes(lecture.course)) {
    return res
      .status(400)
      .json({ message: "You are not enrolled in this course" });
  }

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).populate("enrolledCourses");
  if (!user || !user.enrolledCourses.length) {
    return res
      .status(404)
      .json({ message: "You have not enrolled in any courses" });
  }

  res.json({ courses: user.enrolledCourses }); // Kirim daftar kursus yang di-enroll
});

export const enrollCourse = TryCatch(async (req, res) => {
  const userId = req.user._id;
  const courseId = req.body.courseId; // ID kursus dari request body

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  // Temukan user dan tambahkan kursus ke daftar enrolledCourses
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Pastikan kursus yang akan di-enroll ada
  const course = await Courses.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Tambahkan kursus ke enrolledCourses jika belum ada
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    await user.save();
  }

  res.json({ message: "Enrolled successfully" });
});

// controller untuk unenrolled courses

export const unenrollCourse = TryCatch(async (req, res) => {
  const userId = req.user._id;
  const courseId = req.body.courseId; // ID kursus dari request body

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  // Temukan user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Pastikan kursus yang ingin di-unenroll ada
  const course = await Courses.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Hapus kursus dari enrolledCourses jika ada
  if (user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== courseId
    );
    await user.save();
    res.json({ message: "Unenrolled successfully" });
  } else {
    res.status(400).json({ message: "You are not enrolled in this course" });
  }
});



//Untuk Progress yooo semangat abis skripsi nnti kita kembangin 

// export const addProgress = TryCatch(async (req, res) => {
//     const progress = await Progress.findOne({
//       user: req.user._id,
//       course: req.query.course,
//     });
  
  //   const { lectureId } = req.query;
  
  //   if (progress.completedLectures.includes(lectureId)) {
  //     return res.json({
  //       message: "Progress recorded",
  //     });
  //   }
  
  //   progress.completedLectures.push(lectureId);
  
  //   await progress.save();
  
  //   res.status(201).json({
  //     message: "new Progress added",
  //   });
  // });
  
  // export const getYourProgress = TryCatch(async (req, res) => {
  //   const progress = await Progress.find({
  //     user: req.user._id,
  //     course: req.query.course,
  //   });
  
  //   if (!progress) return res.status(404).json({ message: "null" });
  
  //   const allLectures = (await Lecture.find({ course: req.query.course })).length;
  
  //   const completedLectures = progress[0].completedLectures.length;
  
  //   const courseProgressPercentage = (completedLectures * 100) / allLectures;
  
  //   res.json({
  //     courseProgressPercentage,
  //     completedLectures,
  //     allLectures,
  //     progress,
  //   });
  // });
  