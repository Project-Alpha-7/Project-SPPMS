import QRCode from 'qrcode';
import { initLayout, $, esc, fmtDate, statusChip } from '../layout.js';
import { listOrders, listInventory, inr, orderValue, paidAmount } from '../store.js';
import { kpi, sectionCard, ordersTable } from './common.js';

if (initLayout()) {
  const render = () => {
    const orders = listOrders();
    const count = (s) => orders.filter((o) => o.status === s).length;
    const live = orders.filter((o) => !['Rejected', 'Cancelled'].includes(o.status));
    const pendingPay = live.filter((o) => o.payment.status !== 'Successful');
    const action = orders.filter((o) => ['Submitted', 'Under Review'].includes(o.status));
    const lowStock = listInventory().filter((i) => i.quantity < i.min);
    const upcoming = orders.filter((o) => ['Confirmed', 'In Production', 'Ready for Delivery'].includes(o.status));
    const stageCounts = {};
    orders.filter((o) => o.status === 'In Production').forEach((o) => {
      const cur = o.stages.find((s) => s.status !== 'Completed');
      if (cur) stageCounts[cur.name] = (stageCounts[cur.name] ?? 0) + 1;
    });

    $('#app').innerHTML = `
      <div class="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
        ${kpi({ label: 'New orders', value: count('Submitted'), tone: 'cyan', href: '/admin/orders.html?status=Submitted' })}
        ${kpi({ label: 'Under review', value: count('Under Review'), tone: 'yellow', href: '/admin/orders.html?status=Under%20Review' })}
        ${kpi({ label: 'Awaiting customer', value: count('Modification Requested'), tone: 'magenta', href: '/admin/orders.html?status=Modification%20Requested' })}
        ${kpi({ label: 'Confirmed', value: count('Confirmed'), tone: 'key', href: '/admin/orders.html?status=Confirmed' })}
        ${kpi({ label: 'In production', value: count('In Production'), tone: 'cyan', href: '/admin/production.html' })}
        ${kpi({ label: 'Ready / dispatched', value: count('Ready for Delivery') + count('Dispatched'), tone: 'yellow' })}
        ${kpi({ label: 'Pending payments', value: pendingPay.length, note: inr(pendingPay.reduce((s, o) => s + orderValue(o) - paidAmount(o), 0)) + ' outstanding', tone: 'magenta', href: '/admin/payments.html' })}
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr),380px]">
        ${sectionCard('Orders requiring action', ordersTable(action, { compact: true }), '<a href="/admin/orders.html" class="btn btn-outline px-3 py-1.5">All orders</a>')}
        <div class="space-y-6">
          ${sectionCard('Production summary', Object.keys(stageCounts).length
            ? `<ul class="space-y-2">${Object.entries(stageCounts).map(([k, v]) => `<li class="flex justify-between text-body-md"><span>${esc(k)}</span><span class="font-bold">${v}</span></li>`).join('')}</ul>`
            : '<p class="text-body-md text-on-surface-variant">No jobs on the floor.</p>', '<a href="/admin/production.html" class="text-primary text-body-md">Board</a>')}
          ${sectionCard('Low-stock alerts', lowStock.length
            ? `<ul class="space-y-2">${lowStock.map((i) => `<li class="flex justify-between text-body-md"><span class="flex items-center gap-2"><span class="material-symbols-outlined text-error text-[18px]">warning</span>${esc(i.name)}</span><span class="text-error font-bold">${i.quantity} ${esc(i.unit)}</span></li>`).join('')}</ul>`
            : '<p class="text-body-md text-on-surface-variant">All stock above minimum.</p>', '<a href="/admin/inventory.html" class="text-primary text-body-md">Inventory</a>')}
        </div>
      </div>

      ${sectionCard('Active jobs', upcoming.length ? `<ul class="divide-y divide-outline-variant">${upcoming.map((o) => `
        <li class="py-3 flex flex-wrap gap-3 items-center justify-between">
          <a class="font-bold text-primary" href="/admin/order.html?id=${encodeURIComponent(o.number)}">${esc(o.number)}</a>
          <span class="flex-1 min-w-[160px]">${esc(o.productName)} · ${Number(o.config.quantity).toLocaleString('en-IN')} pcs</span>
          <span class="text-body-sm text-on-surface-variant">Requested: ${o.delivery.date ? fmtDate(o.delivery.date) : 'no date'}</span>
          ${statusChip(o.status)}
        </li>`).join('')}</ul>` : '<p class="text-body-md text-on-surface-variant">No active jobs.</p>')}

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr),380px]">
        ${sectionCard('Recent orders', ordersTable(orders.slice(0, 6)))}
        ${sectionCard('Platform QR code', `
          <div class="text-center"><canvas id="platform-qr" class="mx-auto bg-white p-2 border border-outline-variant rounded"></canvas>
          <p class="text-body-sm text-on-surface-variant mt-2 break-all">${esc(location.origin)}/</p>
          <p class="text-body-sm text-tertiary mt-1">${/localhost|127\.0\.0\.1/.test(location.hostname) ? 'Local address: regenerate this from the deployed URL before printing.' : 'Points to this deployed site.'}</p>
          <button id="dl-qr" class="btn btn-outline mt-3"><span class="material-symbols-outlined">download</span>Download PNG</button></div>`)}
      </div>`;
    QRCode.toCanvas($('#platform-qr'), `${location.origin}/`, { width: 180, margin: 1 });
    $('#dl-qr').onclick = () => { const a = document.createElement('a'); a.href = $('#platform-qr').toDataURL('image/png'); a.download = 'printflow-platform-qr.png'; a.click(); };
  };
  render();
  window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1') render(); });
}
