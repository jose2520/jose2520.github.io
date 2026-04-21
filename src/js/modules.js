/**
 * Módulos HTML — Carga dinámica de módulos
 * Carga los fragmentos HTML de cada módulo en sus contenedores correspondientes
 */

const modules = [
  { id: "mod-background", file: "src/html/modules/mod-background.html" },
  { id: "mod-nav", file: "src/html/modules/mod-nav.html" },
  { id: "mod-hero", file: "src/html/modules/mod-hero.html" },
  { id: "mod-about", file: "src/html/modules/mod-about.html" },
  { id: "mod-tools", file: "src/html/modules/mod-tools.html" },
  { id: "mod-projects", file: "src/html/modules/mod-projects.html" },
  { id: "mod-contact", file: "src/html/modules/mod-contact.html" },
  { id: "mod-footer", file: "src/html/modules/mod-footer.html" },
];

async function loadModule(module) {
  try {
    const response = await fetch(module.file);
    if (!response.ok) {
      throw new Error(`Error al cargar ${module.file}: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(module.id);
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn(`Contenedor ${module.id} no encontrado`);
    }
  } catch (error) {
    console.error(`Error cargando módulo ${module.id}:`, error);
  }
}

async function loadAllModules() {
  const promises = modules.map((module) => loadModule(module));
  await Promise.all(promises);
  console.log("Todos los módulos cargados");
  // Dispatch custom event to signal modules are loaded
  document.dispatchEvent(new Event("modulesLoaded"));
}

// Cargar módulos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadAllModules);
