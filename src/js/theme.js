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
    const themeToggle = document.getElementById("themeToggle");

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
      themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";

        html.setAttribute("data-theme", next);
        localStorage.setItem("jd-theme", next);
      });
    }

    // Initialize theme on page load
    loadTheme();
    handleThemeToggle();
  });
})();
