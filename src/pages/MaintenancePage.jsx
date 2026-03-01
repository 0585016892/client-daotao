import React from "react";
import { Button, Result, Typography, Space } from "antd";
import { 
  SettingOutlined, 
  FacebookOutlined, 
  MailOutlined, 
  PhoneOutlined 
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "../style/MaintenancePage.css";

const { Title, Text } = Typography;

export default function MaintenancePage({ message }) {
  return (
    <div className="maintenance-wrapper">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="maintenance-card"
      >
        <div className="maintenance-icon-box">
          <SettingOutlined spin className="gear-icon" />
        </div>

        <Title level={2} className="m-title">Hệ thống đang nâng cấp</Title>
        
        <Text type="secondary" className="m-desc">
          {message || "Chúng tôi đang thực hiện một số cải tiến để mang lại trải nghiệm tốt nhất cho bạn. Vui lòng quay lại sau ít phút."}
        </Text>

        <div className="contact-info-m">
          <Divider>Kết nối với chúng tôi</Divider>
          <Space size="large">
            <Space size="large">
                          {/* Nút Facebook có link */}
                          <a href="https://www.facebook.com/tran.khanh.hung.770881" target="_blank" rel="noopener noreferrer">
                            <Button type="text" icon={<FacebookOutlined />} className="social-btn" />
                          </a>
            
                          {/* Nút Email - tự động mở ứng dụng mail */}
                          <a href="mailto:tranhung6829@gmail.com">
                            <Button type="text" icon={<MailOutlined />} className="social-btn" />
                          </a>
            
                          {/* Nút Điện thoại - tự động kích hoạt cuộc gọi trên di động */}
                          <a href="tel:0336041807">
                            <Button type="text" icon={<PhoneOutlined />} className="social-btn" />
                          </a>
                        </Space>
          </Space>
        </div>

        <div className="m-footer">
          <Text disabled>© 2026 DUC THANG MEDIA - Quality over Quantity</Text>
        </div>
      </motion.div>
    </div>
  );
}

// Helper component
const Divider = ({ children }) => (
  <div className="m-divider">
    <span className="m-divider-text">{children}</span>
  </div>
);