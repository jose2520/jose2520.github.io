/* ================================================================
   JOSE.DEV — Script
   ================================================================ */

/* ── THEME TOGGLE ─────────────────────────────────────────────── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved theme
const savedTheme = localStorage.getItem('jd-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('jd-theme', next);
});

/* ── HAMBURGER MENU ───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── NAVBAR SCROLL ────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── CANVAS BACKGROUND ────────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], frame = 0;

  const SYMBOLS = ['<', '>', '/', '{', '}', '(', ')', ';', '=', '=>', '&&', '||', '0', '1', '#'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: 90 }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Lines between close nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(230,57,70,${(1 - dist / 130) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      n.pulse += 0.02;
      const a = n.alpha + Math.sin(n.pulse) * 0.05;
      ctx.font = `${n.size * 6}px 'Fira Code', monospace`;
      ctx.fillStyle = `rgba(230,57,70,${a})`;
      ctx.fillText(n.sym, n.x, n.y);

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
    });

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── FLOATING CODE PARTICLES ──────────────────────────────────── */
(function initParticles() {
  const container = document.getElementById('codeParticles');
  const snippets = [
    'const dev = true;', 'import React', '() => {}', 'git push',
    'npm start', '<html>', 'SELECT *', 'async/await',
    'flex: 1', 'border-radius', 'useState()', 'fetchData()',
    'border: none', '&&', '||', 'return <div>', '.map()', '.filter()',
    'class Hero', 'export default', 'Promise.all',
  ];

  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.className = 'code-particle';
    el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${8 + Math.random() * 14}s;
      --delay: ${Math.random() * 12}s;
      --rot: ${(Math.random() - 0.5) * 30}deg;
      font-size: ${0.6 + Math.random() * 0.5}rem;
    `;
    container.appendChild(el);
  }
})();

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
