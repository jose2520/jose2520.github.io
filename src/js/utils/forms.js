// forms.js - Contact form validation and submission using EmailJS.
// Implements client-side submission with validation and error handling.
// INSTRUCTIONS: Register at https://www.emailjs.com/, create a Service ID and a Template ID,
// and copy your User ID. Replace placeholders in this file with those values.

// Initialize the form only when the HTML module is in the DOM.
// Modules are loaded asynchronously by modules.js which dispatches a `modulesLoaded` event.
// We listen for both DOMContentLoaded and modulesLoaded and attempt init when the form exists.
const EMAILJS_PUBLIC_KEY = 'AQxiDxsawGuKqcoEg';

function tryInitForm() {
	if (window.__contactFormInitDone) return;
	const form = document.getElementById('contactForm');
	if (!form) return; // not injected yet
	window.__contactFormInitDone = true;

	// EmailJS init / load logic
	if (window.emailjs) {
		// SDK is present but may NOT be initialized with the public key.
		try {
			emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
			console.info('EmailJS SDK present and initialized with public key');
		} catch (e) {
			console.warn('EmailJS present but init() failed:', e);
		}
	} else {
		// SDK not present — attempt dynamic CDN load then initialize
		console.warn('EmailJS SDK not detected — loading dynamically from CDN...');
		const s = document.createElement('script');
		s.type = 'text/javascript';
		// Load the v4 SDK (jsdelivr CDN for @emailjs/browser)
		s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
		s.onload = () => {
			if (window.emailjs && typeof emailjs.init === 'function') {
				try {
					emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
					console.info('EmailJS initialized dynamically');
				} catch (e) {
					console.warn('Error initializing EmailJS after dynamic load:', e);
				}
			} else {
				console.warn('EmailJS script loaded but `window.emailjs` is still undefined.');
			}
		};
		s.onerror = (err) => {
			console.warn('Could not load EmailJS SDK from CDN:', err);
		};
		document.head.appendChild(s);
	}

	// From this point `form` exists — continue with form logic

	const btnText = form.querySelector('.btn-text');
	const btnLoading = form.querySelector('.btn-loading');
	const successEl = document.getElementById('formSuccess');
	const timeInput = form.elements['time'];

	// Auto-fill the time when the form is ready
	if (timeInput) {
		const now = new Date();
		timeInput.value = now.toLocaleString('es-CO', {
			dateStyle: 'short',
			timeStyle: 'short',
		});
	}

	// UI state helpers
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

		const nameValue = form.elements['name']?.value.trim() || '';
		const email = form.elements['reply_to']?.value.trim() || '';
		const messageValue = form.elements['message']?.value.trim() || '';
		const timeValue = form.elements['time']?.value.trim() || '';

		console.debug('Contact form values:', { nameValue, email, messageValue, timeValue });

		// Show loading
		showLoading();

		// Send using sendForm (submits all form fields by name attribute)
		emailjs.sendForm('service_1325', 'template_1325', form)
			.then(function () {
				hideLoading();
				form.reset();
				if (successEl) {
					successEl.style.display = 'block';
					// Hide message after a few seconds
					setTimeout(() => {
						successEl.style.display = 'none';
					}, 6000);
				}
			}, function (error) {
				hideLoading();
				console.error('EmailJS error:', error);
				// Fallback message
				alert('An error occurred sending the message. Please try again or contact me directly at josedelcarmen_diaz@outlook.com');
			});
	});

}

// Attach attempt on DOMContentLoaded and on modulesLoaded
document.addEventListener('DOMContentLoaded', tryInitForm);
document.addEventListener('modulesLoaded', tryInitForm);

// Also try immediately in case modules were loaded before this script executed
tryInitForm();
