import {
  Avatar, Button, Card, Col, Divider, Form, Input, Row, Tabs, Tag, 
  message, List, Space, Modal, Select, DatePicker
} from "antd";
import {
  UserOutlined, MailOutlined, LockOutlined, BookOutlined, 
  EditOutlined, SafetyOutlined, PhoneOutlined, HomeOutlined, 
  CalendarOutlined, ManOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import "../style/Profile.css";
import { getCourseStudent, changeStudentPassword, updateStudentProfile } from "../api/studentApi";

const { Option } = Select;

export default function Profile() {
  const { user, login } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user?.id) fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoadingCourse(true);
      const res = await getCourseStudent(user.id);
      setCourses(res.data.data || []);
    } finally {
      setLoadingCourse(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    setLoadingUpdate(true);
    try {
      const payload = {
        ...values,
        date_of_birth: values.date_of_birth ? values.date_of_birth.format("YYYY-MM-DD") : null,
      };
      await updateStudentProfile(user.id, payload);
      
      // Cập nhật lại context để UI thay đổi ngay lập tức
      login({ 
        user: { ...user, ...payload }, 
        token: localStorage.getItem("token") 
      });
      
      message.success("✨ Cập nhật hồ sơ thành công");
      setIsEditModalOpen(false);
    } catch (err) {
      message.error("❌ Cập nhật thất bại");
    } finally {
      setLoadingUpdate(false);
    }
  };

  if (!user) return <div className="profile-error">Vui lòng đăng nhập</div>;

  return (
    <div className="profile-page-wrapper">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="profile-container">
        <Row gutter={[24, 24]}>
          {/* LEFT: INFO CARD */}
          <Col xs={24} md={8}>
            <Card className="profile-side-card shadow-lg">
              <div className="avatar-section">
                <Avatar size={100} icon={<UserOutlined />} className="profile-avatar-img" />
                <h2 className="mt-3 text-white">{user.full_name}</h2>
                <Tag color="cyan">{user.role?.toUpperCase()}</Tag>
              </div>
              <Divider className="dark-divider" />
              <div className="quick-info">
                <p><MailOutlined /> {user.email}</p>
                <p><PhoneOutlined /> {user.phone || "Chưa cập nhật số điện thoại"}</p>
                <p><HomeOutlined /> {user.address || "Chưa cập nhật địa chỉ"}</p>
              </div>
              <Button 
                type="primary" 
                block 
                icon={<EditOutlined />} 
                onClick={() => {
                  form.setFieldsValue({
                    ...user,
                    date_of_birth: user.date_of_birth ? dayjs(user.date_of_birth) : null
                  });
                  setIsEditModalOpen(true);
                }}
                className="btn-gradient mt-3"
              >
                Chỉnh sửa hồ sơ
              </Button>
            </Card>
          </Col>

          {/* RIGHT: TABS */}
          <Col xs={24} md={16}>
            <Card className="profile-main-card shadow-lg">
              <Tabs defaultActiveKey="1" className="profile-tabs">
                <Tabs.TabPane tab={<span><BookOutlined /> Khóa học của tôi</span>} key="1">
                  <List
                    loading={loadingCourse}
                    dataSource={courses}
                    renderItem={(item) => (
                      <List.Item className="course-item-v2">
                        <Space size="middle">
                          <div className="icon-course"><BookOutlined /></div>
                          <div>
                            <div className="course-name">{item.course_name}</div>
                            <Tag color="processing">Đã đăng ký</Tag>
                          </div>
                        </Space>
                        <Button type="link">{item.status}</Button>
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>
                
                <Tabs.TabPane tab={<span><LockOutlined /> Đổi mật khẩu</span>} key="2">
                   <Form layout="vertical" onFinish={async (v) => {
                     try {
                        await changeStudentPassword(user.id, {
                          old_password: v.old, 
                          new_password: v.new, 
                          confirm_password: v.confirm
                        });
                        message.success("🔐 Đổi mật khẩu thành công");
                     } catch (e) { message.error(e.response?.data?.message || "Thất bại"); }
                   }}>
                      <Form.Item label="Mật khẩu cũ" name="old" rules={[{required:true}]}><Input.Password className="dark-input"/></Form.Item>
                      <Form.Item label="Mật khẩu mới" name="new" rules={[{required:true}]}><Input.Password className="dark-input"/></Form.Item>
                      <Form.Item label="Xác nhận" name="confirm" rules={[{required:true}]}><Input.Password className="dark-input"/></Form.Item>
                      <Button danger type="primary" htmlType="submit">Cập nhật mật khẩu</Button>
                   </Form>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </motion.div>

      {/* MODAL CHỈNH SỬA HỒ SƠ */}
      <Modal
        title="Cập nhật thông tin cá nhân"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        centered
        className="dark-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateProfile} className="mt-3">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ và tên" name="full_name" rules={[{required: true}]}>
                <Input prefix={<UserOutlined />} className="dark-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input prefix={<PhoneOutlined />} className="dark-input" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Địa chỉ" name="address">
            <Input prefix={<HomeOutlined />} className="dark-input" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Giới tính" name="gender">
                <Select className="dark-select" placeholder="Chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="date_of_birth">
                <DatePicker className="dark-input w-full" format="DD/MM/YYYY" placeholder="Chọn ngày sinh" />
              </Form.Item>
            </Col>
          </Row>

          <Divider className="dark-divider" />
          <div className="text-right">
            <Space>
              <Button onClick={() => setIsEditModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loadingUpdate} className="btn-gradient">
                Lưu thay đổi
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
}