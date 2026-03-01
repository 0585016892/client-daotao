import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoute";
import Contact from "./pages/Contact";

import { useSystem } from "./context/SystemContext";
import MaintenancePage from "./pages/MaintenancePage"; 
function App() {
  const { settings, loading } = useSystem();

  if (loading) return null; // Hoặc loading spinner

  // Nếu đang bật bảo trì, chặn khách hàng lại (trừ khi là Admin - logic này tùy bạn thêm)
  if (settings.maintenance_mode === "true") {
    return <MaintenancePage message={settings.maintenance_msg} />;
  }
  return (
    <>
      <ScrollToTop />

      <Header />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* PRIVATE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
