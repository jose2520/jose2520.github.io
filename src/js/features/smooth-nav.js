/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: smooth-nav.js
    Purpose: Smooth navigation with active section tracking on scroll.
   ================================================================ */

(function initSmoothNav() {
  "use strict";

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
})();
