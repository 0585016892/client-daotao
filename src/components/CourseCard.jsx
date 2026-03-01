import React from 'react';
import { Button, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled, FireFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import "../style/CourseCard.css";

export default function CourseCard({ course }) {
  console.log(course);
  
  const navigate = useNavigate();

  // Giả sử course.description là một mảng các tính năng, 
  // nếu là chuỗi bạn có thể split('\n')
  const features = [
    "Full mẹo cơ bản & nâng cao",
    "Video hướng dẫn chi tiết",
    "Hỗ trợ 1:1 trên Google Meet",
    "Add nhóm update thường xuyên"
  ];

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="custom-course-card"
    >
      {/* Badge Phổ biến phía trên cùng */}
      {course.is_popular && (
        <div className="popular-badge">
          <FireFilled /> PHỔ BIẾN
        </div>
      )}

      <div className="card-header">
        <h3 className="course-name">{course.course_name}</h3>
        <Tag className="level-tag">{course.status}</Tag>
      </div>

      <div className="price-section">
        {Number(course.fee).toLocaleString()}<span>đ</span>
      </div>

      <div className="feature-list">
        <div className="feature-item">{course.description}</div>
        {/* {features.map((item, index) => (
          <div key={index} className="feature-item">
            <CheckCircleFilled className="check-icon" />
            <span>{item}</span>
          </div>
        ))} */}
      </div>

      <Button
        type="primary"
        block
        className="btn-select-package"
        onClick={() => navigate(`/courses/${course.id}`)}
      >
        Chọn Gói Này
      </Button>
    </motion.div>
  );
}