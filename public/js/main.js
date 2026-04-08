/* ─────────────────────────────────────────
   PORTFOLIO — main.js
   ───────────────────────────────────────── */

const html = document.documentElement;

// ── THEME ──────────────────────────────────────────────────────────────────
// Respect OS preference on first visit; use saved value on return visits.
(function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.setAttribute('data-theme', 'light');
    }
  } catch (_) {}
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (_) {}
});

// ── HAMBURGER NAV ──────────────────────────────────────────────────────────
const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── SMOOTH SCROLL ──────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', link.getAttribute('href'));
  });
});

// ── ACTIVE NAV ON SCROLL ───────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAs.forEach(a => a.classList.remove('active'));
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── SCROLL FADE-IN ─────────────────────────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

// Hero elements are visible immediately
document.querySelectorAll('#hero .fade-in').forEach(el => el.classList.add('visible'));
// All other sections animate in on scroll
document.querySelectorAll('section:not(#hero) .fade-in').forEach(el => fadeObserver.observe(el));

// ── CONTACT FORM ───────────────────────────────────────────────────────────
const form   = document.querySelector('form');
const status = document.getElementById('formStatus');
const btn    = document.getElementById('formSubmit');

if (form) {
  form.addEventListener('submit', async (e) => {
    // Skip fetch if the form still has the placeholder endpoint
    if (form.action.includes('YOUR_FORM_ID')) return;
    e.preventDefault();

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        status.textContent = "Message sent. I'll be in touch soon.";
        status.className   = 'form-status success';
        form.reset();
      } else {
        throw new Error('non-ok response');
      }
    } catch {
      status.textContent = 'Something went wrong. Try emailing directly.';
      status.className   = 'form-status error';
    } finally {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
    }
  });
}
