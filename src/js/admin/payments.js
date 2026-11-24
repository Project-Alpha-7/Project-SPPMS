import { initLayout, $, esc, fmtDate, statusChip } from '../layout.js';
import { listOrders, inr, orderValue, paidAmount, PAYMENT_METHODS } from '../store.js';
import { kpi, sectionCard } from './common.js';

if (initLayout()) {
  const render = () => {
    const orders = listOrders().filter((o) => !['Rejected', 'Cancelled'].includes(o.status));
    const quoted = orders.reduce((s, o) => s + orderValue(o), 0);
    const paid = orders.reduce((s, o) => s + paidAmount(o), 0);
    const records = listOrders().flatMap((o) => o.payment.records.map((r) => ({ ...r, number: o.number, customer: o.customer.name }))).sort((a, b) => b.at.localeCompare(a.at));
    $('#app').innerHTML = `
      <div class="card p-4 flex gap-3 text-body-md border-tertiary"><span class="material-symbols-outlined text-tertiary">info</span>No payment gateway is connected. Online payment is in demo mode, and payments are recorded manually from each order's page.</div>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-3">
        ${kpi({ label: 'Total order value', value: inr(quoted), note: 'Confirmed quotes, or estimates where not yet confirmed', tone: 'cyan' })}
        ${kpi({ label: 'Recorded payments', value: inr(paid), tone: 'key' })}
        ${kpi({ label: 'Outstanding balance', value: inr(Math.max(0, quoted - paid)), tone: 'magenta' })}
      </div>
      ${sectionCard('Balances by order', `<div class="overflow-x-auto -mx-5"><table class="w-full text-body-md min-w-[720px]">
        <thead><tr class="text-left font-label-md text-label-md uppercase text-on-surface-variant border-b border-outline-variant"><th class="py-2 px-3">Order</th><th class="py-2 px-3">Customer</th><th class="py-2 px-3">Method</th><th class="py-2 px-3">Status</th><th class="py-2 px-3 text-right">Value</th><th class="py-2 px-3 text-right">Paid</th><th class="py-2 px-3 text-right">Outstanding</th></tr></thead>
        <tbody>${orders.map((o) => `<tr class="border-b border-outline-variant/70">
          <td class="py-2 px-3"><a class="text-primary font-bold" href="/admin/order.html?id=${encodeURIComponent(o.number)}">${esc(o.number)}</a></td>
          <td class="py-2 px-3">${esc(o.customer.name)}</td><td class="py-2 px-3">${esc(PAYMENT_METHODS[o.payment.method])}</td>
          <td class="py-2 px-3">${statusChip(o.payment.status)}</td>
          <td class="py-2 px-3 text-right tabular-nums">${inr(orderValue(o))}</td><td class="py-2 px-3 text-right tabular-nums">${inr(paidAmount(o))}</td>
          <td class="py-2 px-3 text-right tabular-nums font-bold">${inr(Math.max(0, orderValue(o) - paidAmount(o)))}</td></tr>`).join('')}</tbody></table></div>`)}
      ${sectionCard('Payment records (audit trail)', records.length ? `<ul class="divide-y divide-outline-variant">${records.map((r) => `
        <li class="py-2 flex flex-wrap gap-x-4 gap-y-1 text-body-md"><span class="w-40 text-on-surface-variant">${fmtDate(r.at, true)}</span><a class="text-primary" href="/admin/order.html?id=${encodeURIComponent(r.number)}">${esc(r.number)}</a><span>${esc(r.customer)}</span><span class="font-bold">${inr(r.amount)}</span><span>${esc(r.method)}</span><span class="text-on-surface-variant">${esc(r.reference)}</span><span class="chip chip-muted">${esc(r.verification)}</span></li>`).join('')}</ul>` : '<p class="text-on-surface-variant">No payments recorded yet.</p>')}`;
  };
  render();
  window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1') render(); });
}
