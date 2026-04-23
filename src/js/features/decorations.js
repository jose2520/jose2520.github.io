/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: decorations.js
    Purpose: Visual decorations and embellishments (binary strip duplication, decorative elements).
   ================================================================ */

(function initDecorations() {
  "use strict";

  /* ── BINARY STRIP DUPLICATION ──────────────────────────────────– */
  (function fixBinaryStrip() {
    const strip = document.querySelector('.binary-strip span');
    if (strip) {
      const text = strip.textContent;
      strip.textContent = text + '  ·  ' + text + '  ·  ' + text;
    }
  })();
})();
