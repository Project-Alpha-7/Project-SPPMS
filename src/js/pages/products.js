import { initLayout, $, esc } from '../layout.js';
import { PRODUCTS } from '../store.js';
import { productCard, pageHeader } from '../components.js';

initLayout();
$('#page-header').innerHTML = pageHeader('Catalogue', 'Printing products', 'Choose a product to configure its size, quantity, paper and finishing, and see an instant estimate.');

const cats = ['All', ...new Set(PRODUCTS.map((p) => p.category))];
let cat = 'All';

function render() {
  const q = $('#search').value.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => (cat === 'All' || p.category === cat) && (!q || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)));
  $('#grid').innerHTML = list.map(productCard).join('');
  $('#empty').classList.toggle('hidden', list.length > 0);
  $('#filters').innerHTML = cats.map((c) => `<button type="button" role="tab" aria-selected="${c === cat}" data-cat="${esc(c)}" class="shrink-0 px-3 py-1.5 rounded border font-label-md text-label-md uppercase ${c === cat ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant text-on-surface-variant hover:text-on-surface'}">${esc(c)}${c === 'All' ? ` (${PRODUCTS.length})` : ''}</button>`).join('');
}
$('#filters').addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; render(); } });
$('#search').addEventListener('input', render);
render();
