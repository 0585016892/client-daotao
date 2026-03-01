import axiosClient from "./axiosClient";

export const getCourses1 = (params) =>{
  return axiosClient.get("courses", {
    params,
  });
}

export const getCourseDetail = (id) =>
  axiosClient.get(`/courses/${id}`);

export const getCourses = (params) => {
  return axiosClient.get("courses", {
    params,
  });
};