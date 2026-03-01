import { Tabs, Form, Input, Button, Card, Row, Col, message } from "antd";
import {
  FaUserGraduate,
  FaLock,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const { TabPane } = Tabs;

export default function Auth() {
  const onLogin = (values) => {
    console.log("Login:", values);
    message.success("Đăng nhập thành công");
  };

  const onRegister = (values) => {
    console.log("Register:", values);
    message.success("Đăng ký thành công");
  };

  return (
    <div className="auth-page">
      <Row className="auth-wrapper">
        {/* LEFT */}
        <Col span={12} className="auth-left">
          <h1>ĐÀO TẠO MARKETING THỰC CHIẾN</h1>
          <p>Học là làm – Ra nghề nhanh</p>

          <ul>
            <li>✔ Giảng viên thực chiến</li>
            <li>✔ Thực hành 80%</li>
            <li>✔ Cam kết đầu ra</li>
          </ul>
        </Col>

        {/* RIGHT */}
        <Col span={12} className="auth-right">
          <Card className="auth-card">
            <Tabs defaultActiveKey="login" centered>
              {/* LOGIN */}
              <TabPane tab="Đăng nhập" key="login">
                <Form layout="vertical" onFinish={onLogin}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Nhập email" }]}
                  >
                    <Input prefix={<FaEnvelope />} />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Nhập mật khẩu" }]}
                  >
                    <Input.Password prefix={<FaLock />} />
                  </Form.Item>

                  <Button type="primary" block size="large" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form>
              </TabPane>

              {/* REGISTER */}
              <TabPane tab="Đăng ký" key="register">
                <Form layout="vertical" onFinish={onRegister}>
                  <Form.Item
                    label="Họ tên"
                    name="full_name"
                    rules={[{ required: true, message: "Nhập họ tên" }]}
                  >
                    <Input prefix={<FaUserGraduate />} />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Nhập email" }]}
                  >
                    <Input prefix={<FaEnvelope />} />
                  </Form.Item>

                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: "Nhập số điện thoại" }]}
                  >
                    <Input prefix={<FaPhone />} />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Nhập mật khẩu" }]}
                  >
                    <Input.Password prefix={<FaLock />} />
                  </Form.Item>

                  <Button type="primary" block size="large" htmlType="submit">
                    Đăng ký ngay
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
