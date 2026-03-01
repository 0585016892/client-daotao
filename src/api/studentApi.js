import axiosClient from "./axiosClient";


export const getCourseStudent = (id) =>
  axiosClient.get(`/student/${id}`);


// cập nhật thông tin
export const updateStudentProfile = (id, data) => {
  return axiosClient.put(`/students/${id}`, data);
};

// đổi mật khẩu
export const changeStudentPassword = (id, data) => {
  return axiosClient.put(`/students/${id}/change-password`, data);
};