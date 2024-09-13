import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  enrollCourse, // Endpoint enroll kursus
  unenrollCourse,
} from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
// Endpoint untuk mendapatkan kursus yang di-enroll oleh pengguna
router.get("/mycourse", isAuth, getMyCourses);

// Endpoint untuk enroll kursus
router.post("/enroll", isAuth, enrollCourse); // Endpoint enroll kursus
router.post("/unenroll", isAuth, unenrollCourse);
export default router;
