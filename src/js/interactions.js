/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: interactions.js
    Purpose: Form validation, scroll effects, event listeners
   ================================================================ */

(function initInteractions() {
  "use strict";

  /* ── HAMBURGER MENU ────────────────────────────────────────────– */
  function tryInitHamburgerMenu() {
    if (window.__hamburgerMenuInitDone) return;

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!hamburger || !mobileMenu) return;
    window.__hamburgerMenuInitDone = true;

    // Set initial ARIA state
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");

      const isOpen = hamburger.classList.contains("open");
      hamburger.setAttribute("aria-expanded", isOpen.toString());
      mobileMenu.setAttribute("aria-hidden", (!isOpen).toString());
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", tryInitHamburgerMenu);
  document.addEventListener("modulesLoaded", tryInitHamburgerMenu);
  tryInitHamburgerMenu();

  /* ── NAVBAR SCROLL EFFECT ──────────────────────────────────────– */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ── GLITCH ON HOVER ───────────────────────────────────────────– */
  const glitchEl = document.querySelector(".glitch");

  if (glitchEl) {
    glitchEl.addEventListener("mouseover", () => {
      glitchEl.style.animation = "glitch1 0.3s steps(1) 2";
      setTimeout(() => {
        glitchEl.style.animation = "";
      }, 600);
    });
  }

  /* ── TOOL CARD MAGNETIC EFFECT ────────────────────────────────– */
  document.querySelectorAll(".tool-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `translateY(-4px) rotate(${x * 0.03}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ── PROJECT CARD 3D TILT ──────────────────────────────────────– */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.perspective = "800px";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });


  /* ── CONTACT FORM HANDLING ────────────────────────────────────– */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector(".btn-send");
      const text = btn.querySelector(".btn-text");
      const loading = btn.querySelector(".btn-loading");

      if (text && loading) {
        text.style.display = "none";
        loading.style.display = "flex";
        btn.disabled = true;

        // Simulate sending (replace with actual API call)
        setTimeout(() => {
          text.style.display = "flex";
          loading.style.display = "none";
          btn.disabled = false;

          if (formSuccess) {
            formSuccess.classList.add("show");
            contactForm.reset();
            setTimeout(() => formSuccess.classList.remove("show"), 4000);
          }
        }, 1800);
      }
    });
  }

  /* ── SMOOTH ACTIVE NAV ────────────────────────────────────────– */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ── TYPING EFFECT (About Section) ────────────────────────────– */
  (function initTyping() {
    const label = document.querySelector(".typing-label");
    if (!label) return;

    const texts = ["historia.js", "about.me", "developer.conf", "passion.code"];
    let tIdx = 0,
      cIdx = 0,
      deleting = false;

    function tick() {
      const current = texts[tIdx];

      if (!deleting) {
        label.innerHTML = `<i class="fas fa-terminal"></i> ${current.slice(0, ++cIdx)}<span style="opacity:0.8;color:var(--red)">|</span>`;

        if (cIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        label.innerHTML = `<i class="fas fa-terminal"></i> ${current.slice(0, --cIdx)}<span style="opacity:0.8;color:var(--red)">|</span>`;

        if (cIdx === 0) {
          deleting = false;
          tIdx = (tIdx + 1) % texts.length;
          setTimeout(tick, 400);
          return;
        }
      }

      setTimeout(tick, deleting ? 60 : 100);
    }

    setTimeout(tick, 1000);
  })();

  /* ── BINARY STRIP DUPLICATION ──────────────────────────────────– */
  (function fixBinary() {
    const strip = document.querySelector(".binary-strip span");
    if (strip) {
      const text = strip.textContent;
      strip.textContent = text + "  ·  " + text + "  ·  " + text;
    }
  })();
})();
