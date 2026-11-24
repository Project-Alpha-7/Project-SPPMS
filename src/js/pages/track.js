import { initLayout, $, esc, param, fmtDate, statusChip } from '../layout.js';
import { getOrder, getOrderByToken, inr, orderValue } from '../store.js';
import { timeline, pageHeader } from '../components.js';

initLayout();
$('#page-header').innerHTML = pageHeader('Order tracking', 'Track your order', 'Enter your Order ID, or open the tracking link from your confirmation.');

let token = param('t');
let number = param('id');
let lastStamp = null;

function find() { return token ? getOrderByToken(token) : number ? getOrder(number) : null; }

function render() {
  const o = find();
  $('#notfound').classList.add('hidden');
  if (!o) {
    $('#result').innerHTML = '';
    if (token || number) { $('#notfound').textContent = `We couldn't find an order with that ${token ? 'tracking link' : `ID (${number})`}. Check the ID and try again.`; $('#notfound').classList.remove('hidden'); }
    return;
  }
  if (o.updatedAt === lastStamp) return;
  lastStamp = o.updatedAt;
  $('#oid').value = o.number;
  const done = o.stages.filter((s) => s.status === 'Completed').length;
  const pct = Math.round((done / o.stages.length) * 100);
  const banner = o.status === 'Modification Requested'
    ? `<div class="card p-5 border-tertiary bg-tertiary-container/30 flex flex-col sm:flex-row gap-4 sm:items-center">
        <span class="material-symbols-outlined text-tertiary text-[32px]">edit_note</span>
        <div class="flex-1"><div class="font-bold">The press has requested a change</div><p class="text-body-md mt-1">${esc(o.message)}</p></div>
        ${token ? `<a class="btn btn-primary" href="/upload.html?order=${encodeURIComponent(o.token)}"><span class="material-symbols-outlined">upload</span>Upload corrected file</a>` : '<span class="text-body-sm text-on-surface-variant">Open the tracking link from your confirmation to upload a corrected file.</span>'}
      </div>`
    : o.status === 'Rejected'
      ? `<div class="card p-5 border-error flex gap-4"><span class="material-symbols-outlined text-error text-[32px]">block</span><div><div class="font-bold">This order was declined</div><p class="text-body-md mt-1">${esc(o.history.filter((h) => h.to === 'Rejected').pop()?.note || 'Please contact the press for details.')}</p></div></div>`
      : o.message ? `<div class="card p-5 flex gap-4"><span class="material-symbols-outlined text-primary">chat</span><div><div class="font-bold">Message from the press</div><p class="text-body-md mt-1">${esc(o.message)}</p></div></div>` : '';

  $('#result').innerHTML = `
    ${banner}
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr),320px] mt-6">
      <section class="card p-5 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div><div class="field-label mb-0">Order</div><div class="font-headline-lg text-headline-lg tracking-wider">${esc(o.number)}</div></div>
          ${statusChip(o.status)}
        </div>
        <div class="mb-6">
          <div class="flex justify-between text-body-sm text-on-surface-variant mb-1"><span>Production progress</span><span>${done} of ${o.stages.length} stages</span></div>
          <div class="h-2 bg-surface-container rounded overflow-hidden"><div class="h-full bg-primary" style="width:${pct}%"></div></div>
        </div>
        ${['Submitted', 'Under Review', 'Modification Requested', 'Rejected', 'Cancelled'].includes(o.status) && done === 0
          ? `<p class="text-body-md text-on-surface-variant">Production starts once the press confirms your order.</p><div class="mt-6 opacity-60">${timeline(o.stages)}</div>`
          : timeline(o.stages)}
      </section>
      <aside class="space-y-4">
        <div class="card p-5">
          <dl class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-body-md">
            <dt class="text-on-surface-variant">Product</dt><dd>${esc(o.productName)}</dd>
            <dt class="text-on-surface-variant">Quantity</dt><dd>${Number(o.config.quantity).toLocaleString('en-IN')} pcs</dd>
            <dt class="text-on-surface-variant">Ordered</dt><dd>${fmtDate(o.createdAt)}</dd>
            <dt class="text-on-surface-variant">${o.confirmedTotal != null ? 'Confirmed quote' : 'Estimate'}</dt><dd>${o.estimate.quoteOnly && o.confirmedTotal == null ? 'Awaiting quote' : inr(orderValue(o))}</dd>
            <dt class="text-on-surface-variant">Payment</dt><dd>${statusChip(o.payment.status)}</dd>
            <dt class="text-on-surface-variant">Handover</dt><dd>${o.delivery.method === 'delivery' ? 'Delivery' : 'Pickup at press'}</dd>
          </dl>
        </div>
        <div class="card p-4 text-body-sm text-on-surface-variant flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>Updates automatically · last change ${fmtDate(o.updatedAt, true)}</div>
      </aside>
    </div>`;
}

$('#lookup').addEventListener('submit', (e) => {
  e.preventDefault();
  number = $('#oid').value.trim().toUpperCase();
  token = null;
  history.replaceState(null, '', `?id=${encodeURIComponent(number)}`);
  lastStamp = null;
  render();
});

// "Real-time": react to changes made in other tabs (admin) and poll as a fallback.
window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1') render(); });
setInterval(render, 4000);
render();
