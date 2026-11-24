import { initLayout, $, $$, esc, param, toast } from '../layout.js';
import { listOrders, ORDER_STATUSES, PRODUCTS, setStatus } from '../store.js';
import { ordersTable } from './common.js';

if (initLayout()) {
  const state = { q: '', status: param('status') ?? 'All', product: 'All', from: '', to: '' };

  $('#app').innerHTML = `
    <section class="card p-4 grid gap-3 md:grid-cols-[minmax(0,1fr),auto,auto,auto] items-end">
      <div><label class="field-label" for="q">Search</label><input id="q" class="field" placeholder="Order ID, customer or phone" /></div>
      <div><label class="field-label" for="product">Product</label><select id="product" class="field"><option>All</option>${PRODUCTS.map((p) => `<option>${esc(p.name)}</option>`).join('')}</select></div>
      <div><label class="field-label" for="from">From</label><input id="from" type="date" class="field" /></div>
      <div><label class="field-label" for="to">To</label><input id="to" type="date" class="field" /></div>
    </section>
    <div id="tabs" class="flex gap-2 overflow-x-auto pb-1" role="tablist"></div>
    <div id="bulk" class="hidden card bg-primary text-on-primary border-primary p-3 flex flex-wrap items-center gap-3">
      <span id="bulk-count" class="font-bold"></span>
      <button type="button" id="bulk-review" class="btn bg-on-primary text-primary px-3 py-1.5">Mark under review</button>
      <button type="button" id="bulk-clear" class="underline">Deselect</button>
    </div>
    <section class="card p-5"><div id="table"></div></section>`;

  const filtered = () => listOrders().filter((o) => {
    const q = state.q.toLowerCase();
    return (state.status === 'All' || o.status === state.status)
      && (state.product === 'All' || o.productName === state.product)
      && (!q || `${o.number} ${o.customer.name} ${o.customer.phone}`.toLowerCase().includes(q))
      && (!state.from || o.createdAt.slice(0, 10) >= state.from)
      && (!state.to || o.createdAt.slice(0, 10) <= state.to);
  });

  function render() {
    const all = listOrders();
    $('#tabs').innerHTML = ['All', ...ORDER_STATUSES].map((s) => {
      const n = s === 'All' ? all.length : all.filter((o) => o.status === s).length;
      return `<button type="button" role="tab" aria-selected="${s === state.status}" data-status="${esc(s)}" class="shrink-0 px-3 py-1.5 rounded border font-label-md text-label-md uppercase whitespace-nowrap ${s === state.status ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant text-on-surface-variant hover:text-on-surface'}">${esc(s)} <span class="opacity-70">${n}</span></button>`;
    }).join('');
    $('#table').innerHTML = ordersTable(filtered(), { selectable: true });
    updateBulk();
  }
  function updateBulk() {
    const n = $$('[data-select]:checked').length;
    $('#bulk').classList.toggle('hidden', n === 0);
    $('#bulk-count').textContent = `${n} selected`;
  }

  $('#tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-status]'); if (b) { state.status = b.dataset.status; history.replaceState(null, '', state.status === 'All' ? location.pathname : `?status=${encodeURIComponent(state.status)}`); render(); } });
  $('#q').addEventListener('input', (e) => { state.q = e.target.value.trim(); render(); });
  $('#product').addEventListener('change', (e) => { state.product = e.target.value; render(); });
  $('#from').addEventListener('change', (e) => { state.from = e.target.value; render(); });
  $('#to').addEventListener('change', (e) => { state.to = e.target.value; render(); });
  $('#table').addEventListener('change', (e) => { if (e.target.matches('[data-select]')) updateBulk(); });
  $('#bulk-clear').addEventListener('click', () => { $$('[data-select]').forEach((c) => { c.checked = false; }); updateBulk(); });
  $('#bulk-review').addEventListener('click', () => {
    const sel = $$('[data-select]:checked').map((c) => c.dataset.select);
    const all = listOrders();
    let moved = 0;
    sel.forEach((n) => { if (all.find((o) => o.number === n)?.status === 'Submitted') { setStatus(n, 'Under Review', { note: 'Picked up for review' }); moved++; } });
    toast(moved ? `${moved} order(s) moved to Under Review` : 'Only new (Submitted) orders can be moved to review.', moved ? 'success' : 'info');
    render();
  });
  window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1') render(); });
  render();
}
