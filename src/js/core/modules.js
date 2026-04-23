/**
 * JOSE.DEV — Módulos HTML
 * File: modules.js
 * Purpose: Carga dinámica y gestión de módulos HTML usando fetch() para inyectar contenido en contenedores.
 */

(function initModules() {
  "use strict";

  // Configuración de módulos con orden de carga optimizado
  const modules = [
    // Background primero (fondo de la página)
    { id: "mod-background", file: "src/view/mod-background.html", priority: 1 },

    // Navegación después (necesaria para la estructura)
    { id: "mod-nav", file: "src/view/mod-nav.html", priority: 2 },

    // Contenido principal
    { id: "mod-hero", file: "src/view/mod-hero.html", priority: 3 },
    { id: "mod-about", file: "src/view/mod-about.html", priority: 4 },
    { id: "mod-tools", file: "src/view/mod-tools.html", priority: 5 },
    { id: "mod-projects", file: "src/view/mod-projects.html", priority: 6 },
    { id: "mod-contact", file: "src/view/mod-contact.html", priority: 7 },

    // Footer al final
    { id: "mod-footer", file: "src/view/mod-footer.html", priority: 8 }
  ];

  // Estado de carga
  let loadedModules = 0;
  const totalModules = modules.length;

  /**
   * Carga un módulo HTML individual
   * @param {Object} module - Objeto con id, file y priority
   * @returns {Promise} Promesa que se resuelve cuando el módulo se carga
   */
  async function loadModule(module) {
    const startTime = performance.now();

    try {
      console.log(`📦 Cargando módulo: ${module.id}`);

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
        throw new Error(`Contenedor #${module.id} no encontrado en el DOM`);
      }

      // Insertar HTML
      container.innerHTML = html;

      // Calcular tiempo de carga
      const loadTime = (performance.now() - startTime).toFixed(2);
      loadedModules++;

      console.log(`✅ Módulo ${module.id} cargado en ${loadTime}ms (${loadedModules}/${totalModules})`);

      return { success: true, module: module.id, loadTime };

    } catch (error) {
      console.error(`❌ Error cargando módulo ${module.id}:`, error);
      return { success: false, module: module.id, error: error.message };
    }
  }

  /**
   * Carga todos los módulos en orden de prioridad
   */
  async function loadAllModules() {
    console.log(`🚀 Iniciando carga de ${totalModules} módulos...`);

    // Ordenar por prioridad
    const sortedModules = modules.sort((a, b) => a.priority - b.priority);

    // Cargar módulos en secuencia para mejor control
    const results = [];

    for (const module of sortedModules) {
      const result = await loadModule(module);
      results.push(result);

      // Pequeña pausa entre módulos para no sobrecargar
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Reporte final
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`🎉 Carga completada: ${successful} exitosos, ${failed} fallidos`);

    if (failed > 0) {
      console.warn('⚠️ Algunos módulos fallaron:', results.filter(r => !r.success));
    }

    // Disparar evento personalizado
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
   * Verifica que todos los contenedores existan antes de cargar
   */
  function validateContainers() {
    const missingContainers = modules
      .map(module => module.id)
      .filter(id => !document.getElementById(id));

    if (missingContainers.length > 0) {
      console.warn('⚠️ Contenedores faltantes:', missingContainers);
      console.warn('Los módulos correspondientes no se cargarán correctamente');
    }
  }

  // Inicialización
  function init() {
    // Validar contenedores cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', validateContainers);
    } else {
      validateContainers();
    }

    // Cargar módulos
    loadAllModules();
  }

  // Auto-inicialización
  init();

})();
