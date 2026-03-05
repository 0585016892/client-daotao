import axiosClient from "./axiosClient";

/**
 * Lấy cấu hình hệ thống (site name, logo, contact, v.v.)
 */
export const getSettings = async () => {
  try {
    // Sử dụng axiosClient đã cấu hình sẵn
    const response = await axiosClient.get("/settings");
    
    // Thông thường axios trả về object có thuộc tính data
    return response.data;
  } catch (error) {
    console.error("API GetSettings Error:", error);
    // Throw error để component gọi hàm này có thể bắt được và hiển thị thông báo
    throw error;
  }
};