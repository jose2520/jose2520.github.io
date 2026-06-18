/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: maintenance.js
    Purpose: Maintenance modal — mini canvas node grid, floating
             code particles, and dismiss/enter functionality.
   ================================================================ */

(function initMaintenance() {
  "use strict";

  const overlay = document.getElementById("maintenance-overlay");
  if (!overlay) {
    setTimeout(initMaintenance, 50);
    return;
  }

  let canvasRunning = true;

  /* ── MINI CANVAS NODE GRID ─────────────────────────────────── */
  (function initMCanvas() {
    const canvas = document.getElementById("maintenance-canvas");
    if (!canvas) {
      setTimeout(initMCanvas, 50);
      return;
    }
    const ctx = canvas.getContext("2d");
    let W, H, nodes = [];
    let currentRedRgb = getComputedStyle(document.documentElement).getPropertyValue('--red-rgb').trim();
    const themeObserver = new MutationObserver(() => {
      currentRedRgb = getComputedStyle(document.documentElement).getPropertyValue('--red-rgb').trim();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const SYMBOLS = ["<", ">", "/", "{", "}", ";", "=", "0", "1", "#", "=>", "()"];

    function resize() {
      const modal = document.getElementById("maintenance-modal");
      const rect = modal.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    }

    function createNode() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        alpha: Math.random() * 0.4 + 0.25,
        size: Math.random() * 1.5 + 0.8,
      };
    }

    function init() {
      resize();
      nodes = Array.from({ length: 25 }, createNode);
    }

    function draw() {
      if (!canvasRunning) return;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${currentRedRgb},${(1 - dist / 70) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.font = `${n.size * 6}px "Fira Code", monospace`;
        ctx.fillStyle = `rgba(${currentRedRgb},${n.alpha})`;
        ctx.fillText(n.sym, n.x, n.y);
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
      });

      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
  })();

  /* ── FLOATING CODE PARTICLES ───────────────────────────────── */
  (function initMParticles() {
    const modal = document.getElementById("maintenance-modal");
    if (!modal) return;
    const snippets = [
      "const dev = true;", "import React", "() => {}", "git push",
      "npm start", "<html>", "SELECT *", "async/await",
      "flex: 1", "useState()", "fetchData()", "return <div>",
      ".map()", "export default", "Promise.all",
    ];

    for (let i = 0; i < 10; i++) {
      const el = document.createElement("span");
      el.className = "m-particle";
      el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
      el.style.cssText = `
        left: ${10 + Math.random() * 80}%;
        top: ${10 + Math.random() * 80}%;
        --dur: ${10 + Math.random() * 12}s;
        --delay: ${Math.random() * 8}s;
        --rot: ${(Math.random() - 0.5) * 25}deg;
        font-size: ${0.5 + Math.random() * 0.3}rem;
      `;
      modal.appendChild(el);
    }
  })();

  /* ── DISMISS HANDLERS ──────────────────────────────────────── */
  function dismiss() {
    if (overlay.classList.contains("dismissed")) return;
    canvasRunning = false;
    overlay.classList.add("dismissed");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);
  }

  const closeBtn = document.getElementById("maintenance-close");
  if (closeBtn) closeBtn.addEventListener("click", dismiss);

  const enterBtn = document.getElementById("maintenance-enter");
  if (enterBtn) enterBtn.addEventListener("click", dismiss);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) dismiss();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dismiss();
  });
})();
