import axiosClient from "./axiosClient";

export const getCourses1 = (params) =>{
  return axiosClient.get("courses", {
    headers: {
    "ngrok-skip-browser-warning": "true"
  },
    params,
  });
}

export const getCourseDetail = (id) =>
  axiosClient.get(`/courses/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });

export const getCourses = (params) => {
  return axiosClient.get("courses", {
    params,
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  });
};