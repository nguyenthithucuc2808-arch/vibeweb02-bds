# CLAUDE.md — ThanhMienLand

Landing page tin đăng mua bán / cho thuê nhà đất. Bài thực hành HTML/CSS buổi 1 (Cybersoft).
Trang tĩnh, chạy trực tiếp trên trình duyệt — không server, không build, không framework.

## Kiến trúc

```
buoi1_bds/
├── .claude/
│   ├── CLAUDE.md        # Quy tắc + kiến trúc (file này)
│   └── skills/
│       └── tao-page/SKILL.md   # Lệnh /tao-page: tạo landing page mới vào pages/<slug>/
├── assets/
│   ├── css/style.css    # Toàn bộ style: biến :root, component, responsive
│   ├── js/main.js       # Dữ liệu mẫu (listings) + tương tác
│   ├── img/             # Ảnh local (hiện đang dùng ảnh Unsplash qua URL)
│   └── fonts/           # Font local (hiện dùng Google Fonts)
├── docs/
│   └── README.md        # Tài liệu chi tiết dự án
├── pages/               # Các trang con tạo bằng /tao-page, mỗi trang tự chứa:
│   └── <slug>/          #   index.html + assets/{css,js,img}
├── index.html           # Landing page chính
└── README.md            # Giới thiệu ngắn + cách chạy
```

- `index.html` chứa nội dung tĩnh của 9 section theo thứ tự: header → hero + tìm kiếm → tin tức → BĐS dành cho bạn → dự án → theo địa điểm → tiện ích → doanh nghiệp → footer.
- Riêng lưới tin đăng `#listingGrid` được render bằng JS từ mảng `listings` trong `main.js` (mỗi lần `PAGE_SIZE = 4` tin).
- Thư viện ngoài (chỉ qua CDN): Google Fonts Roboto, Font Awesome 6.5.2 (cdnjs). Ảnh: `images.unsplash.com/photo-<id>?auto=format&fit=crop&q=80&w=...`.

## Quy tắc

### Chung
- Nội dung hiển thị bằng **tiếng Việt**; comment code cũng tiếng Việt.
- Không thêm framework / bundler / npm. Giữ HTML + CSS + JS thuần.
- Không dùng tên, logo, thương hiệu của trang thật. Thương hiệu dự án là **ThanhMienLand** (logo: `ThanhMien<b>Land</b>`, icon `fa-solid fa-house-chimney`).
- Dữ liệu (tin đăng, dự án, hotline, email `@thanhmienland.vn`) là dữ liệu mẫu.

### HTML
- Semantic: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Mỗi section lớn có comment phân cách: `<!-- ================= TÊN ================= -->`.
- Ảnh luôn có `alt`; nút chỉ có icon phải có `aria-label`.
- Đường dẫn tài nguyên local luôn bắt đầu bằng `assets/`.

### CSS
- Đặt tên class theo **BEM**: `.block__element--modifier` (vd `.card__title`, `.btn--primary`).
- Màu, bo góc, shadow, chiều cao header lấy từ biến `:root` — **không hard-code màu chủ đạo**.
  - `--primary: #15a04a` (xanh lá), `--primary-dark: #0f7d39`.
- Thứ tự trong `style.css`: biến & reset → button → header → hero → section chung → từng component → footer → back-top/toast → responsive.
- Responsive desktop-first với 3 mốc: `1200px`, `992px`, `640px`. Không để trang cuộn ngang trên điện thoại.
- Khung ảnh có `background` xám làm placeholder khi ảnh lỗi.

### JavaScript
- JS thuần, `const`/`let`, arrow function; không dùng jQuery.
- Dữ liệu mẫu đặt ở đầu `main.js`; thêm tin đăng = thêm object vào `listings` (`img` là mã ảnh Unsplash).
- Ưu tiên event delegation (vd: nút lưu tin bắt sự kiện ở `#listingGrid`).
- Thông báo cho người dùng dùng chung `showToast(msg)`.

### Ảnh
- Chỉ dùng ảnh đã kiểm tra tải được và đúng chủ đề (nhà, căn hộ, thành phố). Không dùng picsum.photos (bị lỗi).
- Ảnh tải về để trong `assets/img/`, đặt tên kebab-case: `hero-1.jpg`, `project-sky-garden.jpg`.

## Khi sửa dự án
- Đổi tên file / thư mục → cập nhật đường dẫn trong `index.html` và cây thư mục ở file này.
- Thay đổi lớn (section mới, màu, thương hiệu, cấu trúc) → cập nhật `docs/README.md`.
- Chạy thử: mở `index.html` bằng Live Server (VS Code) và kiểm tra ở cả 3 mốc responsive.
