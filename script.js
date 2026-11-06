document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
  }

  // Subtle entrance animation for page content.
  const main = document.querySelector("main");
  if (main && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    main.classList.add("page-enter");
  }
});
