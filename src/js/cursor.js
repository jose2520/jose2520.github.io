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
            cursor.style.width      = '20px';
            cursor.style.height     = '20px';
            cursor.style.background = 'rgba(232,25,44,0.7)';
            cursorRing.style.width  = '56px';
            cursorRing.style.height = '56px';
            cursorRing.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            if (!cursor || !cursorRing) return;
            cursor.style.width      = '12px';
            cursor.style.height     = '12px';
            cursor.style.background = 'var(--red, #e8192c)';
            cursorRing.style.width  = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.opacity = '0.5';
        });
        });
    }

    // Attach initially and also after a short delay in case modules inject elements dynamically
    attachHoverHandlers();
    setTimeout(attachHoverHandlers, 800);
})();
