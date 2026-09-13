/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: theme.js
    Purpose: Dark/light mode toggle with localStorage persistence.
   ================================================================ */

(function initTheme() {
  "use strict";

  // Wait for modules to be loaded
  document.addEventListener("modulesLoaded", () => {
    const html = document.documentElement;
    const themeToggles = document.querySelectorAll(".theme-toggle");

    /**
     * Update dynamic images based on theme
     */
    function updateImages(theme) {
      const profileImg = document.querySelector('.hero-photo-frame img');
      if (profileImg) {
        profileImg.src = theme === "dark" ? "public/img/profile/darkk.png" : "public/img/profile/whilee.png";
      }
    }

    /**
     * Load saved theme from localStorage or default to 'dark'
     */
    function loadTheme() {
      const savedTheme = localStorage.getItem("jd-theme") || "dark";
      html.setAttribute("data-theme", savedTheme);
      updateImages(savedTheme);
    }

    /**
     * Handle theme toggle click
     */
    function handleThemeToggle() {
      if (!themeToggles || themeToggles.length === 0) return;
      themeToggles.forEach(btn => {
        btn.addEventListener("click", () => {
          html.classList.add("theme-transitioning");
          const current = html.getAttribute("data-theme");
          const next = current === "dark" ? "light" : "dark";
          html.setAttribute("data-theme", next);
          localStorage.setItem("jd-theme", next);
          updateImages(next);

          setTimeout(() => {
            html.classList.remove("theme-transitioning");
          }, 300);
        });
      });
    }

    // Initialize theme on page load
    loadTheme();
    handleThemeToggle();
  });
})();
