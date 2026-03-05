import { Form, Input, Button, Typography, Card, message, Modal, Statistic, Space } from "antd";
import { 
  UserOutlined, LockOutlined, MailOutlined, 
  RocketTwoTone, ArrowRightOutlined, PhoneOutlined 
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSystem } from "../context/SystemContext";
import "../style/login.css";

const { Title, Text, Paragraph } = Typography;
const { Countdown } = Statistic;

export default function Auth() {
  const { settings } = useSystem();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [deadline, setDeadline] = useState(0);

  const triggerOtpModal = (id) => {
    setStudentId(id);
    setOtpVisible(true);
    setDeadline(Date.now() + 1000 * 60 * 5); // 5 phút
  };


const onFinish = async (values) => {
    setLoading(true);
    try {
      const url = isLogin
        ? "http://localhost:3009/api/user/loginuser"
        : "http://localhost:3009/api/user/register";

      // Nếu là đăng nhập, values sẽ chỉ chứa email và password
      // Nếu là đăng ký, values sẽ chứa đầy đủ name, email, phone, password
      const res = await axios.post(url, values);

      if (isLogin) {
        login({ user: res.data.user, token: res.data.token, remember: true });
        message.success("Chào mừng bạn trở lại!");
        navigate("/", { replace: true });
      } else {
        message.success("Mã xác thực đã được gửi về Email!");
        triggerOtpModal(res.data.student_id);
      }
    } catch (err) {
      // ... xử lý lỗi giữ nguyên
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async (values) => {
    setOtpLoading(true);
    try {
      await axios.post("http://localhost:3009/api/user/verify-otp", {
        student_id: studentId,
        otp: values.otp,
      });
      message.success("Xác thực thành công! Hãy đăng nhập.");
      setOtpVisible(false);
      setIsLogin(true);
    } catch (err) {
      message.error("Mã OTP không đúng hoặc đã hết hạn");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="auth-container"
      >
        <Card className="auth-card" bordered={false}>
          <div className="auth-logo-section">
            <div className="logo-circle">
              <RocketTwoTone twoToneColor="#1890ff" style={{ fontSize: 32 }} />
            </div>
            <Title level={2} className="brand-name">{settings.site_name}</Title>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="header-text">
                <Title level={3}>{isLogin ? "Đăng nhập" : "Tạo tài khoản"}</Title>
                <Text type="secondary">
                  {isLogin ? "Truy cập hệ thống quản trị ngay" : "Tham gia cùng đội ngũ của chúng tôi"}
                </Text>
              </div>

              <Form layout="vertical" onFinish={onFinish} size="large" className="mt-4">
                {!isLogin && (
                  <Form.Item name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                    <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
                  </Form.Item>
                )}
                <Form.Item name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                {/* 3. CHỈ HIỆN SỐ ĐIỆN THOẠI KHI ĐĂNG KÝ */}
                {!isLogin && (
                  <Form.Item 
                    name="phone" 
                    rules={[
                      { required: true, message: "Vui lòng nhập số điện thoại" },
                      { pattern: /^0[1-9][0-9]{8}$/, message: "Số điện thoại không hợp lệ" }
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
                  </Form.Item>
                )}
                <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading} block className="submit-btn">
                  {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"} <ArrowRightOutlined />
                </Button>

                <div className="auth-footer">
                  <Text type="secondary">{isLogin ? "Bạn là thành viên mới?" : "Đã có tài khoản?"}</Text>
                  <Button type="link" onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                    {isLogin ? "Đăng ký ngay" : "Quay lại đăng nhập"}
                  </Button>
                </div>
              </Form>
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>

      <Modal
        open={otpVisible}
        footer={null}
        centered
        closable={true}
        onCancel={() => setOtpVisible(false)}
        className="otp-modal"
        width={400}
      >
        <div className="otp-content">
          <div className="otp-icon-wrapper">
            <MailOutlined className="otp-icon-animate" />
          </div>
          <Title level={3} style={{ color: '#fff', marginBottom: 8 }}>Xác thực Email</Title>
          <div className="countdown-box">
            <Text style={{ color: '#94a3b8' }}>Mã hết hạn sau: </Text>
            <Countdown value={deadline} format="mm:ss" valueStyle={{ color: '#3b82f6', fontSize: '16px' }} />
          </div>

          <Form onFinish={handleVerifyOtp} layout="vertical">
            <Form.Item name="otp" rules={[{ required: true, len: 6, message: 'Nhập đủ 6 số' }]}>
              <Input.OTP length={6} className="custom-otp-input" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={otpLoading} block size="large" className="submit-btn">
              XÁC THỰC
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}