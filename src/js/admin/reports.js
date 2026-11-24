import { initLayout, $ } from '../layout.js';
import { listOrders, inr, orderValue, paidAmount, PRODUCTS, ORDER_STATUSES } from '../store.js';
import { kpi, sectionCard, barChart, hbars } from './common.js';

if (initLayout()) {
  const iso = (d) => d.toISOString().slice(0, 10);
  const today = new Date();
  const start = new Date(); start.setDate(today.getDate() - 13);
  const state = { from: iso(start), to: iso(today) };

  const render = () => {
    const orders = listOrders().filter((o) => o.createdAt.slice(0, 10) >= state.from && o.createdAt.slice(0, 10) <= state.to);
    const live = orders.filter((o) => !['Rejected', 'Cancelled'].includes(o.status));
    const value = live.reduce((s, o) => s + orderValue(o), 0);
    const paid = live.reduce((s, o) => s + paidAmount(o), 0);
    const completed = orders.filter((o) => o.status === 'Delivered');
    const durations = completed.map((o) => {
      const end = o.stages.find((s) => s.name === 'Delivered')?.updatedAt;
      return end ? (new Date(end) - new Date(o.createdAt)) / 36e5 / 24 : null;
    }).filter((x) => x != null && x >= 0);
    const avg = durations.length ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(1) : '—';

    const days = [];
    for (let d = new Date(state.from); iso(d) <= state.to; d.setDate(d.getDate() + 1)) days.push(iso(d));
    const byDay = days.map((d) => ({ label: d.slice(8), value: orders.filter((o) => o.createdAt.slice(0, 10) === d).length }));
    const byProduct = PRODUCTS.map((p) => ({ label: p.name, value: orders.filter((o) => o.productId === p.id).length })).filter((x) => x.value).sort((a, b) => b.value - a.value);
    const byStatus = ORDER_STATUSES.map((s) => ({ label: s, value: orders.filter((o) => o.status === s).length })).filter((x) => x.value);

    $('#app').innerHTML = `
      <section class="card p-4 flex flex-wrap items-end gap-3">
        <div><label class="field-label" for="from">From</label><input id="from" type="date" class="field" value="${state.from}" /></div>
        <div><label class="field-label" for="to">To</label><input id="to" type="date" class="field" value="${state.to}" /></div>
        <button id="export" class="btn btn-outline ml-auto"><span class="material-symbols-outlined">download</span>Export CSV</button>
        <span class="demo-flag">Includes demo orders</span>
      </section>
      <div class="grid gap-4 grid-cols-2 lg:grid-cols-5">
        ${kpi({ label: 'Orders', value: orders.length, tone: 'cyan' })}
        ${kpi({ label: 'Completed vs open', value: `${completed.length} / ${live.length - completed.length}`, tone: 'key' })}
        ${kpi({ label: 'Order value', value: inr(value), tone: 'cyan' })}
        ${kpi({ label: 'Paid / outstanding', value: inr(paid), note: `${inr(Math.max(0, value - paid))} outstanding`, tone: 'magenta' })}
        ${kpi({ label: 'Avg completion', value: `${avg}${avg === '—' ? '' : ' days'}`, note: 'Submitted → delivered', tone: 'yellow' })}
      </div>
      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        ${sectionCard('Orders by day', barChart(byDay, { height: 200 }))}
        ${sectionCard('Orders by product', byProduct.length ? hbars(byProduct) : '<p class="text-on-surface-variant">No data.</p>')}
        ${sectionCard('Orders by status', byStatus.length ? hbars(byStatus) : '<p class="text-on-surface-variant">No data.</p>')}
        ${sectionCard('Value by product', hbars(PRODUCTS.map((p) => ({ label: p.name, value: live.filter((o) => o.productId === p.id).reduce((s, o) => s + orderValue(o), 0) })).filter((x) => x.value), { format: inr }))}
      </div>`;

    $('#from').onchange = (e) => { state.from = e.target.value; render(); };
    $('#to').onchange = (e) => { state.to = e.target.value; render(); };
    $('#export').onclick = () => {
      const rows = [['order', 'date', 'product', 'quantity', 'status', 'payment', 'value_inr', 'paid_inr']]
        .concat(orders.map((o) => [o.number, o.createdAt.slice(0, 10), o.productName, o.config.quantity, o.status, o.payment.status, (orderValue(o) / 100).toFixed(2), (paidAmount(o) / 100).toFixed(2)]));
      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      a.download = `printflow-orders-${state.from}-to-${state.to}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
  };
  render();
}
