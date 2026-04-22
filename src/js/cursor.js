(function(){
  /* CUSTOM CURSOR */
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        if (cursor) cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        if (cursorRing) cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(animRing);
    }
    animRing();

    function attachHoverHandlers() {
        const els = document.querySelectorAll('a, button, .skill-chip, .project-card');
        els.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!cursor || !cursorRing) return;
            cursor.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (!cursor || !cursorRing) return;
            cursor.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
        });
    }

    // Attach initially and also after a short delay in case modules inject elements dynamically
    attachHoverHandlers();
    setTimeout(attachHoverHandlers, 800);
})();

/* ── CURSOR GLOW ──────────────────────────────────────────────── */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

