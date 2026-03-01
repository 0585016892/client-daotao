import React from 'react';
import { Button, Row, Col, Typography, Space } from 'antd';
import { RocketOutlined, PlayCircleOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion'; // Thêm thư viện này
import '../style/HeroSection.css';
import Logo from '../style/image/logo.png'
const { Title, Paragraph } = Typography;

const HeroSection = () => {
  // Biến cấu hình hiệu ứng xuất hiện lần lượt
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="hero-container">
      <motion.div 
        className="hero-content" 
        style={{ width: '100%' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row gutter={[40, 40]} align="middle" justify="center">
          {/* Cột bên trái */}
          <Col xs={24} md={12}>
            <motion.div variants={itemVariants} className="badge">
              <SecurityScanOutlined /> Đối tác tin cậy hàng đầu
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Title level={1} className="hero-title">
                Giải pháp <span className="gradient-text">(ADS)</span> <br />
                & Bảo Mật Toàn Diện
              </Title>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Paragraph className="hero-description">
               Chúng tôi cung cấp các khóa đào tạo quảng cáo (Ads) chuyên sâu trên Facebook, TikTok và Google, tập trung vào hiệu quả thực tế và tính bền vững lâu dài. Không chỉ dạy cách chạy Ads ra đơn, chương trình còn hướng dẫn bảo mật tài khoản, tối ưu ngân sách và xây dựng chiến lược quảng cáo an toàn, giúp bạn tăng trưởng ổn định mà không lo khóa tài khoản hay lãng phí chi phí.
              </Paragraph>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Space size="middle">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<RocketOutlined />} 
                  className="btn-primary"
                >
                  Khám Phá Dịch Vụ
                </Button>
                <Button 
                  type="default" 
                  size="large" 
                  ghost 
                  icon={<PlayCircleOutlined />} 
                  className="btn-secondary"
                >
                  Tìm Hiểu Thêm
                </Button>
              </Space>
            </motion.div>
          </Col>

          {/* Cột bên phải với hiệu ứng Bay bồng bềnh (Floating) */}
          <Col xs={24} md={12} className="hero-image-wrapper">
            <motion.div 
              className="logo-box"
              animate={{ 
                y: [0, -15, 0], // Bay lên xuống
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
            <div className="logo-glow">
                <img src={Logo} alt="" />
              </div>
              <div className="logo-text">
                <h1 className="ptt">DUC THANG</h1>
                <span className="media">MEDIA</span>
              </div>
              <div className="logo-sub">Làm chủ Ads đa nền tảng – Tăng trưởng an toàn & bền vững</div>
              
              {/* Hiệu ứng hào quang phía sau logo */}
             
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default HeroSection;