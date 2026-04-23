/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: canvas.js
    Purpose: Canvas background with animated code nodes and connected particles.
   ================================================================ */

/* ── CANVAS NODES BACKGROUND ───────────────────────────────────– */
(function initCanvas() {
  "use strict";

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) {
    setTimeout(initCanvas, 50);
    return;
  }
  const ctx = canvas.getContext("2d");
  let W,
    H,
    nodes = [],
    frame = 0;

  const SYMBOLS = [
    "<",
    ">",
    "/",
    "{",
    "}",
    "(",
    ")",
    ";",
    "=",
    "=>",
    "&&",
    "||",
    "0",
    "1",
    "#",
  ];

  /**
   * Resize canvas to window dimensions
   */
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /**
   * Create a single node with random properties
   */
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

  /**
   * Initialize canvas and create nodes
   */
  function init() {
    resize();
    nodes = Array.from({ length: 90 }, createNode);
  }

  /**
   * Animation frame: draw lines and nodes
   */
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Draw connecting lines between close nodes
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

    // Draw and animate nodes
    nodes.forEach((n) => {
      n.pulse += 0.02;
      const a = n.alpha + Math.sin(n.pulse) * 0.05;

      ctx.font = `${n.size * 6}px 'Fira Code', monospace`;
      ctx.fillStyle = `rgba(230,57,70,${a})`;
      ctx.fillText(n.sym, n.x, n.y);

      // Update position
      n.x += n.vx;
      n.y += n.vy;

      // Wrap around screen edges
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
    });

    requestAnimationFrame(draw);
  }

  init();
  draw();

  // Handle window resize
  window.addEventListener("resize", () => {
    resize();
    init();
  });
})();

/* ── FLOATING CODE PARTICLES ───────────────────────────────────– */
(function initParticles() {
  "use strict";

  const container = document.getElementById("codeParticles");
  if (!container) {
    setTimeout(initParticles, 50);
    return;
  }
  const snippets = [
    "const dev = true;",
    "import React",
    "() => {}",
    "git push",
    "npm start",
    "<html>",
    "SELECT *",
    "async/await",
    "flex: 1",
    "border-radius",
    "useState()",
    "fetchData()",
    "border: none",
    "&&",
    "||",
    "return <div>",
    ".map()",
    ".filter()",
    "class Hero",
    "export default",
    "Promise.all",
  ];

  for (let i = 0; i < 22; i++) {
    const el = document.createElement("span");
    el.className = "code-particle";
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
