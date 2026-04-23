/* ================================================================
    JOSE.DEV — JavaScript Modular Architecture
    File: decorations.js
    Purpose: Decoraciones visuales y embellecimientos (duplicación de tira binaria, elementos decorativos).
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
