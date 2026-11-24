import { initLayout, $, SITE, esc } from '../layout.js';
import { PRODUCTS } from '../store.js';
import { productCard } from '../components.js';

initLayout();

$('#home-products').innerHTML = PRODUCTS.map(productCard).join('');

$('#contact-list').innerHTML = [
  ['call', 'Phone', SITE.phone], ['mail', 'Email', SITE.email], ['schedule', 'Hours', SITE.hours], ['location_on', 'Address', SITE.address],
].map(([icon, k, v]) => `<div><dt class="field-label flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">${icon}</span>${k}</dt><dd>${esc(v)}</dd></div>`).join('');

$('#quick-track').addEventListener('submit', (e) => {
  e.preventDefault();
  location.href = `/track.html?id=${encodeURIComponent($('#qt-id').value.trim())}`;
});
