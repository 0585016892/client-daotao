import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Spin,
  Empty,
  Pagination,
} from "antd";
import { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";
import CourseCard from "../components/CourseCard";

const { Search } = Input;
const { Option } = Select;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== FILTER =====
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState(null);
  const [sort, setSort] = useState(null);

  // ===== PAGINATION =====
  const [page, setPage] = useState(1);
  const limit = 9;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [page, keyword, platform, sort]);

const fetchCourses = async () => {
  setLoading(true);

  const timer = setTimeout(async () => {
    try {
      const res = await getCourses({
        page,
        limit,
        keyword,
        platform,
        sort,
      });

      setCourses(res.data.data);
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  }, 300); // 👈 delay nhẹ

  return () => clearTimeout(timer);
};


  return (
    <div style={{ padding: "32px 0" ,background:'#0d1117'}}>
      {/* ===== FILTER BAR ===== */}
      <Card style={{ marginBottom: 24 ,background:'rgba(22, 27, 34, 0.6)'}}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Search
              placeholder="Tìm khóa học..."
              allowClear
              onSearch={(v) => {
                setKeyword(v);
                setPage(1);
              }}
            />
          </Col>

          <Col xs={12} md={8}>
            <Select
              allowClear
              placeholder="Nền tảng"
              style={{ width: "100%" }}
              onChange={(v) => {
                setPlatform(v || null);
                setPage(1);
              }}
            >
              <Option value="Facebook">Facebook</Option>
              <Option value="Google">Google</Option>
              <Option value="TikTok">TikTok</Option>
              <Option value="Zalo">Zalo</Option>
              <Option value="Instagram">Instagram</Option>
            </Select>
          </Col>

          <Col xs={12} md={8}>
            <Select
              allowClear
              placeholder="Sắp xếp"
              style={{ width: "100%" }}
              onChange={(v) => {
                setSort(v || null);
                setPage(1);
              }}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="price_asc">Giá tăng dần</Option>
              <Option value="price_desc">Giá giảm dần</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* ===== COURSE LIST ===== */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <Empty description="Không tìm thấy khóa học" />
      ) : (
        <div className={`course-wrapper ${loading ? "loading" : ""}`}>
          <Row gutter={[16, 24]} style={{ margin: "0 16px" }}>
            {courses
                .filter((c) => c.status === "Đang mở") // Chỉ giữ lại các khóa học đang hoạt động
                .map((c) => (
                  <Col xs={24} sm={12} lg={8} key={c.id}>
                    <CourseCard course={c} />
                  </Col>
                ))
              }
          </Row>

          {/* ===== PAGINATION ===== */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
