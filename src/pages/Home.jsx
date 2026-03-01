import { Row, Col, Card, Button, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCourses1 } from "../api/courseApi";
import "../style/home.css";
import HeroSection from '../components/HeroSection';
import CourseCard from "../components/CourseCard";
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  SafetyOutlined, 
  HistoryOutlined, 
  CustomerServiceOutlined, 
  DollarOutlined, 
  BookOutlined, 
  SettingOutlined
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourses1({ page: 1, limit: 6 });
      setCourses(res?.data?.data || []);
    } catch (err) {
      console.error("Load courses error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. INTRO SECTION - ƯU ĐIỂM */}
      <section className="section-intro-v2">
        <div className="container">
          <Row gutter={[32, 32]}>
            {[
              { icon: <ThunderboltOutlined />, title: "Thực hành 80%", desc: "Học trực tiếp trên dự án & tài khoản thật", color: "#4facfe" },
              { icon: <SafetyCertificateOutlined />, title: "Chuyên gia hỗ trợ", desc: "Đội ngũ Mentor thực chiến kèm cặp 1:1", color: "#722ed1" },
              { icon: <GlobalOutlined />, title: "Cộng đồng lớn", desc: "Tham gia mạng lưới học viên rộng khắp", color: "#52c41a" }
            ].map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="intro-card-v2">
                    <div className="icon-box" style={{ color: item.color }}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
{/* SECTION: TẠI SAO CHỌN CHÚNG TÔI */}
<section className="section-why-us">
  <div className="container">
    <div className="section-header center">
      <Title level={2} className="gradient-text-blue">Tại Sao Chọn Chúng Tôi?</Title>
      <Paragraph className="sub-text">
        Chúng tôi cung cấp các giải pháp tối ưu hóa và bảo mật Facebook giúp bạn kiểm soát tốt hơn tài khoản cá nhân hoặc doanh nghiệp.
      </Paragraph>
    </div>

    <Row gutter={[24, 24]}>
      {[
        { 
          icon: <SafetyOutlined />, 
          title: "Bảo Mật Tuyệt Đối", 
          desc: "Cam kết không lưu giữ thông tin khách hàng, bảo mật toàn diện mọi giao dịch với công nghệ mã hóa tiên tiến." 
        },
        { 
          icon: <HistoryOutlined />, 
          title: "Xử Lý Nhanh Chóng", 
          desc: "Xử lý yêu cầu 24/7, hoàn thành nhanh chóng chỉ từ 5-30 phút cho các dịch vụ cơ bản." 
        },
        { 
          icon: <CustomerServiceOutlined />, 
          title: "Hỗ Trợ 24/7", 
          desc: "Đội ngũ chuyên viên luôn sẵn sàng hỗ trợ mọi vấn đề khách hàng gặp phải bất cứ lúc nào." 
        },
        { 
          icon: <DollarOutlined />, 
          title: "Giá Cả Cạnh Tranh", 
          desc: "Giá dịch vụ tốt nhất thị trường với chất lượng đảm bảo theo tiêu chuẩn cao nhất." 
        },
        { 
          icon: <BookOutlined />, 
          title: "Khóa Học Chuyên Sâu", 
          desc: "Hệ thống khóa học được thiết kế thực chiến, giúp học viên làm chủ kiến thức từ cơ bản đến nâng cao." 
        },
        { 
          icon: <SettingOutlined />, 
          title: "Công Cụ Chuyên Nghiệp", 
          desc: "Cung cấp hệ sinh thái công cụ hỗ trợ Marketing và quản lý tài khoản tối ưu." 
        }
      ].map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="feature-glass-card">
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
</section>
      {/* 3. FEATURED COURSES */}
      <section className="section-courses">
        <div className="container">
          <div className="section-header">
            <Title level={2} className="gradient-text">Khóa Học Nổi Bật</Title>
            <Paragraph className="sub-text">Lựa chọn lộ trình phù hợp để bắt đầu sự nghiệp Marketing của bạn</Paragraph>
          </div>

          {loading ? (
            <div className="loading-state"><Spin size="large" /></div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Row gutter={[32, 32]}>
                {courses
                  .filter((c) => c.status === "Đang mở") // Chỉ giữ lại các khóa học đang hoạt động
                  .map((c) => (
                    
                    <Col xs={24} sm={12} lg={8} key={c.id}>
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
                      <CourseCard course={c} />

                                  </motion.div>
                    </Col>
                  ))
                }
              </Row>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. CTA SECTION - CAM KẾT */}
      <section className="section-cta">
        <div className="cta-blur-bg"></div>
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Title level={2}>Bắt Đầu Hành Trình Của Bạn</Title>
          <Paragraph style={{color:'white'}}>
            Tham gia cùng hàng ngàn học viên đã thay đổi thu nhập và tư duy Marketing cùng DUC THANG Media.
          </Paragraph>
          <Button size="large" className="btn-cta-primary" onClick={() => navigate('/courses')}>
            KHÁM PHÁ NGAY
          </Button>
        </motion.div>
      </section>
    </div>
  );
}