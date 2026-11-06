
document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "×" : "☰";
        });

        // Close menu after clicking a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            });
        });

        // Close menu with Escape
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            }
        });
    }

    // Automatically highlight current navigation page
    const currentPage = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // Sticky header shadow
    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }
    }

    // Scroll progress bar
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);

    function updateProgress() {
        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        progress.style.width = `${percentage}%`;
    }

    window.addEventListener("scroll", () => {
        updateHeader();
        updateProgress();
    }, { passive: true });

    updateHeader();
    updateProgress();

    // Scroll reveal animations
    const revealElements = document.querySelectorAll(
        ".content-card, .feature-card, .stat-card, " +
        ".intro-grid, .cta-band, .contact-detail, " +
        ".profile-link, .page-hero"
    );

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

});
