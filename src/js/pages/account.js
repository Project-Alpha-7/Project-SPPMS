import { initLayout, $, esc, fmtDate, statusChip } from '../layout.js';
import { getOrder, inr, orderValue } from '../store.js';
import { pageHeader } from '../components.js';
import { myOrderNumbers } from '../draft.js';

initLayout();
$('#page-header').innerHTML = pageHeader('Account', 'My orders', 'Orders you have placed, with their latest status.');

const DONE = ['Delivered', 'Rejected', 'Cancelled'];
let tab = 'active';

function render() {
  const orders = myOrderNumbers().map(getOrder).filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const active = orders.filter((o) => !DONE.includes(o.status));
  const past = orders.filter((o) => DONE.includes(o.status));
  $('#tabs').innerHTML = [['active', `Active (${active.length})`], ['past', `Past (${past.length})`]].map(([k, l]) => `<button type="button" role="tab" aria-selected="${k === tab}" data-tab="${k}" class="px-4 py-2 rounded border font-label-md text-label-md uppercase ${k === tab ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant text-on-surface-variant'}">${l}</button>`).join('');
  const list = tab === 'active' ? active : past;
  $('#list').innerHTML = list.length ? list.map((o) => `
    <a href="/track.html?t=${encodeURIComponent(o.token)}" class="card p-5 hover:border-primary transition-colors block">
      <div class="flex items-start justify-between gap-3">
        <div><div class="font-label-tech text-label-tech uppercase text-outline">${fmtDate(o.createdAt)}</div><div class="font-title-md text-title-md mt-1 tracking-wide">${esc(o.number)}</div></div>
        ${statusChip(o.status)}
      </div>
      <div class="mt-3 text-body-md text-on-surface-variant">${esc(o.productName)} · ${Number(o.config.quantity).toLocaleString('en-IN')} pcs</div>
      <div class="mt-4 flex items-center justify-between border-t border-outline-variant pt-3">
        <span class="text-body-sm text-on-surface-variant">${o.confirmedTotal != null ? 'Confirmed' : 'Estimate'}</span>
        <span class="font-bold">${inr(orderValue(o))}</span>
      </div>
      ${o.status === 'Modification Requested' ? '<div class="mt-3 text-body-sm text-tertiary font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">priority_high</span>Action needed</div>' : ''}
    </a>`).join('')
    : `<div class="md:col-span-2 xl:col-span-3 card p-10 text-center"><span class="material-symbols-outlined text-[48px] text-outline">receipt_long</span><p class="text-body-lg mt-3">No ${tab} orders yet.</p><a href="/products.html" class="btn btn-primary mt-5">Start an order</a></div>`;
}
$('#tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-tab]'); if (b) { tab = b.dataset.tab; render(); } });
window.addEventListener('storage', render);
render();
