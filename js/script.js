'use strict';

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
const mobile = window.matchMedia('(max-width: 650px)');

function closeMenu(returnFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  nav.hidden = mobile.matches;
  if (returnFocus) toggle.focus();
}

function syncNavigation() {
  toggle.hidden = !mobile.matches;
  closeMenu();
}

toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opening));
  nav.hidden = !opening;
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  closeMenu();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (mobile.matches && !event.target.closest('.masthead')) closeMenu();
});
mobile.addEventListener('change', syncNavigation);
syncNavigation();

const filters = document.querySelector('.filters');
const dishes = [...document.querySelectorAll('.dish-list li')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  dishes.forEach(dish => { dish.hidden = button.dataset.filter !== 'all' && dish.dataset.category !== button.dataset.filter; });
  const count = dishes.filter(dish => !dish.hidden).length;
  document.querySelector('#filter-status').textContent = `${count} propuestas de la carta publicada.`;
});

const copy = document.querySelector('#copy-phone');
const copyStatus = document.querySelector('#copy-status');
copy.hidden = false;
copy.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('655 360 519');
    copyStatus.textContent = 'Teléfono copiado: 655 360 519.';
    document.querySelector('#copy-fallback').hidden = true;
  } catch {
    copyStatus.textContent = 'Puedes copiar el número en el campo inferior.';
    document.querySelector('#copy-fallback').hidden = false;
    const field = document.querySelector('#phone-value');
    field.focus();
    field.select();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
