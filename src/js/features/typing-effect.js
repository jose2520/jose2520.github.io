/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: typing-effect.js
    Purpose: Typing animation for the label in the About section.
   ================================================================ */

(function initTypingEffect() {
  "use strict";

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
