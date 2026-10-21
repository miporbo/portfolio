/* ---------- FOOTER YEAR ---------- */
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();

/* ---------- THEME TOGGLE ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

themeBtn?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- MOBILE MENU: লিংকে ক্লিক করলে মেনু বন্ধ ---------- */
const navToggle = document.getElementById("nav-toggle");
document.querySelectorAll(".nav nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle) navToggle.checked = false;
  });
});

/* ---------- BACK TO TOP + SCROLL INDICATOR ---------- */
const toTop = document.getElementById("to-top");
const scrollDown = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  toTop?.classList.toggle("show", y > 400);
  scrollDown?.classList.toggle("hide", y > 80);
});

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- PROJECT CARD GLOW (মাউস ফলো করে) ---------- */
document.querySelectorAll(".card.project").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - r.left + "px");
    card.style.setProperty("--y", e.clientY - r.top + "px");
  });
});

/* ---------- CUSTOM CURSOR ---------- */
if (window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("cursor-enabled");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, label, input, .card.project").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovered"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovered"));
  });
}

/* ---------- TYPING ANIMATION ---------- */
const phrases = [
  "Python Developer.",
  "Backend Learner.",
  "Automation Enthusiast.",
  "Future Problem Solver."
];
const typedEl = document.getElementById("typed-text");

if (typedEl) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}


/* ===== Scroll Reveal Animation ===== */

document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});

