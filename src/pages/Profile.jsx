import {
  Avatar, Button, Card, Col, Divider, Form, Input, Row, Tabs, Tag, 
  message, List, Space, Modal, Select, DatePicker, ConfigProvider, theme, Skeleton, Typography
} from "antd";
import {
  UserOutlined, MailOutlined, LockOutlined, BookOutlined, 
  EditOutlined, PhoneOutlined, HomeOutlined, 
  CalendarOutlined, SafetyOutlined, StarOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import { getCourseStudent, changeStudentPassword, updateStudentProfile } from "../api/studentApi";
import "../style/Profile.css";

const { Option } = Select;
const { Title } = Typography;

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
      login({ user: { ...user, ...payload }, token: localStorage.getItem("token") });
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
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="profile-root">
        {/* BACKGROUND DECORATION */}
        <div className="profile-bg-glow"></div>

        <div className="container-limit">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="profile-wrapper"
          >
            <Row gutter={[32, 32]}>
              {/* LEFT SIDE: USER CARD */}
              <Col xs={24} lg={8}>
                <Card className="glass-card user-main-card">
                  <div className="user-header">
                    <div className="avatar-wrapper">
                      <Avatar size={120} icon={<UserOutlined />} className="avatar-img" src={user.avatar} />
                      <div className="online-status"></div>
                    </div>
                    <h2 className="user-name-title">{user.full_name}</h2>
                    <Tag className="role-tag">{user.role?.toUpperCase()}</Tag>
                  </div>

                  <div className="user-details-list">
                    <div className="detail-item">
                      <MailOutlined className="icon" />
                      <div className="text-box">
                        <span className="label">Email</span>
                        <span className="value">{user.email}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <PhoneOutlined className="icon" />
                      <div className="text-box">
                        <span className="label">Số điện thoại</span>
                        <span className="value">{user.phone || "Chưa cập nhật"}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <HomeOutlined className="icon" />
                      <div className="text-box">
                        <span className="label">Địa chỉ</span>
                        <span className="value">{user.address || "Chưa cập nhật"}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="primary" 
                    block 
                    icon={<EditOutlined />} 
                    className="btn-edit-profile"
                    onClick={() => {
                      form.setFieldsValue({
                        ...user,
                        date_of_birth: user.date_of_birth ? dayjs(user.date_of_birth) : null
                      });
                      setIsEditModalOpen(true);
                    }}
                  >
                    Chỉnh sửa hồ sơ
                  </Button>
                </Card>
              </Col>

              {/* RIGHT SIDE: TABS CONTENT */}
              <Col xs={24} lg={16}>
                <Card className="glass-card profile-content-card">
                  <Tabs 
                    defaultActiveKey="1" 
                    className="custom-profile-tabs"
                    items={[
                      {
                        key: '1',
                        label: <span><BookOutlined /> Khóa học của tôi</span>,
                        children: (
                          <div className="tab-pane-content">
                            {loadingCourse ? (
                              <Skeleton active avatar paragraph={{ rows: 5 }} />
                            ) : (
                              <List
                                dataSource={courses}
                                renderItem={(item) => (
                                  <motion.div whileHover={{ x: 5 }} className="course-list-card">
                                    <div className="course-icon-box">
                                      <BookOutlined />
                                    </div>
                                    <div className="course-info">
                                      <h4>{item.course_name}</h4>
                                      <Space>
                                        <Tag color="blue">{item.platform || "Online"}</Tag>
                                        <span className="status-text"><CalendarOutlined /> Đã tham gia</span>
                                      </Space>
                                    </div>
                                    <Button type="primary" className="btn-view-course">Vào học</Button>
                                  </motion.div>
                                )}
                                locale={{ emptyText: <div className="empty-state">Chưa có khóa học nào</div> }}
                              />
                            )}
                          </div>
                        )
                      },
                      {
                        key: '2',
                        label: <span><LockOutlined /> Bảo mật</span>,
                        children: (
                          <div className="tab-pane-content">
                            <Title level={4} style={{ marginBottom: 24 }}>Đổi mật khẩu</Title>
                            <Form layout="vertical" className="password-form" onFinish={async (v) => {
                              try {
                                await changeStudentPassword(user.id, {
                                  old_password: v.old, 
                                  new_password: v.new, 
                                  confirm_password: v.confirm
                                });
                                message.success("🔐 Đổi mật khẩu thành công");
                              } catch (e) { message.error(e.response?.data?.message || "Thất bại"); }
                            }}>
                              <Form.Item label="Mật khẩu hiện tại" name="old" rules={[{required:true}]}>
                                <Input.Password className="premium-input" />
                              </Form.Item>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item label="Mật khẩu mới" name="new" rules={[{required:true}]}>
                                    <Input.Password className="premium-input" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Xác nhận mật khẩu" name="confirm" rules={[{required:true}]}>
                                    <Input.Password className="premium-input" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Button type="primary" danger htmlType="submit" className="btn-update-pwd">
                                Xác nhận đổi mật khẩu
                              </Button>
                            </Form>
                          </div>
                        )
                      }
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </motion.div>
        </div>

        {/* MODAL CHỈNH SỬA */}
        <Modal
          title={<div className="modal-header-custom"><EditOutlined /> Cập nhật thông tin cá nhân</div>}
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          centered
          className="profile-edit-modal"
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateProfile} className="modal-form">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Họ và tên" name="full_name" rules={[{required: true}]}>
                  <Input prefix={<UserOutlined />} className="premium-input" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input prefix={<PhoneOutlined />} className="premium-input" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Địa chỉ cư trú" name="address">
              <Input prefix={<HomeOutlined />} className="premium-input" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Giới tính" name="gender">
                  <Select className="premium-select">
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                    <Option value="Khác">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="date_of_birth">
                  <DatePicker className="premium-datepicker" format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <div className="modal-footer">
              <Button onClick={() => setIsEditModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loadingUpdate} className="btn-save">
                Lưu hồ sơ
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}