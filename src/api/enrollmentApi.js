// src/api/enrollmentApi.js
import axios from "./axiosClient";

export const enrollCourse = (studentId, courseId) => {
  return axios.post("/enrollments", {
    student_id: studentId,
    course_id: courseId,
    headers: {
    "ngrok-skip-browser-warning": "true"
  },
  });
};
