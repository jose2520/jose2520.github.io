/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: core.js
    Purpose: Core initialization, scroll reveal, counters
   ================================================================ */

(function initCore() {
  "use strict";

  /* ── SCROLL REVEAL WITH INTERSECTION OBSERVER ──────────────────– */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger animation by index within parent
          const siblings = [
            ...entry.target.parentElement.querySelectorAll(".reveal"),
          ];
          const idx = siblings.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 100);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── ANIMATED COUNTER FOR STATS ────────────────────────────────– */
  const counters = document.querySelectorAll(".stat-n");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute("data-count");
          let current = 0;
          const increment = target / 40;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, 40);

          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));
})();
