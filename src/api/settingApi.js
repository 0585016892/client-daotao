import axios from "axios";

const API_URL = "http://localhost:3009/api/settings"; // Điều chỉnh port của bạn

export const getSettings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
