/* ============================================================
   Aakash Rajan — Academic Portfolio
   Theme toggle, mobile menu, project filters, back-to-top.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Theme (persisted, respects OS preference) ---- */
  var themeToggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  var initial = stored || "light";
  setTheme(initial);

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeToggle) {
      themeToggle.querySelector(".theme-toggle__icon").textContent = mode === "light" ? "☀" : "☾";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      setTheme(next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---- Mobile menu ---- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Project filters ---- */
  var filters = document.getElementById("projectFilters");
  var projects = Array.prototype.slice.call(document.querySelectorAll(".project"));
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach(function (f) {
        f.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-filter");
      projects.forEach(function (p) {
        var show = cat === "all" || p.getAttribute("data-category") === cat;
        p.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---- Back to top ---- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Keyboard focus outline only for keyboard users ---- */
  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", handleFirstTab);
      window.addEventListener("mousedown", handleMouseDownOnce);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove("user-is-tabbing");
    window.removeEventListener("mousedown", handleMouseDownOnce);
    window.addEventListener("keydown", handleFirstTab);
  }
  window.addEventListener("keydown", handleFirstTab);
})();
