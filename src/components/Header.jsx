import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, RocketOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/Header.css";
import { useSystem } from "../context/SystemContext";

const { Header: AntHeader } = Layout;

export default function Header() {
  const { settings } = useSystem();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const userMenu = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    { key: "/", label: <Link to="/">Trang chủ</Link> },
    { key: "/courses", label: <Link to="/courses">Khóa học</Link> },
    { key: "/contact", label: <Link to="/contact">Dịch vụ</Link> },
  ];

  return (
    <AntHeader className="custom-header">
      {/* LEFT: LOGO */}
      <div className="header-logo" onClick={() => navigate("/")}>
        <RocketOutlined className="logo-icon" />
        <span className="logo-text">{settings.site_name}</span>
      </div>

      {/* CENTER: MENU */}
      <Menu 
        mode="horizontal" 
        selectedKeys={[location.pathname]} 
        items={menuItems} 
        className="header-menu"
      />

      {/* RIGHT: AUTH */}
      <div className="header-right">
        {!user ? (
          <Space size="middle">
            <Button type="primary" className="btn-register-header">
              <Link to="/login">Tham gia ngay</Link>
            </Button>
          </Space>
        ) : (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <div className="user-profile-trigger">
              <Avatar
                src={user.avatar} // Nếu có avatar URL
                icon={!user.avatar && <UserOutlined />}
                className="user-avatar"
              />
              <span className="user-name">{user.name || "Thành viên"}</span>
            </div>
          </Dropdown>
        )}
      </div>
    </AntHeader>
  );
}