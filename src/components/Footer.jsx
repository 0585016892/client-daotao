import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
import { 
  FacebookFilled, 
  SendOutlined, 
  RocketFilled, 
  PhoneFilled, 
  MailFilled, 
  EnvironmentFilled 
} from '@ant-design/icons';
import '../style/Footer.css';

const { Title, Text, Paragraph } = Typography;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <Row gutter={[40, 40]}>
          {/* Cột 1: Giới thiệu */}
          <Col xs={24} sm={12} lg={7}>
            <Space align="center" className="footer-logo">
              <RocketFilled style={{ color: '#4facfe', fontSize: '24px' }} />
              <Title level={4} style={{ color: '#fff', margin: 0 }}>
                DUC THANG MEDIA
              </Title>
            </Space>
            <Paragraph className="footer-description">
              Đối tác chiến lược giúp bạn đạt được mục tiêu kinh doanh trên không gian số 
              với hơn 5 năm kinh nghiệm trong lĩnh vực Digital Marketing và Mạng xã hội.
            </Paragraph>
            <Space size="middle">
              <div className="social-icon"><FacebookFilled /></div>
              <div className="social-icon"><SendOutlined /></div>
            </Space>
          </Col>

          {/* Cột 2: Dịch Vụ */}
          <Col xs={12} sm={12} lg={5}>
            <Title level={5} className="footer-column-title">Dịch Vụ</Title>
            <ul className="footer-links">
              <li>Mua Kênh Tik Tok</li>
              <li>Học Viên Facebook</li>
              <li>Mẹo Unlock Facebook - Tik Tok</li>
              <li>Dame FB - Tik Tok</li>
            </ul>
          </Col>

          {/* Cột 3: Hỗ Trợ */}
          <Col xs={12} sm={12} lg={5}>
            <Title level={5} className="footer-column-title">Hỗ Trợ</Title>
            <ul className="footer-links">
              <li>Thanh Toán</li>
              <li>Liên Hệ</li>
              <li>FAQ</li>
              <li>Chính Sách Bảo Mật</li>
              <li>Điều Khoản Sử Dụng</li>
            </ul>
          </Col>

          {/* Cột 4: Liên Hệ */}
          <Col xs={24} sm={12} lg={7}>
            <Title level={5} className="footer-column-title">Liên Hệ</Title>
            <Space direction="vertical" size="middle" className="contact-info">
              <Text><PhoneFilled className="contact-icon" /> Hotline: 0352649999</Text>
              <Text><MailFilled className="contact-icon" /> tiktoksafet@gmail.com</Text>
              <Text><EnvironmentFilled className="contact-icon" /> Việt Nam</Text>
            </Space>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <div className="footer-bottom">
          <Text>© {currentYear} PhamTuanTuMedia. Tất cả quyền được bảo lưu.</Text>
        </div>
      </div>
    </footer>
  );
}