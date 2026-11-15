// Trang cho thuê căn hộ chung cư - ThanhMienLand
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ================= TOAST =================
const toast = $("#toast");
let toastTimer;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

// ================= HEADER KHI CUỘN + NÚT LÊN ĐẦU TRANG =================
const header = $("#header");
const backTop = $("#backTop");
function onScroll() {
  header?.classList.toggle("is-scrolled", window.scrollY > 40);
  backTop?.classList.toggle("is-visible", window.scrollY > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

// ================= MENU MOBILE =================
const nav = $("#nav");
const menuToggle = $("#menuToggle");
function setMenu(open) {
  nav?.classList.toggle("is-open", open);
  header?.classList.toggle("menu-open", open);
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  }
}
menuToggle?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
$$(".nav__link").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// ================= ĐÁNH DẤU MENU THEO SECTION ĐANG XEM =================
const navLinks = $$('.nav__link[href^="#"]');
const sections = navLinks.map((l) => $(l.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// ================= HIỆN DẦN KHI CUỘN =================
const reveals = $$(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => revealObs.observe(el));
}

// ================= SỐ CHẠY (COUNT-UP) =================
const formatNum = (n) => n.toLocaleString("vi-VN");
function countUp(el) {
  const target = Number(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) { el.textContent = formatNum(target) + suffix; return; }
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatNum(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counters = $$(".stat__num");
if ("IntersectionObserver" in window) {
  const countObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => countObs.observe(el));
} else {
  counters.forEach(countUp);
}

// ================= LỌC CĂN HỘ =================
const filterBtns = $$(".filter");
const units = $$(".unit");
const unitsEmpty = $("#unitsEmpty");
function applyFilter(type) {
  let visible = 0;
  units.forEach((u) => {
    const show = type === "all" || u.dataset.type === type;
    u.classList.toggle("is-hidden", !show);
    if (show) { u.classList.add("is-visible"); visible++; }
  });
  filterBtns.forEach((b) => {
    const active = b.dataset.filter === type;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-selected", String(active));
  });
  if (unitsEmpty) unitsEmpty.hidden = visible > 0;
  return visible;
}
filterBtns.forEach((btn) => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

// Tìm nhanh ở hero: lọc theo loại rồi cuộn tới danh sách
$("#quickSearch")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = $("#qsType").value;
  const area = $("#qsArea").value;
  const count = applyFilter(type);
  $("#can-ho")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  showToast(`Tìm thấy ${count} căn hộ${area ? " — khu vực " + area : ""}`);
});

// Nút "Đặt lịch xem" trên thẻ căn hộ: điền sẵn ghi chú trong form
$$("[data-unit]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const note = $("#fNote");
    if (note) note.value = `Tôi muốn xem căn hộ: ${btn.dataset.unit}`;
  })
);

// ================= LIGHTBOX ẢNH =================
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
let lastFocus = null;
function openLightbox(src, alt) {
  if (!lightbox) return;
  lastFocus = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lightboxClose")?.focus();
}
function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
  lastFocus?.focus();
}
$$(".unit__img").forEach((btn) =>
  btn.addEventListener("click", () => openLightbox(btn.dataset.full, $("img", btn)?.alt || ""))
);
$("#lightboxClose")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); setMenu(false); }
});

// ================= FAQ ACCORDION =================
$$(".faq__item").forEach((item) => {
  const btn = $(".faq__q", item);
  btn?.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");
    $$(".faq__item").forEach((other) => {
      other.classList.remove("is-open");
      $(".faq__q", other)?.setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ================= FORM LIÊN HỆ =================
const form = $("#contactForm");
const PHONE_RE = /^(0|\+84)\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, msg) {
  const group = input.closest(".form__group");
  group.classList.toggle("has-error", Boolean(msg));
  $(".form__error", group).textContent = msg;
  return !msg;
}

function validate() {
  const name = form.elements.name;
  const phone = form.elements.phone;
  const email = form.elements.email;
  const phoneVal = phone.value.replace(/[\s.-]/g, "");
  const okName = setError(name, name.value.trim().length >= 2 ? "" : "Vui lòng nhập họ tên");
  const okPhone = setError(phone, !phoneVal ? "Vui lòng nhập số điện thoại" : PHONE_RE.test(phoneVal) ? "" : "Số điện thoại không hợp lệ (vd: 0901234567)");
  const okEmail = setError(email, !email.value.trim() || EMAIL_RE.test(email.value.trim()) ? "" : "Email không hợp lệ");
  return okName && okPhone && okEmail;
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      $(".has-error input", form)?.focus();
      return;
    }
    const name = form.elements.name.value.trim();
    form.reset();
    showToast(`Cảm ơn ${name}! Chuyên viên sẽ gọi lại cho bạn trong 30 phút.`);
  });
  // Xóa lỗi khi người dùng sửa lại ô
  $$("input", form).forEach((input) =>
    input.addEventListener("input", () => {
      if (input.closest(".form__group").classList.contains("has-error")) setError(input, "");
    })
  );
}
