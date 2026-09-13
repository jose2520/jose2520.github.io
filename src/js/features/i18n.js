/**
 * JOSE.DEV — i18n
 * File: i18n.js
 * Purpose: Handle language switching and DOM text updates.
 */

(function initI18n() {
  "use strict";

  // Check if translations is available
  if (typeof translations === 'undefined') {
    console.error("Translations dictionary not found. Make sure translations.js is loaded before i18n.js");
    return;
  }

  const DEFAULT_LANG = 'es';
  let currentLang = localStorage.getItem('site_lang') || DEFAULT_LANG;

  // Function to change language
  window.setLanguage = function(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    document.documentElement.lang = lang;
    
    updateDOM();
    updateButtonUI();
  };

  // Toggle between en and es
  window.toggleLanguage = function() {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    window.setLanguage(newLang);
  };

  // Function to apply translations to all elements with data-i18n
  function updateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const keyString = el.getAttribute('data-i18n');
      const keys = keyString.split('.');
      
      let text = translations[currentLang];
      for (const key of keys) {
        if (text) {
          text = text[key];
        } else {
          break;
        }
      }
      
      if (text) {
        el.innerHTML = text;
      }
    });

    // Special cases
    
    // Typing effect hero tag
    const heroTag = document.querySelector('.hero-tag-text');
    if (heroTag) {
      heroTag.setAttribute('data-text', translations[currentLang].hero.tag);
      heroTag.innerHTML = translations[currentLang].hero.tag;
    }
  }

  // Update button text / icons based on current lang
  function updateButtonUI() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      const textSpan = btn.querySelector('.lang-text');
      if (textSpan) {
        // Shows the language that you will switch to
        textSpan.innerHTML = currentLang === 'es' ? 'EN' : 'ES'; 
      }
      
      // Update title for accessibility
      btn.title = currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español';
      btn.setAttribute('aria-label', btn.title);
    });
  }

  // Initial load
  function init() {
    // We update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Listen to module load events
    document.addEventListener('modulesLoaded', () => {
       updateDOM();
       updateButtonUI();
       setupEventListeners();
    });
  }

  function setupEventListeners() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      // Remove old listener if any to avoid duplicates
      btn.removeEventListener('click', window.toggleLanguage);
      btn.addEventListener('click', window.toggleLanguage);
    });
  }

  init();

})();
