import React, { useEffect, useState } from "react";
import {
  Avatar, Button, Card, Col, Divider, Form, Input, Row, Tabs, Tag, 
  message, List, Space, Modal, Select, DatePicker, ConfigProvider, theme, Skeleton, Typography,Spin, Descriptions
} from "antd";
import {
  UserOutlined, MailOutlined, LockOutlined, BookOutlined, 
  EditOutlined, PhoneOutlined, HomeOutlined, 
  CalendarOutlined, GlobalOutlined, ClockCircleOutlined, CreditCardOutlined, LoginOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";
import { getCourseStudent, changeStudentPassword, updateStudentProfile, payCourse ,checkAttendance,attendanceCourse} from "../api/studentApi";

const { Text, Title } = Typography;
const { Option } = Select;
const IMAGE_URL = `${process.env.REACT_APP_WEB_URL}/uploads/courses/`;

export default function Profile() {
  const { user, login } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [isAttended, setIsAttended] = useState(false);
const [loadingAttend, setLoadingAttend] = useState(false);
  const [isAttendModalOpen, setIsAttendModalOpen] = useState(false);
  const [selectedAttendCourse, setSelectedAttendCourse] = useState(null);
  const [meetLink, setMeetLink] = useState(null);

  useEffect(() => {
    if (user?.id) fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      setLoadingCourse(true);
      const res = await getCourseStudent(user.id);
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Lỗi tải khóa học:", err);
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

  const handleOpenPayment = (course) => {
    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };


const handleConfirmPayment = async () => {
  try {
    const res = await payCourse(
      selectedCourse.course_id,
      user.id,
      selectedCourse.fee
    );

    if (res.data?.payUrl) {
      window.location.href = res.data.payUrl;
    } else {
      message.error("Không nhận được link thanh toán");
    }

  } catch (error) {
    console.error(error);
    message.error("❌ Thanh toán thất bại!");
  } finally {
      setIsPaymentModalOpen(false);
  }
};

const handleOpenAttend = async (course) => {
  setSelectedAttendCourse(course);
  setMeetLink(null);
  setIsAttended(false);
  setIsAttendModalOpen(true);
  setLoadingAttend(true);

  try {
    const res = await checkAttendance(user.id, course.course_id);

    if (res.data.isAttended) {
      setIsAttended(true);
      setMeetLink(res.data.meetLink);
    } else {
      setIsAttended(false);
      setMeetLink(null);
    }
  } catch (err) {
    message.error("Lỗi kiểm tra điểm danh");
  } finally {
    setLoadingAttend(false);
  }
};
const handleAttendance = async () => {
  try {
    const res = await attendanceCourse({
      student_id: user.id,
      course_id: selectedAttendCourse.course_id,
    });

    if (res.data.success) {
      message.success(res.data.message);
      setMeetLink(res.data.meetLink);
      setIsAttended(true);
    } else {
      message.warning(res.data.message);

      // nếu backend báo đã điểm danh thì vẫn lấy link
      if (res.data.meetLink) {
        setMeetLink(res.data.meetLink);
        setIsAttended(true);
      }
    }
  } catch (err) {
    message.error("Lỗi điểm danh");
  }
};
  if (!user) return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}><Card><Title level={4}>Vui lòng đăng nhập để xem thông tin</Title><Button type="primary" icon={<LoginOutlined/>} href="/login">Đăng nhập</Button></Card></div>;

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div style={{ padding: '24px', background: '#141414', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {/* LEFT SIDE: USER CARD */}
            <Col xs={24} lg={8}>
              <Card
                title={<Title level={4} style={{ margin: 0 }}><UserOutlined /> Thông tin cá nhân</Title>}
                bordered={false}
                extra={
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={() => {
                      form.setFieldsValue({ ...user, date_of_birth: user.date_of_birth ? dayjs(user.date_of_birth) : null });
                      setIsEditModalOpen(true);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <Avatar size={128} src={user.avatar} icon={<UserOutlined />} style={{ border: '4px solid #303030', marginBottom: 16 }} />
                  <Title level={3} style={{ margin: 0 }}>{user.full_name}</Title>
                  <Text type="secondary">{user.email}</Text>
                   <Tag color="processing" style={{marginTop: 8, textTransform: 'uppercase', fontWeight: 'bold'}}>{user.role || "HỌC VIÊN"}</Tag>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions column={1} labelStyle={{ color: 'rgba(255, 255, 255, 0.65)' }} contentStyle={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    <Descriptions.Item label={<><MailOutlined /> Email</>}>{user.email}</Descriptions.Item>
                    <Descriptions.Item label={<><PhoneOutlined /> Số điện thoại</>}>{user.phone || 'Chưa cập nhật'}</Descriptions.Item>
                    <Descriptions.Item label={<><HomeOutlined /> Địa chỉ</>}>{user.address || 'Chưa cập nhật'}</Descriptions.Item>
                    <Descriptions.Item label={<><UserOutlined /> Giới tính</>}>{user.gender || 'Chưa cập nhật'}</Descriptions.Item>
                    <Descriptions.Item label={<><CalendarOutlined /> Ngày sinh</>}>{user.date_of_birth ? dayjs(user.date_of_birth).format("DD/MM/YYYY") : 'Chưa cập nhật'}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* RIGHT SIDE: TABS CONTENT */}
            <Col xs={24} lg={16}>
              <Card bordered={false}>
                <Tabs 
                  defaultActiveKey="1" 
                  items={[
                    {
                      key: '1',
                      label: <span><BookOutlined /> Khóa học của tôi</span>,
                      children: (
                          loadingCourse ? <Skeleton active avatar paragraph={{ rows: 5 }} /> : (
                              <List
                                itemLayout="horizontal"
                                dataSource={courses}
                                renderItem={(item) => <CourseItem
                                    item={item}
                                    onPay={handleOpenPayment}
                                    onEnter={handleOpenAttend}
                                  />}
                                locale={{ emptyText: <Text type="secondary">Bạn chưa đăng ký khóa học nào.</Text> }}
                              />
                            )
                      )
                    },
                    {
                      key: '2',
                      label: <span><LockOutlined /> Bảo mật</span>,
                      children: <SecurityTab userId={user.id} form={passwordForm}/>
                    }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* MODAL CẬP NHẬT HỒ SƠ */}
        <Modal
          title={<Title level={4} style={{ margin: 0 }}><EditOutlined /> Cập nhật thông tin cá nhân</Title>}
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          width={720}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateProfile} style={{marginTop: 24}}>
            <Row gutter={16}>
              <Col span={12}><Form.Item label="Họ và tên" name="full_name" rules={[{required: true, message: 'Vui lòng nhập họ tên'}]}><Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" /></Form.Item></Col>
              <Col span={12}><Form.Item label="Số điện thoại" name="phone"><Input prefix={<PhoneOutlined />} placeholder="090xxxxx" /></Form.Item></Col>
            </Row>
            <Form.Item label="Địa chỉ" name="address"><Input prefix={<HomeOutlined />} placeholder="Số nhà, tên đường,..." /></Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Giới tính" name="gender">
                  <Select placeholder="Chọn giới tính"><Option value="Nam">Nam</Option><Option value="Nữ">Nữ</Option></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="date_of_birth">
                  <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày sinh" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
              <Button onClick={() => setIsEditModalOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loadingUpdate}>Lưu thay đổi</Button>
            </div>
          </Form>
        </Modal>

        {/* MODAL THANH TOÁN */}
        <Modal
          title={<Title level={4} style={{ margin: 0 }}><CreditCardOutlined /> Xác nhận thanh toán</Title>}
          open={isPaymentModalOpen}
          onCancel={() => setIsPaymentModalOpen(false)}
          onOk={handleConfirmPayment}
          okText="Thanh toán ngay"
          cancelText="Để sau"
          width={640}
        >
          {selectedCourse && (
            <div style={{marginTop: 24}}>
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} sm={8}>
                  <Avatar shape="square" size={160} src={IMAGE_URL + selectedCourse.image} icon={<BookOutlined />} style={{ background: '#303030' }} />
                </Col>
                <Col xs={24} sm={16}>
                  <Tag color="orange" style={{ fontWeight: 'bold' }}>{selectedCourse.platform}</Tag>
                  <Title level={3} style={{ margin: '8px 0' }}>{selectedCourse.course_name}</Title>
                  <Text type="secondary">{selectedCourse.description}</Text>
                </Col>
              </Row>
              <Divider style={{ margin: '24px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
              <Descriptions column={2} labelStyle={{ color: 'rgba(255, 255, 255, 0.65)' }} contentStyle={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  <Descriptions.Item label={<><ClockCircleOutlined /> Thời lượng</>}>{`${selectedCourse.duration} phút`}</Descriptions.Item>
                  <Descriptions.Item label={<><CalendarOutlined /> Đăng ký ngày</>}>{dayjs(selectedCourse.enrolled_at).format("DD/MM/YYYY")}</Descriptions.Item>
                  <Descriptions.Item label={<><GlobalOutlined /> Nền tảng</>}>{selectedCourse.platform}</Descriptions.Item>
                  <Descriptions.Item label="Trạng thái"><Tag color="gold">{selectedCourse.status}</Tag></Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '24px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 102, 0, 0.1)', padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(255, 102, 0, 0.3)' }}>
                <Text strong style={{ fontSize: 18 }}>Tổng thanh toán:</Text>
                <Title level={2} type="warning" style={{ margin: 0, fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCourse.fee)}
                </Title>
              </div>
               <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>Hệ thống sẽ chuyển hướng bạn đến trang thanh toán an toàn.</Text>
            </div>
          )}
        </Modal>

        {/* MODAL ĐIỂM DANH */}
        <Modal
          title={<Title level={4} style={{ margin: 0 }}><ClockCircleOutlined /> Điểm danh lớp học</Title>}
          open={isAttendModalOpen}
          onCancel={() => setIsAttendModalOpen(false)}
          footer={null}
        >
          {selectedAttendCourse && (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Title level={4}>{selectedAttendCourse.course_name}</Title>
              <Divider />
              {loadingAttend ? (
                <Spin size="large" tip="Đang kiểm tra điểm danh..." />
              ) : !isAttended ? (
                <div style={{padding: '24px 0'}}>
                    <p style={{marginBottom: 24}}>Vui lòng nhấn nút bên dưới để xác nhận sự hiện diện của bạn trong buổi học hôm nay.</p>
                    <Button type="primary" size="large" icon={<LoginOutlined />} onClick={handleAttendance} style={{width:'100%'}}>
                      Điểm danh ngay
                    </Button>
                </div>
              ) : (
                <div style={{padding: '24px 0'}}>
                  <Tag color="green" style={{ fontSize: '16px', padding: '8px 16px', marginBottom: 24 }}>
                    🎉 Đã điểm danh thành công!
                  </Tag>
                  <p style={{marginBottom: 24}}>Vui lòng nhấn nút bên dưới để tham gia lớp học trên Google Meet.</p>
                  <Button
                    type="primary"
                    size="large"
                    danger
                    icon={<GlobalOutlined/>}
                    style={{ width:'100%' }}
                    onClick={() => window.open(meetLink, "_blank")}
                  >
                    Vào lớp học (Google Meet)
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}

/** COMPONENT CON: COURSE ITEM **/
const CourseItem = ({ item, onPay, onEnter }) => {
    const statusColors = {
        "Đang học": "processing",
        "Chờ xác nhận": "warning",
        "Đã hoàn thành": "success",
        "Đã hủy": "error"
    };

    return (
        <List.Item
            key={item.course_id}
            style={{ padding: '16px 0' }}
            actions={[
                item.status === "Chờ xác nhận" && (
                    <Button type="primary" ghost icon={<CreditCardOutlined />} onClick={() => onPay(item)}>Thanh toán ngay</Button>
                ),
                item.status === "Đang học" && (
                    <Button type="primary" icon={<LoginOutlined />} onClick={() => onEnter(item)}>Vào lớp học</Button>
                )
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar shape="square" size={64} src={IMAGE_URL + item.image} icon={<BookOutlined />} style={{ background: '#303030' }} />}
                title={<Text strong style={{ fontSize: 16 }}>{item.course_name}</Text>}
                description={
                    <Space direction="vertical" size={4}>
                         <Space size={4}>
                          <Tag color="blue" style={{ fontSize: 10, borderRadius: 4 }}>{item.platform}</Tag>
                          <Tag color={statusColors[item.status] || "default"}>{item.status === "Chờ xác nhận" ? "Chờ thanh toán" : item.status}</Tag>
                        </Space>
                        {item.fee > 0 && <Text type="secondary">Học phí: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.fee)}</Text>}
                    </Space>
                }
            />
        </List.Item>
    );
};

/** COMPONENT CON: SECURITY TAB **/
const SecurityTab = ({ userId, form }) => (
  <div style={{ maxWidth: 480, margin: '24px auto' }}>
      <Title level={4} style={{marginBottom: 24}}><LockOutlined /> Đổi mật khẩu bảo mật</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={async (v) => {
          try {
            await changeStudentPassword(userId, { old_password: v.old, new_password: v.new, confirm_password: v.confirm });
            message.success("🔐 Đổi mật khẩu thành công");
             form.resetFields();
          } catch (e) { message.error("Mật khẩu hiện tại không đúng hoặc xác nhận mật khẩu không khớp"); }
        }}
      >
        <Form.Item label="Mật khẩu hiện tại" name="old" rules={[{required: true, message: 'Vui lòng nhập mật khẩu cũ'}]}><Input.Password prefix={<LockOutlined/>} placeholder="********" /></Form.Item>
        <Row gutter={16}>
          <Col span={12}><Form.Item label="Mật khẩu mới" name="new" rules={[{required: true, message: 'Vui lòng nhập mật khẩu mới'}, {min: 6, message: 'Mật khẩu phải từ 6 ký tự'}]}><Input.Password prefix={<LockOutlined/>} placeholder="********" /></Form.Item></Col>
          <Col span={12}><Form.Item label="Xác nhận mật khẩu" name="confirm" rules={[{required: true, message: 'Vui lòng xác nhận mật khẩu'}, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('new') === value) { return Promise.resolve(); } return Promise.reject(new Error('Mật khẩu xác nhận không khớp!')); }, }),]}><Input.Password prefix={<LockOutlined/>} placeholder="********" /></Form.Item></Col>
        </Row>
         <Form.Item style={{marginTop: 32}}>
            <Button type="primary" danger htmlType="submit" style={{width: '100%'}}>
              Cập nhật mật khẩu
            </Button>
        </Form.Item>
      </Form>
  </div>
);