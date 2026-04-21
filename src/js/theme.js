/* ================================================================
   JOSE.DEV — JavaScript Modular Architecture
   File: theme.js
   Purpose: Dark/Light mode toggle, localStorage persistence
   ================================================================ */

(function initTheme() {
  "use strict";

  // Wait for modules to be loaded
  document.addEventListener("modulesLoaded", () => {
  const html = document.documentElement;
  const themeToggles = document.querySelectorAll(".theme-toggle");

    /**
     * Load saved theme from localStorage or default to 'dark'
     */
    function loadTheme() {
      const savedTheme = localStorage.getItem("jd-theme") || "dark";
      html.setAttribute("data-theme", savedTheme);
    }

    /**
     * Handle theme toggle click
     */
    function handleThemeToggle() {
      if (!themeToggles || themeToggles.length === 0) return;
      themeToggles.forEach(btn => {
        btn.addEventListener("click", () => {
          const current = html.getAttribute("data-theme");
          const next = current === "dark" ? "light" : "dark";
          html.setAttribute("data-theme", next);
          localStorage.setItem("jd-theme", next);
        });
      });
    }

    // Initialize theme on page load
    loadTheme();
    handleThemeToggle();
  });
})();
