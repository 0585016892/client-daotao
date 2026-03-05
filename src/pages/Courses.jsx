import React, { useEffect, useState, useCallback } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Spin,
  Empty,
  Pagination,
  ConfigProvider,
  theme,
  Skeleton, // Thêm Skeleton để load mượt hơn
} from "antd";
import { getCourses } from "../api/courseApi";
import CourseCard from "../components/CourseCard";
import _ from "lodash";

const { Option } = Select;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== FILTER STATE =====
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState(null);
  const [sort, setSort] = useState(null);

  // ===== PAGINATION STATE =====
  const [page, setPage] = useState(1);
  const limit = 9;
  const [total, setTotal] = useState(0);

  // Hàm gọi API thực tế
  const fetchCourses = async (searchParams) => {
    // Không setLoading(true) ở đây để tránh giật màn hình
    try {
      const res = await getCourses({
        page: searchParams.page,
        limit,
        keyword: searchParams.keyword,
        platform: searchParams.platform,
        sort: searchParams.sort,
      });
      setCourses(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce: Chỉ bắt đầu hiệu ứng loading sau khi người dùng ngừng gõ 500ms
  const debounceFetch = useCallback(
    _.debounce((params) => {
      fetchCourses(params);
    }, 500),
    []
  );

  useEffect(() => {
    const params = { page, keyword, platform, sort };
    
    // Khi gõ phím, ta chỉ kích hoạt loading nếu danh sách đang trống
    // Nếu đã có data, ta để nó fetch ngầm để tránh giật
    if (courses.length === 0) setLoading(true); 

    debounceFetch(params);
    return debounceFetch.cancel;
  }, [page, keyword, platform, sort, debounceFetch]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1f6feb",
          colorBgContainer: "#161b22",
          colorBorder: "#30363d",
        },
      }}
    >
      <div style={{ padding: "40px 0", background: "#0d1117", minHeight: "100vh" }}>
        
        <style>{`
          .ant-input-affix-wrapper, .ant-select-selector {
            border-radius: 10px !important;
            background-color: #0d1117 !important;
          }
          .filter-card {
            background: rgba(22, 27, 34, 0.8) !important;
            border: 1px solid #30363d !important;
            border-radius: 12px;
          }
          /* Hiệu ứng mờ dần khi đang tải ngầm */
          .fetching-overlay {
            opacity: 0.5;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
        `}</style>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          
          <Card className="filter-card" style={{ marginBottom: 40 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={10}>
                <Input
                  prefix={loading ? <Spin size="small" style={{marginRight: 8}} /> : "🔍"}
                  placeholder="Nhập tên khóa học..."
                  allowClear
                  size="large"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                  }}
                />
              </Col>
              <Col xs={12} md={7}>
                <Select
                  allowClear
                  placeholder="Chọn nền tảng"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(v) => { setPlatform(v || null); setPage(1); }}
                >
                  <Option value="Facebook">Facebook</Option>
                  <Option value="Google">Google</Option>
                  <Option value="TikTok">TikTok</Option>
                  <Option value="Zalo">Zalo</Option>
                </Select>
              </Col>
              <Col xs={12} md={7}>
                <Select
                  allowClear
                  placeholder="Sắp xếp"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(v) => { setSort(v || null); setPage(1); }}
                >
                  <Option value="newest">Mới nhất</Option>
                  <Option value="price_asc">Giá tăng dần</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Nếu chưa có data lần đầu thì hiện Skeleton, nếu có rồi thì chỉ làm mờ nhẹ danh sách cũ */}
          {loading && courses.length === 0 ? (
            <Row gutter={[24, 32]}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card style={{ background: '#161b22', border: 'none' }}>
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : courses.length === 0 ? (
            <Empty description={<span style={{color: '#8b949e'}}>Không tìm thấy dữ liệu</span>} />
          ) : (
            <div className={loading ? "fetching-overlay" : ""}>
              <Row gutter={[24, 32]}>
                {courses
                  .filter((c) => c.status === "Đang mở")
                  .map((c) => (
                    <Col xs={24} sm={12} lg={8} key={c.id}>
                      <CourseCard course={c} />
                    </Col>
                  ))}
              </Row>

              <div style={{ textAlign: "center", marginTop: 50 }}>
                <Pagination
                  current={page}
                  total={total}
                  pageSize={limit}
                  onChange={(p) => setPage(p)}
                  showSizeChanger={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
} 