import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../api/courseApi";
import { Card, Tag, Button, Skeleton, Row, Col, Divider, message, Space, Modal, Typography } from "antd";
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  CheckCircleFilled, 
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { enrollCourse } from "../api/enrollmentApi";
import { useAuth } from "../context/AuthContext";
import "../style/CourseDetail.css";

const { Text, Title } = Typography;

export default function CourseDetail() {
  const UPLOAD_URL = process.env.REACT_APP_UPLOADS_URL || "http://localhost:3009/uploads";
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái Modal

  useEffect(() => {
    setLoading(true);
    getCourseDetail(id)
      .then((res) => setCourse(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  // Hàm xử lý khi nhấn nút Đăng ký ngoài giao diện
  const showConfirmModal = () => {
    if (!user) {
      message.warning("⚠️ Vui lòng đăng nhập để đăng ký khóa học");
      return;
    }
    setIsModalOpen(true);
  };

  // Hàm gọi API thực tế khi xác nhận trong Modal
  const confirmEnroll = async () => {
    setRegistering(true);
    try {
      await enrollCourse(user.id, course.id);
      message.success("Đăng ký thành công! Đội ngũ tư vấn sẽ liên hệ bạn ngay.");
      setIsModalOpen(false); // Đóng modal sau khi thành công
    } catch (err) {
      if (err.response?.status === 409) {
        message.warning("⚠️ Bạn đã đăng ký khóa học này rồi");
      } else {
        message.error("Đăng ký thất bại, vui lòng thử lại sau");
      }
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="detail-container"><Skeleton active paragraph={{ rows: 10 }} /></div>;
  if (!course) return null;

  return (
    <div className="detail-page-wrapper">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="detail-container">
        <Row gutter={[32, 32]}>
          {/* CỘT TRÁI: NỘI DUNG */}
          <Col xs={24} lg={16}>
            <div className="main-content-card">
              <div className="image-hero-wrapper">
                <img
                  alt={course.course_name}
                  src={imgError ? "https://via.placeholder.com/900x400?text=Course" : `${UPLOAD_URL}/courses/${course.image}`}
                  className="course-hero-img"
                  onError={() => setImgError(true)}
                />
                <div className="status-overlay"><Tag color="cyan">{course.status}</Tag></div>
              </div>

              <div className="course-info-section">
                <Space size="middle">
                  <Tag className="tag-custom blue">{course.platform}</Tag>
                  <Tag className="tag-custom purple">{course.course_code}</Tag>
                </Space>
                <h1 className="course-detail-title">{course.course_name}</h1>
                <Divider className="dark-divider" />
                <div className="description-box">
                  <h3 className="sub-title">Giới thiệu khóa học</h3>
                  <p>{course.description}</p>
                  <ul className="benefit-list">
                    <li><CheckCircleFilled /> Kiến thức thực chiến 100%</li>
                    <li><CheckCircleFilled /> Hỗ trợ sau khóa học trọn đời</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>

          {/* CỘT PHẢI: SIDEBAR */}
          <Col xs={24} lg={8}>
            <div className="sticky-sidebar">
              <Card className="enroll-card shadow-lg">
                <div className="price-tag">
                  <span className="label">Học phí ưu đãi</span>
                  <div className="amount">{Number(course.fee).toLocaleString()}đ</div>
                </div>
                <Divider className="dark-divider" />
                <div className="spec-list">
                  <div className="spec-item"><ClockCircleOutlined /> <span><b>Thời lượng:</b> {course.duration} buổi</span></div>
                  <div className="spec-item"><CalendarOutlined /> <span><b>Khai giảng:</b> {dayjs(course.start_date).format("DD/MM/YYYY")}</span></div>
                  <div className="spec-item"><SafetyCertificateOutlined /> <span><b>Cam kết:</b> Đào tạo thực chiến</span></div>
                </div>
                <Button type="primary" size="large" block className="btn-enroll-now" onClick={showConfirmModal}>
                  ĐĂNG KÝ HỌC NGAY
                </Button>
                <p className="guarantee-text">Hoàn tiền nếu không đúng cam kết</p>
              </Card>
            </div>
          </Col>
        </Row>
      </motion.div>

      {/* MODAL XÁC NHẬN ĐĂNG KÝ - ĐỒNG BỘ DARK THEME */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={450}
        className="dark-confirm-modal"
      >
        <div className="confirm-modal-content">
          <div className="confirm-icon"><ExclamationCircleOutlined /></div>
          <Title level={3} className="confirm-title">Xác nhận đăng ký</Title>
          <div className="course-summary-box">
            <p>Bạn đang đăng ký khóa học:</p>
            <h4>{course.course_name}</h4>
            <div className="summary-price">{Number(course.fee).toLocaleString()}đ</div>
          </div>

          <div className="confirm-notes">
            <p><InfoCircleOutlined /> Sau khi đăng ký, chúng tôi sẽ liên hệ bạn để hướng dẫn thanh toán và nhận tài liệu học tập.</p>
          </div>

          <Space className="confirm-actions" size="middle">
            <Button onClick={() => setIsModalOpen(false)} className="btn-cancel">Hủy bỏ</Button>
            <Button 
              type="primary" 
              loading={registering} 
              onClick={confirmEnroll}
              className="btn-confirm-final"
            >
              Xác nhận đăng ký
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
}