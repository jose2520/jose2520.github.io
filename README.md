# 🚀 Jose.dev — Portfolio Personal

> _"No solo escribo código, cuento historias a través de interfaces vibrantes."_

Portfolio personal de **Jose Diaz**, Junior Developer & Imagineer.
Construido 100% con **HTML · CSS puro · JavaScript vanilla** — sin frameworks, sin dependencias.

---

## 📋 Tabla de contenidos

- [Vista previa](#-vista-previa)
- [Tecnologías](#-Tecnologías)
- [Estructura del proyecto](#-Estructura-del-proyecto)
- [Módulos HTML](#-Módulos-HTML)
- [Características](#-Características)
- [Cómo ejecutar](#-Cómo-ejecutar)
- [Personalización](#-Personalización)
- [Autor](#-Autor)

---

## 🖼 Vista previa

|                 Modo oscuro                 |               Modo claro                |
| :-----------------------------------------: | :-------------------------------------: |
| Fondo negro con acentos rojos y animaciones | Fondo blanco con acentos lila y las mismas animaciones |

---

## 🛠 Tecnologías

| Capa         | Tecnología                                     | Versión      |
| ------------ | ---------------------------------------------- | ------------ |
| Estructura   | HTML5 semántico                                | —            |
| Estilos      | CSS3 puro (variables, animaciones, grid, flex) | —            |
| Lógica       | JavaScript ES6+ vanilla                        | —            |
| Iconos       | Font Awesome                                   | 6.5.1        |
| Fuentes      | Space Grotesk + Fira Code                      | Google Fonts |
| Servidor dev | Live Server / npx serve                        | —            |

> ⚠️ **Sin React · Sin Tailwind · Sin jQuery · Sin build step.**

---

## 📁 Estructura del proyecto

```
jose.dev/
├── index.html
├── README.md
├── public/
│   └── img/
│       ├── profile/
│       └── projects/
├── src/
│   ├── css/
│   │   ├── animations.css
│   │   ├── layout.css
│   │   ├── main.css
│   │   ├── modules.css
│   │   └── styles.css
│   ├── view/
│   │   └── modules/
│   │       ├── mod-about.html
│   │       ├── mod-background.html
│   │       ├── mod-contact.html
│   │       ├── mod-footer.html
│   │       ├── mod-hero.html
│   │       ├── mod-nav.html
│   │       ├── mod-projects.html
│   │       └── mod-tools.html
│   └── js/
│       ├── canvas.js
│       ├── core.js
│       ├── forms.js
│       ├── interactions.js
│       ├── modules.js
│       ├── script.js
│       └── theme.js
```

---

## 🧩 Módulos HTML

El `index.html` está organizado en **7 módulos** claramente delimitados con comentarios de bloque:

```
MÓDULO 0 · Capas de fondo globales
  └── Canvas de nodos + partículas de código flotantes

MÓDULO 1 · Navegación principal
  ├── Barra desktop (logo · links · CV · toggle tema)
  └── Menú móvil desplegable

MÓDULO 2 · Hero — Presentación
  ├── Sub-módulo 2.1 → Texto, título glitch, botones, estadísticas
  └── Sub-módulo 2.2 → Foto con órbitas, badge, snippets flotantes

MÓDULO 3 · Sobre mí — Detrás del teclado
  ├── Sub-módulo 3.1 → Título lateral + chips de especialidad
  └── Sub-módulo 3.2 → Tarjeta de historia con esquinas animadas

MÓDULO 4 · Herramientas — Mi Caja de Juguetes
  ├── Sub-módulo 4.1 → Lenguajes (JS, Python, PHP, TS, HTML/CSS, SQL)
  ├── Sub-módulo 4.2 → Tecnologías (React, Node, Vue, Angular…)
  └── Sub-módulo 4.3 → Bases de datos (MySQL, MongoDB, Firebase…)

MÓDULO 5 · Proyectos — Mis Aventuras
  ├── Sub-módulo 5.1 → El Mercadito Digital
  ├── Sub-módulo 5.2 → Ventana al Cielo
  ├── Sub-módulo 5.3 → Dashboard Cosmos
  └── Sub-módulo 5.4 → ChatBot IA

MÓDULO 6 · Contacto — ¿Hacemos algo épico juntos?
  ├── Sub-módulo 6.1 → Info de contacto (email, ubicación, redes)
  └── Sub-módulo 6.2 → Formulario de contacto con validación

MÓDULO 7 · Footer
  └── Logo · Copyright · Redes sociales
```

---

## ✨ Características

### Animaciones artísticas

- **Canvas background** — Red de nodos con símbolos de código conectados
- **Partículas flotantes** — Snippets de código ascienden por la pantalla
- **Efecto Glitch** — El nombre parpadea con distorsión al cargar/hover
- **Anillos orbitales** — Iconos de tecnologías rotan alrededor de la foto
- **Borde giratorio** — Gradiente cónico animado en el marco de la foto
- **Snippets flotantes** — `<div>`, `const dev`, `() => {}` flotan con CSS
- **Tira binaria** — "HELLO WORLD" en binario desplazándose
- **Scroll reveal** — Elementos aparecen al entrar al viewport (IntersectionObserver)
- **Tilt de tarjetas** — Inclinación 3D al mover el ratón sobre los proyectos
- **Cursor glow** — Halo rojo sigue el cursor por toda la página
- **Typing effect** — El label "historia.js" se escribe/borra en bucle
- **Contadores animados** — Stats cuentan desde 0 al entrar en pantalla
- **Shimmer** — Línea de brillo deslizante en separadores

### Modo claro / oscuro

- Toggle en la navbar (☀️ / 🌙)
- Variables CSS (`--bg`, `--text`, `--card`…) cambian con `[data-theme]`
- Preferencia guardada en `localStorage`

### Accesibilidad

- Atributos `aria-label`, `role`, `aria-hidden` en todos los módulos
- `aria-live` en el mensaje de éxito del formulario
- `aria-expanded` en el botón hamburguesa
- Etiquetas `<article>` para tarjetas de proyecto
- `<header>`, `<footer>`, `<nav>` semánticos

---

## ▶️ Cómo ejecutar

### Opción 1 — Live Server (VS Code) ⭐ Recomendada

1. Instala la extensión **Live Server** (`ritwickdey.liveserver`)
2. Clic derecho en `index.html` → **"Open with Live Server"**
3. Se abre en `http://127.0.0.1:5500`

### Opción 2 — npx serve

```bash
npx serve . -l 3000
# Abre → http://localhost:3000
```

### Opción 3 — Python

```bash
python3 -m http.server 8080
# Abre → http://localhost:8080
```

### Opción 4 — Abrir directamente

Doble clic en `index.html` — funciona sin servidor (no usa fetch/módulos ES).

---

## 🎨 Personalización

### Cambiar colores

En `src/css/styles.css`, línea ~3:

```css
:root {
  --red: #e63946; /* ← color de acento principal */
  --red-dark: #c1121f; /* ← hover de botones */
}
```

### Cambiar contenido personal

Editar directamente en `index.html`:

- **Nombre** → `data-text="Jose Diaz"` y texto del `<span class="hero-name">`
- **Descripción** → `<p class="hero-desc">`
- **Stats** → `data-count="20"`, `data-count="3"`, `data-count="10"`
- **Email** → `href="mailto:..." ` en el módulo 6
- **Proyectos** → Módulo 5, sub-módulos 5.1 – 5.4
- **Herramientas** → Módulo 4, sub-módulos 4.1 – 4.3

### Agregar foto real

Reemplaza el avatar en el Módulo 2.2:

```html
<!-- Cambiar esto: -->
<div class="hero-avatar">
  <i class="fas fa-user-astronaut"></i>
</div>

<!-- Por esto: -->
<div class="hero-avatar">
  <img src="public/img/foto.jpg" alt="Jose Diaz" />
</div>
```

Y en CSS agrega `img { width:100%; height:100%; object-fit:cover; }` dentro de `.hero-avatar`.

---
---

## Enviar formulario por correo (EmailJS)

Si quieres que los mensajes enviados desde el formulario lleguen a tu correo personal sin montar un backend, puedes usar EmailJS (servicio que reenvía formularios desde el cliente).

Pasos rápidos:

1. Regístrate en https://www.emailjs.com/ y verifica tu email.
2. Crea un Service (por ejemplo: gmail) y copia el Service ID.
3. Crea una Template (ej. contact_form) y en la plantilla usa variables como `from_name`, `reply_to`, `message`.
4. Copia tu User ID (aparece en el dashboard).
5. En este repositorio:
   - Abre `index.html` y asegúrate de que existe la línea que carga el SDK:
     ```html
     <script type="text/javascript" src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>
     ```
   - Abre `src/js/forms.js` y reemplaza los placeholders:
     - `YOUR_EMAILJS_USER_ID` → tu User ID
     - `YOUR_SERVICE_ID` → Service ID
     - `YOUR_TEMPLATE_ID` → Template ID

Notas sobre la plantilla (Template):

- Asegúrate que la plantilla de EmailJS contiene las variables que usa el script (`from_name`, `reply_to`, `message`) o ajusta `templateParams` en `src/js/forms.js`.
- EmailJS tiene un plan gratuito con límites razonables para formularios personales.

Si prefieres usar otro servicio (Formspree, Netlify Forms, un servidor propio o una función serverless), dímelo y adapto el código.

---

## 👤 Autor

**Jose Diaz**

- 📧 josedelcarmen_diaz@outlook.com
- 📍 Barranquilla, Colombia 🇨🇴
- 💼 [LinkedIn](https://www.linkedin.com/in/jose-de-carmen-d-901b39a4?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- 🐙 [GitHub](https://github.com/jose2520)

---

<div align="center">
  <sub>Hecho con ❤️ y mucho ☕ en Colombia · 2026</sub>
</div>
