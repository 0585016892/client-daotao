import React from "react";
import { Row, Col, Card, Form, Input, Button, Space, Typography, message } from "antd";
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  SendOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "../style/Contact.css";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Contact values:", values);
    message.success("🚀 Tin nhắn của bạn đã được gửi đi. Chúng tôi sẽ phản hồi sớm nhất!");
    form.resetFields();
  };

  return (
    <div className="contact-page-wrapper">
      <div className="bg-glow contact-glow-1"></div>
      <div className="bg-glow contact-glow-2"></div>

      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-header">
          <Title level={1} className="gradient-text">Liên Hệ Với Chúng Tôi</Title>
          <Paragraph className="sub-text">
            Bạn có thắc mắc hay cần giải pháp Marketing chuyên sâu? Hãy để lại lời nhắn, 
            đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="contact-content">
          {/* LEFT: INFO CARD */}
          <Col xs={24} lg={10}>
            <Card className="contact-info-card shadow-lg">
              <div className="info-item">
                <div className="info-icon"><EnvironmentOutlined /></div>
                <div>
                  <Title level={4} className="info-title">Địa Chỉ</Title>
                  <Text className="info-text">Số 123, Đường ABC, Quận Cầu Giấy, Hà Nội</Text>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><PhoneOutlined /></div>
                <div>
                  <Title level={4} className="info-title">Hotline</Title>
                  <Text className="info-text">0987.654.321 - 0123.456.789</Text>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><MailOutlined /></div>
                <div>
                  <Title level={4} className="info-title">Email</Title>
                  <Text className="info-text">support@ducthangmedia.vn</Text>
                </div>
              </div>

              <Divider className="dark-divider" />

              <Title level={5} className="social-title">Theo dõi chúng tôi</Title>
              <Space size="large" className="social-links">
                <motion.a whileHover={{ y: -5 }} href="#"><FacebookOutlined /></motion.a>
                <motion.a whileHover={{ y: -5 }} href="#"><InstagramOutlined /></motion.a>
                <motion.a whileHover={{ y: -5 }} href="#"><YoutubeOutlined /></motion.a>
              </Space>
            </Card>
          </Col>

          {/* RIGHT: CONTACT FORM */}
          <Col xs={24} lg={14}>
            <Card className="contact-form-card shadow-lg">
              <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                className="dark-form"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      label="Họ và tên" 
                      name="name" 
                      rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                    >
                      <Input placeholder="Nguyễn Văn A" className="cyber-input" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item 
                      label="Số điện thoại" 
                      name="phone"
                      rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                    >
                      <Input placeholder="09xx xxx xxx" className="cyber-input" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item 
                  label="Email" 
                  name="email"
                  rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}
                >
                  <Input placeholder="example@gmail.com" className="cyber-input" />
                </Form.Item>

                <Form.Item 
                  label="Dịch vụ quan tâm" 
                  name="service"
                >
                  <Input placeholder="Ví dụ: Khóa học Facebook Ads, Dịch vụ Bảo mật..." className="cyber-input" />
                </Form.Item>

                <Form.Item 
                  label="Lời nhắn" 
                  name="message"
                  rules={[{ required: true, message: "Vui lòng để lại lời nhắn" }]}
                >
                  <TextArea rows={4} placeholder="Tôi muốn tư vấn về..." className="cyber-input" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />} 
                  block 
                  className="btn-send-contact"
                >
                  GỬI YÊU CẦU NGAY
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

// Helper component for Divider (nếu chưa có trong antd import)
const Divider = ({ className }) => <div className={className} style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />;