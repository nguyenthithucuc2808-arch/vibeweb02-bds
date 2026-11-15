---
name: tao-page
description: Tạo một landing page HTML/CSS/JS hoàn chỉnh, responsive, theo cấu trúc dự án (pages/<slug>/ với assets/css, assets/js, assets/img). Dùng khi người dùng gõ /tao-page kèm mô tả trang cần tạo (vd "/tao-page trang bán căn hộ Sky Garden"), hoặc yêu cầu tạo một trang giới thiệu / landing page mới trong dự án này.
argument-hint: "[mô tả trang: chủ đề, thương hiệu, màu, nội dung chính]"
---

# /tao-page — Tạo landing page mới

Yêu cầu của người dùng: **$ARGUMENTS**

Nếu `$ARGUMENTS` trống: tự chọn một chủ đề bất động sản phù hợp với dự án (vd: trang giới thiệu một dự án căn hộ), nói rõ chủ đề đã chọn ở câu trả lời cuối — không dừng lại để hỏi.

Đọc `.claude/CLAUDE.md` trước để theo đúng quy tắc chung của dự án (tiếng Việt, HTML/CSS/JS thuần, BEM, biến `:root`, không dùng thương hiệu thật).

## 1. Cấu trúc file cần tạo

Đặt `<slug>` = tên trang dạng kebab-case không dấu, rút từ yêu cầu (vd `sky-garden`). Nếu `pages/<slug>/` đã tồn tại, thêm hậu tố `-2`, `-3`… — không ghi đè.

```
pages/<slug>/
├── index.html
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/.gitkeep
```

- Trang tự chứa (không phụ thuộc CSS/JS của landing page gốc), đường dẫn tài nguyên tương đối `assets/...`.
- Thư viện chỉ qua CDN: Google Fonts, Font Awesome 6.5.2 (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css`). Không framework, không npm, không build.

## 2. Bố cục bắt buộc (theo thứ tự)

Nội dung chữ phải viết riêng cho chủ đề được yêu cầu — không để lorem ipsum, không để "Tiêu đề 1".

1. **Header** sticky: logo chữ + icon, menu neo tới các section (`href="#..."`), nút CTA; trên điện thoại thu vào nút ☰.
2. **Banner giới thiệu (hero)**: tiêu đề lớn, mô tả 1–2 câu, 2 nút (CTA chính + phụ), ảnh nền hoặc ảnh minh họa, có lớp phủ đảm bảo chữ dễ đọc.
3. **Thông tin nổi bật**: 3–4 con số/ điểm mạnh (vd "1.200 căn hộ", "15 phút tới trung tâm") — số chạy (count-up) khi cuộn tới.
4. **Giới thiệu / tổng quan**: ảnh + đoạn mô tả + danh sách điểm chính có icon.
5. **Tiện ích / giá trị**: lưới 6–8 thẻ (icon + tiêu đề + mô tả ngắn).
6. **Thư viện ảnh hoặc sản phẩm/gói** (chọn cái hợp chủ đề): lưới ảnh có lightbox, hoặc thẻ gói/giá có nút chọn.
7. **Đánh giá hoặc FAQ** (chọn cái hợp chủ đề): FAQ dùng accordion.
8. **Kêu gọi hành động / liên hệ**: form (họ tên, số điện thoại, email, nhu cầu) có kiểm tra dữ liệu bằng JS + thông tin liên hệ (hotline, địa chỉ, email mẫu).
9. **Footer**: logo, link nhanh, mạng xã hội, copyright.

Thêm: nút lên đầu trang, toast thông báo.

## 3. JavaScript (`assets/js/main.js`) — bắt buộc có

- Menu mobile mở/đóng; tự đóng khi bấm một link.
- Header đổi kiểu khi cuộn (đổ bóng / nền đặc).
- Cuộn mượt tới section + đánh dấu link menu của section đang xem (IntersectionObserver).
- Hiệu ứng hiện dần khi cuộn: phần tử có class `reveal` → thêm `is-visible` (IntersectionObserver, chạy một lần).
- Count-up cho các con số nổi bật (dùng `data-target`).
- Accordion FAQ hoặc lightbox ảnh (theo section đã chọn); đóng lightbox bằng Esc / bấm nền.
- Form liên hệ: chặn submit, kiểm tra bắt buộc + số điện thoại VN (`/^(0|\+84)\d{9}$/`) + email, báo lỗi dưới từng ô, thành công thì reset form và `showToast(...)`.
- Nút lên đầu trang; hàm dùng chung `showToast(msg)`.
- Tôn trọng `prefers-reduced-motion`: tắt animation/count-up khi người dùng bật giảm chuyển động.
- JS thuần, `const`/`let`, không lỗi console khi một section tùy chọn không có trên trang (kiểm tra phần tử tồn tại trước khi gắn sự kiện).

## 4. CSS (`assets/css/style.css`) — quy tắc

- Biến trong `:root`: `--primary`, `--primary-dark`, `--text`, `--muted`, `--bg`, `--bg-alt`, `--border`, `--radius`, `--shadow`, `--header-h`. Màu chủ đạo lấy theo yêu cầu; không nêu thì dùng xanh lá của dự án `#15a04a`.
- Class BEM; thứ tự: biến & reset → tiện ích (container, btn, section) → từng section theo thứ tự trang → toast/back-top → responsive.
- Mobile hiển thị tốt ở 360px: mốc `1200px`, `992px`, `640px`; dùng `grid`/`flex`, `clamp()` cho cỡ chữ tiêu đề; không có cuộn ngang.
- Ảnh `object-fit: cover`, khung ảnh có nền xám làm placeholder; `:focus-visible` rõ ràng cho nút/link/ô nhập.
- Hiệu ứng nhẹ: transition 0.2–0.3s; `.reveal { opacity:0; transform: translateY(24px) }` → `.reveal.is-visible { opacity:1; transform:none }`.

## 5. HTML — quy tắc

- `lang="vi"`, meta viewport, `<title>` và `<meta name="description">` theo chủ đề.
- Semantic (`header`, `nav`, `main`, `section` có `id`, `footer`); comment phân cách mỗi section.
- Mọi ảnh có `alt` + `loading="lazy"` (trừ ảnh hero); nút chỉ có icon có `aria-label`; ô form có `<label>`.

## 6. Ảnh

- Dùng ảnh Unsplash dạng `https://images.unsplash.com/photo-<id>?auto=format&fit=crop&q=80&w=<rộng>`.
- **Kiểm tra trước khi dùng**: với mỗi id, chạy `curl -s -o /dev/null -w '%{http_code}' "<url>"` và chỉ giữ ảnh trả về 200. Không dùng picsum.photos.
- ID đã kiểm tra, dùng được (nhà đất / thành phố):
  - Biệt thự, nhà: `1564013799919-ab600027ffc6`, `1600596542815-ffad4c1539a9`, `1568605114967-8130f3a36994`, `1613490493576-7fde63acd811`, `1580587771525-78b9dba3b914`, `1512917774080-9991f1c4c750`, `1570129477492-45c003edd2be`, `1600585154340-be6161a56a0c`
  - Nội thất căn hộ: `1493809842364-78817add7ffb`, `1502672260266-1c1ef2d93688`, `1522708323590-d24dbb6b0267`
  - Cao ốc, thành phố: `1486406146926-c627a92ad1ab`, `1545324418-cc1a3fa10c00`, `1536599018102-9f803c140fc1`, `1583417319070-4a69db38a482` (Sài Gòn)
  - Khác: `1560518883-ce09059eeffa` (mô hình nhà + chìa khóa), `1504384308090-c894fdcc538d` (văn phòng)
- Chủ đề không phải nhà đất → tìm id phù hợp khác và vẫn kiểm tra bằng curl.

## 7. Sau khi tạo

1. Kiểm tra: mọi `href="#id"` trong menu đều có section tương ứng; mọi `getElementById`/`querySelector` trong JS khớp với HTML.
2. Thêm một dòng vào mục **Các trang con** của `docs/README.md` (tạo mục này nếu chưa có): `| <tên trang> | pages/<slug>/index.html | <mô tả 1 câu> |`.
3. Trả lời người dùng ngắn gọn bằng tiếng Việt:
   - Link tới `pages/<slug>/index.html` và cây file đã tạo.
   - Danh sách section + tương tác JS đã có.
   - Giả định đã tự chọn (chủ đề, màu, tên thương hiệu) để người dùng sửa nếu cần.
   - Cách xem: mở bằng Live Server.
