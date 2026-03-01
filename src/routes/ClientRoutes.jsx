import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Profile from "../pages/Profile";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
