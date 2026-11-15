// ================= DỮ LIỆU MẪU =================
const listings = [
  { img: "1493809842364-78817add7ffb", title: "Bán căn hộ 2PN view sông, full nội thất, sổ hồng sẵn", price: "3,2 tỷ", area: "72 m²", location: "Quận 7, Hồ Chí Minh", time: "Hôm nay", photos: 12, vip: true },
  { img: "1494526585095-c41746248156", title: "Nhà phố 4 tầng mặt tiền kinh doanh, gần chợ, đường 12m", price: "12,5 tỷ", area: "85 m²", location: "Cầu Giấy, Hà Nội", time: "Hôm nay", photos: 8, vip: true },
  { img: "1502672260266-1c1ef2d93688", title: "Cho thuê căn hộ studio mới, đầy đủ tiện nghi, gần trung tâm", price: "8 triệu/tháng", area: "35 m²", location: "Bình Thạnh, Hồ Chí Minh", time: "Hôm qua", photos: 6 },
  { img: "1518780664697-55e3ad937233", title: "Đất nền khu dân cư hiện hữu, pháp lý rõ ràng, giá đầu tư", price: "1,8 tỷ", area: "100 m²", location: "Dĩ An, Bình Dương", time: "Hôm qua", photos: 5 },
  { img: "1613490493576-7fde63acd811", title: "Biệt thự song lập khu compound an ninh, hồ bơi riêng", price: "25 tỷ", area: "250 m²", location: "Thủ Đức, Hồ Chí Minh", time: "2 ngày trước", photos: 20, vip: true },
  { img: "1570129477492-45c003edd2be", title: "Nhà riêng 3 tầng hẻm xe hơi, gần trường học, bệnh viện", price: "6,7 tỷ", area: "60 m²", location: "Gò Vấp, Hồ Chí Minh", time: "2 ngày trước", photos: 9 },
  { img: "1522708323590-d24dbb6b0267", title: "Căn hộ 3PN góc, ban công Đông Nam, tầng trung đẹp", price: "5,1 tỷ", area: "98 m²", location: "Hoàng Mai, Hà Nội", time: "3 ngày trước", photos: 10 },
  { img: "1504384308090-c894fdcc538d", title: "Cho thuê mặt bằng kinh doanh vị trí đẹp, ngã tư sầm uất", price: "35 triệu/tháng", area: "120 m²", location: "Hải Châu, Đà Nẵng", time: "3 ngày trước", photos: 4 },
];

const PAGE_SIZE = 4;
let shown = 0;

// ================= RENDER CARD =================
const grid = document.getElementById("listingGrid");
const loadMoreBtn = document.getElementById("loadMore");

function cardHTML(item) {
  return `
    <article class="card">
      <div class="card__img">
        <img src="https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&q=80&w=400&h=300" alt="${item.title}" loading="lazy" />
        ${item.vip ? '<span class="card__vip">VIP</span>' : ""}
        <span class="card__photos"><i class="fa-regular fa-image"></i> ${item.photos}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${item.title}</h3>
        <div class="card__meta"><span>${item.price}</span><span>${item.area}</span></div>
        <p class="muted"><i class="fa-solid fa-location-dot"></i> ${item.location}</p>
        <div class="card__footer">
          <span>${item.time}</span>
          <button class="save-btn" title="Lưu tin"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </article>`;
}

function renderMore() {
  const next = listings.slice(shown, shown + PAGE_SIZE);
  grid.insertAdjacentHTML("beforeend", next.map(cardHTML).join(""));
  shown += next.length;
  if (shown >= listings.length) loadMoreBtn.style.display = "none";
}
renderMore();
loadMoreBtn.addEventListener("click", renderMore);

// Lưu tin (toggle trái tim)
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".save-btn");
  if (!btn) return;
  btn.classList.toggle("saved");
  const icon = btn.querySelector("i");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  showToast(btn.classList.contains("saved") ? "Đã lưu tin" : "Đã bỏ lưu tin");
});

// ================= HEADER: SHADOW KHI CUỘN + BACK TOP =================
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  backTop.classList.toggle("show", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ================= MENU MOBILE =================
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav__item.has-sub > a").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      a.parentElement.classList.toggle("expanded");
    }
  });
});

// ================= HERO SLIDER =================
const slides = document.querySelectorAll(".hero__slide");
let current = 0;
setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 5000);

// ================= TABS =================
function setupTabs(selector) {
  const tabs = document.querySelectorAll(selector);
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    })
  );
}
setupTabs(".search-tab");
setupTabs(".news-tab");

// ================= TÌM KIẾM =================
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = document.getElementById("searchInput").value.trim();
  const type = document.querySelector(".search-tab.active").textContent;
  showToast(keyword ? `Đang tìm "${keyword}" trong mục ${type}...` : `Vui lòng nhập địa điểm hoặc dự án`);
});

// ================= TÍNH LÃI SUẤT =================
const loanForm = document.getElementById("loanForm");
const loanResult = document.getElementById("loanResult");

function calcLoan() {
  const principal = Number(document.getElementById("loanAmount").value) * 1e6;
  const months = Number(document.getElementById("loanYears").value) * 12;
  const r = Number(document.getElementById("loanRate").value) / 100 / 12;
  if (!principal || !months) return;
  // Trả góp đều (annuity): M = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthly = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalInterest = monthly * months - principal;
  const fmt = (n) => Math.round(n).toLocaleString("vi-VN") + " đ";
  loanResult.innerHTML = `Trả hàng tháng: <b>${fmt(monthly)}</b> · Tổng lãi: <b>${fmt(totalInterest)}</b>`;
}
loanForm.addEventListener("submit", (e) => { e.preventDefault(); calcLoan(); });
calcLoan();

// ================= ĐĂNG KÝ NHẬN TIN =================
document.getElementById("subscribeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("Cảm ơn bạn đã đăng ký nhận tin!");
});

// ================= TOAST =================
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
