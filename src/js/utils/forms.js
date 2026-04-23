// forms.js - Validación y envío de formulario de contacto usando EmailJS.
// Implementa envío desde el cliente con validación y manejo de errores.
// INSTRUCCIONES: Regístrate en https://www.emailjs.com/, crea un Service ID y un Template ID,
// y copia tu User ID. Sustituye los placeholders en este archivo por esos valores.

// Inicializar el formulario solo cuando el módulo HTML esté en el DOM.
// Modules are loaded asynchronously by modules.js which dispatches a `modulesLoaded` event.
// We listen both for DOMContentLoaded and modulesLoaded and attempt init when the form exists.
const EMAILJS_PUBLIC_KEY = 'AQxiDxsawGuKqcoEg';

function tryInitForm() {
	if (window.__contactFormInitDone) return;
	const form = document.getElementById('contactForm');
	if (!form) return; // aún no inyectado
	window.__contactFormInitDone = true;

	// EmailJS init / load logic
	if (window.emailjs) {
		// SDK presente pero puede que NO esté inicializado con la public key.
		try {
			emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
			console.info('EmailJS SDK presente y inicializado con public key');
		} catch (e) {
			console.warn('EmailJS presente pero fallo init():', e);
		}
	  } else {
		// SDK no presente — intentamos cargarlo dinámicamente desde el CDN y luego inicializar
		console.warn('EmailJS SDK no detectado — cargando dinámicamente desde CDN...');
		const s = document.createElement('script');
		s.type = 'text/javascript';
		// Cargar la versión v4 del SDK (cdn jsdelivr para @emailjs/browser)
		s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
		s.onload = () => {
			if (window.emailjs && typeof emailjs.init === 'function') {
				try {
					emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
					console.info('EmailJS inicializado dinámicamente');
				} catch (e) {
					console.warn('Error inicializando EmailJS tras carga dinámica:', e);
				}
			} else {
				console.warn('El script de EmailJS cargó pero `window.emailjs` sigue sin estar definido.');
			}
		};
		s.onerror = (err) => {
			console.warn('No se pudo cargar el SDK de EmailJS desde el CDN:', err);
		};
		document.head.appendChild(s);
	  }

	// A partir de aquí `form` existe — continuamos con la lógica del formulario

	const btnText = form.querySelector('.btn-text');
	const btnLoading = form.querySelector('.btn-loading');
	const successEl = document.getElementById('formSuccess');
	const tiempoInput = form.elements['time'];

	// Autocompletar el tiempo cuando el formulario está listo
	if (tiempoInput) {
		const now = new Date();
		tiempoInput.value = now.toLocaleString('es-CO', {
			dateStyle: 'short',
			timeStyle: 'short',
		});
	}

	// Helpers para estado UI
	function showLoading() {
		if (btnText) btnText.style.display = 'none';
		if (btnLoading) btnLoading.style.display = 'inline-block';
	}
	function hideLoading() {
		if (btnLoading) btnLoading.style.display = 'none';
		if (btnText) btnText.style.display = 'inline-block';
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		// HTML5 validation
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		const nombre = form.elements['name']?.value.trim() || '';
		const email = form.elements['reply_to']?.value.trim() || '';
		const mensaje = form.elements['message']?.value.trim() || '';
		const tiempo = form.elements['time']?.value.trim() || '';

		console.debug('Contact form values:', { nombre, email, mensaje, tiempo });

		// Mostrar loading
		showLoading();

		// Envío usando sendForm (envía todos los campos del formulario por su atributo name)
		emailjs.sendForm('service_1325', 'template_1325', form)
			.then(function () {
				hideLoading();
				form.reset();
				if (successEl) {
					successEl.style.display = 'block';
					// Ocultar mensaje después de unos segundos
					setTimeout(() => {
						successEl.style.display = 'none';
					}, 6000);
				}
			}, function (error) {
				hideLoading();
				console.error('EmailJS error:', error);
				// Mensaje de fallback
				alert('Ocurrió un error al enviar el mensaje. Por favor inténtalo de nuevo o escríbeme directamente a josedelcarmen_diaz@outlook.com');
			});
	});

}

// Attach attempt on DOMContentLoaded and on modulesLoaded
document.addEventListener('DOMContentLoaded', tryInitForm);
document.addEventListener('modulesLoaded', tryInitForm);

// Also try immediately in case modules were loaded before this script executed
tryInitForm();
