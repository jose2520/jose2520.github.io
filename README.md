# 🚀 Jose.dev — Personal Portfolio

> _"I don't just write code, I tell stories through vibrant interfaces."_

Personal portfolio of **Jose Diaz**, Junior Developer & Imagineer.
Built 100% with **HTML · pure CSS · vanilla JavaScript** — no frameworks, no dependencies.

**Organized modular architecture** with clear separation between styles, logic, and content for maximum maintainability and scalability.


---

## 📋 Table of contents

- [Live Demo](#-live-demo)
- [Preview](#-preview)
- [Technologies](#-technologies)
- [Project structure](#-project-structure)
- [HTML modules](#-html-modules)
- [Features](#-features)
- [Performance and architecture](#-performance-and-architecture)
- [How to run](#-how-to-run)
- [Development](#-development)
- [Customization](#-customization)
- [Author](#-author)

---

## 🌐 Live Demo

[View Live Site](https://jose2520.github.io/)
---

## 🖼 Preview

|                 Dark mode                 |               Light mode                |
| :-----------------------------------------: | :-------------------------------------: |
| Black background with red accents and animations | White background with lilac accents and the same animations |

---

## 🛠 Technologies

| Layer        | Technology                                    | Details                                      |
| ------------ | --------------------------------------------- | --------------------------------------------- |
| Structure    | Semantic HTML5                                | Modules organized in separate files          |
| Styling      | Pure CSS3 (variables, animations, grid, flex) | Modular architecture in 5 layers (base/themes/components/utilities/animations) |
| Logic        | Vanilla JavaScript ES6+                        | Modular code in 3 layers (core/features/utils) |
| Icons        | Font Awesome                                  | v6.5.1                                       |
| Fonts        | Space Grotesk + Fira Code                      | Google Fonts                                 |
| Dev server   | Live Server / npx serve                        | Local deployment without build tools         |

> ⚠️ **No React · No Tailwind · No jQuery · No build step.**

---

## 📁 Project structure

```
jose.dev/ 🎯 Root
├── 🌐 index.html              (Main entry point)
├── 📖 README.md               (Project documentation)
├── 📦 public/                 (Static public assets)
│   └── 🖼️  img/
│       ├── 👤 profile/        (Profile images)
│       └── 🎨 projects/       (Project images)
│
├── 🎨 src/                    (Source code)
│   ├── 🎭 css/
│   │   ├── 🔌 base/           (Reset and base styles)
│   │   │   ├── 🔄 reset.css
│   │   │   └── 🎯 base.css
│   │   ├── 🌈 themes/         (CSS variables - colors and themes)
│   │   │   └── 🎨 variables.css
│   │   ├── 🧩 components/     (Section-specific styles)
│   │   │   ├── 📱 navbar.css  (Navigation)
│   │   │   ├── ✨ hero.css    (Hero section)
│   │   │   ├── 👋 about.css   (About section)
│   │   │   ├── 🛠️  tools.css  (Tools & tech)
│   │   │   ├── 📂 projects.css (Projects section)
│   │   │   ├── 💬 contact.css (Contact section)
│   │   │   └── 🔗 footer.css  (Footer layout)
│   │   ├── ⚡ utilities/      (Utility classes)
│   │   │   ├── 🎯 utilities.css
│   │   │   └── ✨ effects.css
│   │   └── 🎬 animations/     (Animations and responsive)
│   │       ├── 🌊 animations.css
│   │       ├── 🎪 cursor.css
│   │       └── 📱 responsive.css
│   │
│   ├── 📄 view/               (HTML modules - loaded dynamically)
│   │   ├── 🔺 mod-hero.html
│   │   ├── 👤 mod-about.html
│   │   ├── 🛠️  mod-tools.html
│   │   ├── 📂 mod-projects.html
│   │   ├── 💬 mod-contact.html
│   │   ├── 📱 mod-nav.html
│   │   ├── 🔗 mod-footer.html
│   │   └── 🎨 mod-background.html
│   │
│   └── ⚙️  js/                (JavaScript logic)
│       ├── 🔥 core/           (Core functionality)
│       │   ├── 🎯 core.js     (Main initialization)
│       │   ├── 🖱️  interactions.js (User event handlers)
│       │   └── 🧩 modules.js  (Module loader)
│       ├── 🎪 features/       (Feature-specific logic)
│       │   ├── 🎨 canvas.js   (Canvas background - node grid)
│       │   ├── ✨ decorations.js (Floating particles)
│       │   ├── 🔄 smooth-nav.js (Smooth scrolling)
│       │   ├── 🌙 theme.js    (Dark/Light mode)
│       │   └── ⌨️  typing-effect.js (Typing effect)
│       └── 🔧 utils/          (Utilities)
│           ├── 🎪 cursor.js   (Cursor styling)
│           └── 📝 forms.js    (Form validation)
```

### 🏗 Architecture overview

This project uses a **clean modular architecture** to keep code easy to maintain and extend:

- **CSS organized in 5 layers:**
  - `base/` → reset and base styles for HTML/body
  - `themes/` → color variables and themes
  - `components/` → section-specific styling
  - `utilities/` → utility classes and effects
  - `animations/` → animations and responsive styles

- **JavaScript organized in 3 layers:**
  - `core/` → core functionality (scroll, modules, interactions)
  - `features/` → specific features (canvas, theme, navigation)
  - `utils/` → utilities (forms, cursor)

- **HTML modular:** modules are stored in `src/view/` for direct fetch injection.

---

## 🧩 HTML modules

The `index.html` file is structured as **7 clearly separated modules** with block comments:

```
MODULE 0 · Global background layers
  └── Node grid canvas + floating code particles

MODULE 1 · Main navigation
  ├── Desktop bar (logo · links · resume link · theme toggle)
  └── Mobile dropdown menu

MODULE 2 · Hero — Introduction
  ├── Sub-module 2.1 → Text, glitch title, buttons, statistics
  └── Sub-module 2.2 → Photo with orbits, badge, floating snippets

MODULE 3 · About me — Behind the keyboard
  ├── Sub-module 3.1 → Side title + specialty chips
  └── Sub-module 3.2 → Story card with animated corners

MODULE 4 · Tools — My toy box
  ├── Sub-module 4.1 → Languages (JS, Python, PHP, TS, HTML/CSS, SQL)
  ├── Sub-module 4.2 → Technologies (React, Node, Vue, Angular…)
  └── Sub-module 4.3 → Databases (MySQL, MongoDB, Firebase…)

MODULE 5 · Projects — My adventures
  ├── Sub-module 5.1 → El Mercadito Digital
  ├── Sub-module 5.2 → Ventana al Cielo
  ├── Sub-module 5.3 → Dashboard Cosmos
  └── Sub-module 5.4 → ChatBot AI

MODULE 6 · Contact — Shall we build something epic together?
  ├── Sub-module 6.1 → Contact info (email, location, social links)
  └── Sub-module 6.2 → Contact form with validation

MODULE 7 · Footer
  └── Logo · Copyright · social links
```

---

## ✨ Features

### Artistic animations

- **Canvas background** — node grid with connected code symbols
- **Floating particles** — code snippet particles rise across the screen
- **Glitch effect** — title flickers during load/hover
- **Orbit rings** — technology icons rotate around the photo
- **Animated border** — conic gradient ring around the hero image
- **Floating snippets** — `<div>`, `const dev`, `() => {}` drift in CSS
- **Binary strip** — moving "HELLO WORLD" binary strip
- **Scroll reveal** — elements animate into view with IntersectionObserver
- **Tilt cards** — 3D tilt on project cards when mouse moves
- **Cursor glow** — glowing pointer ring follows the cursor
- **Typing effect** — label types and erases in the About section
- **Animated counters** — stats count up when visible
- **Shimmer line** — shine effect on section separators

### Dark / light mode

- Navbar theme toggle (☀️ / 🌙)
- CSS variables (`--bg`, `--text`, `--card`, etc.) change using `[data-theme]`
- User preference saved in `localStorage`

### Accessibility

- `aria-label`, `role`, and `aria-hidden` on modules and buttons
- `aria-live` for the form success message
- `aria-expanded` for the mobile hamburger menu
- Semantic markup with `<article>`, `<header>`, `<footer>`, `<nav>` elements

### Performance and architecture

- **Smart module loading** — HTML modules are loaded dynamically with fetch
- **Optimized CSS** — theme variables and layered architecture
- **Efficient JavaScript** — IntersectionObserver for scroll animations and sequential loading
- **No external dependencies** — fully vanilla, no heavyweight frameworks
- **Cache-aware loading** — cache control headers used for critical modules
- **Separation of concerns** — styles, scripts, and content are clearly separated

---

## ▶️ How to run

### Option 1 — Live Server (VS Code) ⭐ Recommended

1. Install the **Live Server** extension (`ritwickdey.liveserver`)
2. Right-click `index.html` → **Open with Live Server**
3. Visit `http://127.0.0.1:5500`

### Option 2 — npx serve

```bash
npx serve . -l 3000
# Open http://localhost:3000
```

### Option 3 — Python

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 4 — Open directly
Double-click `index.html` — works without a server (does not use fetch/ES modules).

---

## 🛠️ Development

### Verify project structure

To verify that all files are present:

```bash
# Count files by type
find src/css -name "*.css" | wc -l    # Should be 15
find src/js -name "*.js" | wc -l     # Should be 10
find src/view -name "*.html" | wc -l # Should be 8

# List full source structure
find src/ -type f | sort
```

### Useful commands

```bash
# Start a development server
python3 -m http.server 8000

# Verify files are accessible
curl -I http://localhost:8000/index.html

# Find duplicated JS/CSS file names
find . -name "*.js" -o -name "*.css" | sort | uniq -d
```

---

## 🎨 Customization

### Change colors

In `src/css/themes/variables.css`, update the CSS variables:

```css
:root {
  --red: #e63946; /* ← main accent color */
  --red-dark: #c1121f; /* ← button hover color */
  --bg: #0b0b0f; /* ← background color */
  --text: #f0f0f8; /* ← text color */
}
```

### Add a new section

1. **Create a CSS file** at `src/css/components/new-section.css`
2. **Create an HTML module** at `src/view/mod-new-section.html`
3. **Add JS functionality** at `src/js/features/new-feature.js`
4. **Update `index.html`** with the new links
5. **Import the module in `modules.js`** with the appropriate priority

### Update personal content

Edit directly in the HTML modules and `index.html`:

- **Name** → `data-text="Jose Diaz"` and the `<span class="hero-name">` text
- **Description** → `<p class="hero-desc">`
- **Stats** → `data-count="20"`, `data-count="3"`, `data-count="10"`
- **Email** → `href="mailto:..."` in the contact module
- **Projects** → Module 5, sub-modules 5.1 – 5.4
- **Tools** → Module 4, sub-modules 4.1 – 4.3

### Add a real photo

Replace the avatar in Module 2.2:

```html
<!-- Change this: -->
<div class="hero-avatar">
  <i class="fas fa-user-astronaut"></i>
</div>

<!-- To this: -->
<div class="hero-avatar">
  <img src="public/img/photo.jpg" alt="Jose Diaz" />
</div>
```

And add CSS inside `.hero-avatar`:

```css
.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 📬 Send form by email (EmailJS)

If you want contact form submissions to arrive by email without a backend, use EmailJS.

Quick steps:

1. Sign up at https://www.emailjs.com/ and verify your email.
2. Create a service (for example: gmail) and copy the Service ID.
3. Create a template (e.g. `contact_form`) and use variables like `name`, `reply_to`, `message`.
4. Copy your User ID from the dashboard.
5. In this repo:
   - Confirm `index.html` loads the SDK script, if needed.
   - Open `src/js/forms.js` and replace the placeholders with your EmailJS credentials.

Template notes:

- Make sure the EmailJS template contains the variables used by the script (`name`, `reply_to`, `message`) or adjust the template parameters accordingly.
- EmailJS offers a free plan with reasonable limits for personal forms.

If you prefer another service (Formspree, Netlify Forms, your own backend, or a serverless function), I can help adapt the code.

---

## 👤 Author

**Jose Diaz**

- 📧 josedelcarmen_diaz@outlook.com
- 📍 Barranquilla, Colombia 🇨🇴
- 💼 [LinkedIn](https://www.linkedin.com/in/jose-de-carmen-d-901b39a4/)
- 🐙 [GitHub](https://github.com/jose2520)

---

<div align="center">
  <sub>Made with ❤️ and lots of ☕ in Colombia · 2026</sub>
</div>
