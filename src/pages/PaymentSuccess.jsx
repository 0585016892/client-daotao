import React, { useEffect, useState } from "react";
import { Result, Button, Card, ConfigProvider, theme, Typography } from "antd";
import { CheckCircleFilled, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Thêm thư viện hiệu ứng

const { Text } = Typography;

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/profile");
      return;
    }
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1f6feb",
          colorBgContainer: "#161b22",
          colorBorder: "#30363d",
        },
      }}
    >
      <div style={{ 
        background: "#0d1117", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Hiệu ứng nền mờ nhẹ phía sau */}
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(31,111,235,0.15) 0%, rgba(13,17,23,0) 70%)",
          top: "20%",
          left: "30%",
          filter: "blur(50px)"
        }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 500, padding: "20px", zIndex: 1 }}
        >
          <Card 
            className="payment-card"
            style={{ 
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "24px",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
            }}
          >
            <style>{`
              .payment-card .ant-result-icon { margin-bottom: 16px; }
              @keyframes pulse-glow {
                0% { box-shadow: 0 0 0 0 rgba(35, 134, 54, 0.4); }
                70% { box-shadow: 0 0 0 20px rgba(35, 134, 54, 0); }
                100% { box-shadow: 0 0 0 0 rgba(35, 134, 54, 0); }
              }
              .success-icon-glow {
                border-radius: 50%;
                animation: pulse-glow 2s infinite;
              }
            `}</style>

            <Result
              icon={
                <motion.div
                  initial={{ rotate: -45, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="success-icon-glow"
                  style={{ display: "inline-block" }}
                >
                  <CheckCircleFilled style={{ color: "#238636", fontSize: "80px" }} />
                </motion.div>
              }
              title={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span style={{ color: "#e6edf3", fontWeight: 800, fontSize: "28px", letterSpacing: "-0.5px" }}>
                    Thanh Toán Xong!
                  </span>
                </motion.div>
              }
              subTitle={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ marginTop: "12px" }}
                >
                  <Text style={{ color: "#8b949e", display: "block", fontSize: "16px" }}>
                    Chào mừng bạn đến với khóa học mới.
                  </Text>
                  <div style={{ 
                    marginTop: "15px", 
                    background: "rgba(31,111,235,0.1)", 
                    padding: "8px 20px", 
                    borderRadius: "100px",
                    display: "inline-block",
                    border: "1px solid rgba(31,111,235,0.2)"
                  }}>
                    <Text style={{ color: "#58a6ff", fontWeight: 600 }}>
                      Chuyển trang sau <span style={{ fontSize: "18px" }}>{countdown}</span>s
                    </Text>
                  </div>
                </motion.div>
              }
              extra={[
                <motion.div
                  key="btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<UserOutlined />}
                    style={{ 
                      borderRadius: "12px", 
                      height: "50px", 
                      padding: "0 40px",
                      fontWeight: 700,
                      background: "#1f6feb",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(31,111,235,0.3)"
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    Vào Profile Ngay
                  </Button>
                </motion.div>
              ]}
            />
          </Card>
        </motion.div>
      </div>
    </ConfigProvider>
  );
}