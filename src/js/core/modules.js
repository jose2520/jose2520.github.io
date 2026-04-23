/**
 * JOSE.DEV — HTML Modules
 * File: modules.js
 * Purpose: Dynamic loading and management of HTML modules using fetch() to inject content into containers.
 */

(function initModules() {
  "use strict";

  // Module configuration with optimized load order
  const modules = [
    // Background first (page background)
    { id: "mod-background", file: "src/view/mod-background.html", priority: 1 },

    // Navigation next (necessary for site structure)
    { id: "mod-nav", file: "src/view/mod-nav.html", priority: 2 },

    // Main content modules
    { id: "mod-hero", file: "src/view/mod-hero.html", priority: 3 },
    { id: "mod-about", file: "src/view/mod-about.html", priority: 4 },
    { id: "mod-tools", file: "src/view/mod-tools.html", priority: 5 },
    { id: "mod-projects", file: "src/view/mod-projects.html", priority: 6 },
    { id: "mod-contact", file: "src/view/mod-contact.html", priority: 7 },

    // Footer last
    { id: "mod-footer", file: "src/view/mod-footer.html", priority: 8 }
  ];

  // Loading state
  let loadedModules = 0;
  const totalModules = modules.length;

  /**
   * Load an individual HTML module
   * @param {Object} module - Object containing id, file, and priority
   * @returns {Promise} Promise that resolves when the module is loaded
   */
  async function loadModule(module) {
    const startTime = performance.now();

    try {
      console.log(`📦 Loading module: ${module.id}`);

      const response = await fetch(module.file, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const container = document.getElementById(module.id);

      if (!container) {
        throw new Error(`Container #${module.id} not found in DOM`);
      }

      // Insert HTML
      container.innerHTML = html;

      // Calculate load time
      const loadTime = (performance.now() - startTime).toFixed(2);
      loadedModules++;

      console.log(`✅ Module ${module.id} loaded in ${loadTime}ms (${loadedModules}/${totalModules})`);

      return { success: true, module: module.id, loadTime };

    } catch (error) {
      console.error(`❌ Error loading module ${module.id}:`, error);
      return { success: false, module: module.id, error: error.message };
    }
  }

  /**
   * Load all modules in priority order
   */
  async function loadAllModules() {
    console.log(`🚀 Starting load of ${totalModules} modules...`);

    // Sort by priority
    const sortedModules = modules.sort((a, b) => a.priority - b.priority);

    // Load modules sequentially for better control
    const results = [];

    for (const module of sortedModules) {
      const result = await loadModule(module);
      results.push(result);

      // Small pause between modules to avoid overload
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Final report
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`🎉 Load complete: ${successful} successful, ${failed} failed`);

    if (failed > 0) {
      console.warn('⚠️ Some modules failed:', results.filter(r => !r.success));
    }

    // Dispatch custom event
    const event = new CustomEvent('modulesLoaded', {
      detail: {
        total: totalModules,
        successful,
        failed,
        results
      }
    });

    document.dispatchEvent(event);
  }

  /**
   * Verify that all containers exist before loading
   */
  function validateContainers() {
    const missingContainers = modules
      .map(module => module.id)
      .filter(id => !document.getElementById(id));

    if (missingContainers.length > 0) {
      console.warn('⚠️ Missing containers:', missingContainers);
      console.warn('The corresponding modules will not load correctly');
    }
  }

  // Initialization
  function init() {
    // Validate containers when the DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', validateContainers);
    } else {
      validateContainers();
    }

    // Load modules
    loadAllModules();
  }

  // Auto-initialization
  init();

})();
