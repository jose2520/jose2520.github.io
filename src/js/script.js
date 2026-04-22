/* ================================================================
    JOSE.DEV — Script
   ================================================================ */

/* NOTE:
  Theme handling is delegated to `theme.js` which listens for `modulesLoaded`.
  The rest of this script depends on modules injected dynamically, so run


/* ── SCROLL REVEAL ────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger by index within parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── COUNTER ANIMATION ────────────────────────────────────────── */
const counters = document.querySelectorAll('.stat-n');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-count');
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
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ── GLITCH ON HOVER ──────────────────────────────────────────── */
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  glitchEl.addEventListener('mouseover', () => {
    glitchEl.style.animation = 'glitch1 0.3s steps(1) 2';
    setTimeout(() => { glitchEl.style.animation = ''; }, 600);
  });
}

/* ── TOOL CARD MAGNETIC EFFECT ────────────────────────────────── */
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-4px) rotate(${x * 0.03}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── PROJECT CARD TILT ────────────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.perspective = '800px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── CONTACT FORM ─────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-send');
    const text = btn.querySelector('.btn-text');
    const loading = btn.querySelector('.btn-loading');

    text.style.display = 'none';
    loading.style.display = 'flex';
    btn.disabled = true;

    setTimeout(() => {
      text.style.display = 'flex';
      loading.style.display = 'none';
      btn.disabled = false;
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1800);
  });
}

/* ── SMOOTH ACTIVE NAV ────────────────────────────────────────── */
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

/* ── CURSOR GLOW ──────────────────────────────────────────────── */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(230,57,70,0.06), transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

/* ── TYPING EFFECT ────────────────────────────────────────────── */
(function initTyping() {
  const label = document.querySelector('.typing-label');
  if (!label) return;
  const texts = ['historia.js', 'about.me', 'developer.conf', 'passion.code'];
  let tIdx = 0, cIdx = 0, deleting = false;

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

/* ── BINARY STRIP DUPLICATION ─────────────────────────────────── */
(function fixBinary() {
  const strip = document.querySelector('.binary-strip span');
  if (strip) {
    const text = strip.textContent;
    strip.textContent = text + '  ·  ' + text + '  ·  ' + text;
  }
})();
