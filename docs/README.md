# Tài liệu dự án ThanhMienLand

Cập nhật: 11/11/2026

## Tổng quan

ThanhMienLand là landing page tin đăng mua bán, cho thuê nhà đất, bố cục theo mô hình các cổng bất động sản lớn ở Việt Nam. Đây là bài thực hành HTML/CSS buổi 1 tại Cybersoft, chạy hoàn toàn phía trình duyệt, không cần server hay build.

| Hạng mục | Lựa chọn |
| --- | --- |
| Ngôn ngữ | HTML5, CSS3, JavaScript thuần (không framework) |
| Font chữ | Roboto (Google Fonts) |
| Icon | Font Awesome 6.5.2 (cdnjs) |
| Ảnh minh họa | Unsplash (images.unsplash.com) |
| Màu chủ đạo | Xanh lá `#15a04a` |
| Hỗ trợ màn hình | Máy tính, máy tính bảng, điện thoại |

Dữ liệu tin đăng, dự án, doanh nghiệp, hotline và email đều là dữ liệu mẫu.

## Cấu trúc thư mục và cách chạy

```
buoi1_bds/
├── .claude/
│   └── CLAUDE.md       # Quy tắc và kiến trúc dự án
├── assets/
│   ├── css/
│   │   └── style.css   # Biến màu, bố cục, responsive
│   ├── js/
│   │   └── main.js     # Dữ liệu tin đăng mẫu và các tương tác
│   ├── img/            # Ảnh local
│   └── fonts/          # Font local
├── docs/
│   └── README.md       # Tài liệu này
├── index.html          # Cấu trúc trang, toàn bộ nội dung tĩnh
└── README.md           # Giới thiệu ngắn
```

Cách chạy:

1. Mở thư mục `buoi1_bds` trong VS Code.
2. Chuột phải vào `index.html`, chọn **Open with Live Server** (hoặc nháy đúp file để mở bằng trình duyệt).
3. Cần có kết nối mạng để tải font, icon và ảnh từ CDN.

## Các phần của trang

Trang chia thành 9 phần theo thứ tự từ trên xuống; mỗi phần là một khối riêng trong `index.html` với class tương ứng trong CSS.

| # | Phần | Class / id | Nội dung | Tương tác |
| --- | --- | --- | --- | --- |
| 1 | Header | `.header` | Logo ThanhMienLand, menu 7 mục, Đăng nhập, Đăng ký, Đăng tin | Menu con khi rê chuột; nút ☰ trên điện thoại; đổ bóng khi cuộn |
| 2 | Ảnh bìa + tìm kiếm | `.hero`, `.search-box` | 3 ảnh nền, 3 tab Bán / Cho thuê / Dự án, ô tìm kiếm, 3 bộ lọc | Ảnh tự chuyển mỗi 5 giây; đổi tab; tìm kiếm báo bằng thông báo nhỏ |
| 3 | Tin tức | `#tin-tuc` | 1 tin nổi bật + 6 tin dạng danh sách | Đổi tab (chỉ đổi giao diện) |
| 4 | Bất động sản dành cho bạn | `#listingGrid` | 8 tin đăng mẫu, hiện 4 tin mỗi lần | Nút Mở rộng; nút ♥ lưu tin |
| 5 | Dự án nổi bật | `#du-an` | 4 dự án kèm nhãn trạng thái | Rê chuột đổ bóng |
| 6 | Theo địa điểm | `.locations` | 5 tỉnh thành (TP.HCM, Hà Nội, Đà Nẵng, Bình Dương, Quảng Ninh), ô TP.HCM lớn gấp đôi | Rê chuột phóng to nhẹ |
| 7 | Hỗ trợ tiện ích | `.tool`, `#loanForm` | 4 tiện ích + ô tính trả góp | Tính trả góp hàng tháng (chạy thật) |
| 8 | Doanh nghiệp tiêu biểu | `.partners` | 6 doanh nghiệp mẫu | Rê chuột đổ bóng |
| 9 | Footer | `.footer` | Liên hệ, 4 cột link, đăng ký nhận tin, mạng xã hội | Đăng ký nhận tin báo bằng thông báo nhỏ |

Ngoài ra có nút lên đầu trang (hiện khi cuộn quá 500px) và hộp thông báo nhỏ `#toast` dùng chung cho toàn trang.

## Hệ thống giao diện

Màu sắc và kích thước chung nằm trong biến `:root` ở đầu `assets/css/style.css`; sửa một biến là cả trang đổi theo.

| Biến | Giá trị | Dùng cho |
| --- | --- | --- |
| `--primary` | `#15a04a` | Logo, nút chính, link, giá, nhãn VIP |
| `--primary-dark` | `#0f7d39` | Nút chính khi rê chuột |
| `--text` | `#2c2c2c` | Chữ chính |
| `--muted` | `#757575` | Chữ phụ, địa chỉ, thời gian |
| `--border` | `#e5e5e5` | Đường viền |
| `--bg-gray` | `#f2f2f2` | Nền xám các section xen kẽ |
| `--radius` | `8px` | Bo góc |
| `--header-h` | `72px` | Chiều cao header |

