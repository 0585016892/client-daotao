import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn về đầu trang mỗi khi pathname (đường dẫn) thay đổi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Dùng "smooth" nếu muốn hiệu ứng trượt nhẹ
    });
  }, [pathname]);

  return null;
}