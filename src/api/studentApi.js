import axiosClient from "./axiosClient";

// Lấy danh sách khóa học của học viên
export const getCourseStudent = (id) =>
  axiosClient.get(`/student/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });

// Cập nhật thông tin
export const updateStudentProfile = (id, data) => {
  return axiosClient.put(`/students/${id}`, data, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });
};

// Đổi mật khẩu
export const changeStudentPassword = (id, data) => {
  return axiosClient.put(`/students/${id}/change-password`, data, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  } );
};

// Tạo thanh toán MoMo
export const payCourse = (courseId, userId, amount) => {
  return axiosClient.post(`/students/${courseId}/momo`, {
    user_id: userId,
    amount: amount,
  });
};
// CHECK đã điểm danh
export const checkAttendance = (student_id, course_id) => {
  return axiosClient.get("/attendance/check", {
    params: { student_id, course_id },
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });
};

// POST điểm danh
export const attendanceCourse = (data) => {
  return axiosClient.post("/attendance", data, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });
};