Hai màu nền phụ viết trực tiếp (không qua biến): `#e3f5e9` cho nền icon tiện ích và `#f2faf4` cho nền ô tính trả góp.

Responsive theo 3 mốc chiều rộng màn hình:

| Mốc | Thay đổi chính |
| --- | --- |
| ≤ 1200px | Ẩn link Đăng nhập / Đăng ký, thu hẹp menu |
| ≤ 992px | Menu thu vào nút ☰ trượt từ trái; lưới tin đăng 2 cột; footer 2 cột |
| ≤ 640px | Ô tìm kiếm xếp dọc; lưới 1 cột; ẩn nút Đăng tin; footer 1 cột |

Class đặt theo kiểu BEM: `khối__phần-tử--biến-thể`, ví dụ `.card__title`, `.btn--primary`.

## JavaScript

Toàn bộ tương tác nằm trong `assets/js/main.js`, viết bằng JavaScript thuần, không dùng thư viện.

| Chức năng | Hàm / phần tử | Cách hoạt động |
| --- | --- | --- |
| Hiển thị tin đăng | `listings`, `cardHTML()`, `renderMore()` | Mảng 8 tin mẫu; mỗi lần thêm 4 thẻ vào `#listingGrid`, hết tin thì ẩn nút Mở rộng |
| Lưu tin | click trên `#listingGrid` | Bắt sự kiện ở lưới cha, đổi trái tim rỗng / đặc và hiện thông báo |
| Header khi cuộn | sự kiện `scroll` | Thêm class `scrolled` khi cuộn quá 10px; hiện nút lên đầu trang khi quá 500px |
| Menu điện thoại | `#menuToggle` | Bật / tắt class `open`; ở màn hình ≤ 992px, bấm mục có menu con sẽ xổ xuống |
| Ảnh bìa tự chuyển | `setInterval` 5000ms | Chuyển class `active` sang ảnh kế tiếp |
| Tab | `setupTabs()` | Dùng chung cho tab tìm kiếm và tab tin tức |
| Tìm kiếm | `#searchForm` | Chưa gọi dữ liệu thật, chỉ hiện thông báo từ khóa và tab đang chọn |
| Tính trả góp | `calcLoan()` | Tính khi tải trang và mỗi lần bấm Tính toán |
| Thông báo nhỏ | `showToast(msg)` | Hiện 2,5 giây rồi tự ẩn |

Ô tính trả góp dùng cách trả đều mỗi tháng (gốc + lãi bằng nhau mỗi kỳ):

```
M = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

Trong đó M là số tiền trả mỗi tháng, P là số tiền vay, r là lãi suất tháng (lãi năm ÷ 12), n là số tháng. Khi lãi suất bằng 0, M = P ÷ n. Tổng lãi = M × n − P.

## Tùy biến và hướng phát triển

Hầu hết thay đổi thường gặp chỉ cần sửa một chỗ.

| Muốn đổi | Sửa ở đâu |
| --- | --- |
| Màu chủ đạo | `--primary`, `--primary-dark` trong `:root` (style.css) |
| Tên, logo | `.logo__text` ở header và footer (index.html) |
| Biểu tượng logo | Class Font Awesome trong `.logo__icon`, hiện là `fa-house-chimney` |
| Tin đăng, ảnh tin đăng | Mảng `listings` đầu main.js (trường `img` là mã ảnh Unsplash) |
| Số tin mỗi lần hiện | Hằng số `PAGE_SIZE` trong main.js |
| Ảnh | Thay link Unsplash bằng ảnh trong thư mục `assets/img/` |

Hướng phát triển:

- [ ] Tải ảnh về thư mục `assets/img/` để trang chạy được khi không có mạng
- [ ] Tìm kiếm và bộ lọc lọc thật trên mảng `listings`
- [ ] Tab tin tức hiển thị nội dung khác nhau cho từng tab
- [ ] Lưu tin đã thích vào `localStorage` để giữ sau khi tải lại trang
- [ ] Trang chi tiết tin đăng và form Đăng nhập / Đăng ký

## Các trang con

Tạo bằng lệnh `/tao-page`, mỗi trang tự chứa trong `pages/<slug>/` (index.html + assets riêng).

| Trang | Đường dẫn | Mô tả |
| --- | --- | --- |
| Cho thuê căn hộ chung cư | `pages/cho-thue-can-ho/index.html` | Landing page cho thuê căn hộ: lọc theo loại căn, xem ảnh phóng to, FAQ, form đặt lịch xem nhà. Liên kết từ menu Nhà đất cho thuê → Cho thuê căn hộ chung cư ở trang chủ. |
