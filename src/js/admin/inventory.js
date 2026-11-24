import { initLayout, $, esc, fmtDate, toast } from '../layout.js';
import { listInventory, adjustInventory, inventoryLog } from '../store.js';
import { sectionCard } from './common.js';

if (initLayout()) {
  const render = () => {
    const items = listInventory();
    const low = items.filter((i) => i.quantity < i.min);
    $('#app').innerHTML = `
      ${low.length ? `<div class="card p-4 border-error flex gap-3 text-body-md"><span class="material-symbols-outlined text-error">warning</span><span><strong>${low.length} item(s) below minimum:</strong> ${low.map((i) => esc(i.name)).join(', ')}</span></div>` : ''}
      ${sectionCard('Stock (manual updates)', `<div class="overflow-x-auto -mx-5"><table class="w-full text-body-md min-w-[760px]">
        <thead><tr class="text-left font-label-md text-label-md uppercase text-on-surface-variant border-b border-outline-variant"><th class="py-2 px-3">Item</th><th class="py-2 px-3">Category</th><th class="py-2 px-3">Level</th><th class="py-2 px-3 text-right">Minimum</th><th class="py-2 px-3">Updated</th><th class="py-2 px-3">Adjust</th></tr></thead>
        <tbody>${items.map((i) => { const isLow = i.quantity < i.min; const pct = i.unit === '%' ? i.quantity : Math.min(100, (i.quantity / (i.min * 3)) * 100); return `
          <tr class="border-b border-outline-variant/70">
            <td class="py-2 px-3 font-bold">${esc(i.name)}</td><td class="py-2 px-3">${esc(i.category)}</td>
            <td class="py-2 px-3 w-64"><div class="flex justify-between"><span class="${isLow ? 'text-error font-bold' : ''}">${i.quantity} ${esc(i.unit)}</span>${isLow ? '<span class="chip chip-danger">Low</span>' : '<span class="chip chip-success">OK</span>'}</div>
              <div class="h-1.5 bg-surface-container rounded mt-1 overflow-hidden"><div class="h-full ${isLow ? 'bg-error' : 'bg-primary'}" style="width:${pct}%"></div></div></td>
            <td class="py-2 px-3 text-right">${i.min} ${esc(i.unit)}</td><td class="py-2 px-3 text-body-sm text-on-surface-variant">${fmtDate(i.updatedAt, true)}</td>
            <td class="py-2 px-3"><form class="flex gap-1" data-adjust="${esc(i.id)}"><input type="number" step="any" class="field py-1 w-20" placeholder="±qty" required aria-label="Change for ${esc(i.name)}" /><input class="field py-1 w-36" placeholder="Reason" required aria-label="Reason" /><button class="btn btn-outline px-2 py-1">Apply</button></form></td>
          </tr>`; }).join('')}</tbody></table></div>`)}
      ${sectionCard('Stock activity', inventoryLog().length ? `<ul class="divide-y divide-outline-variant">${inventoryLog().map((l) => `<li class="py-2 flex flex-wrap gap-4 text-body-md"><span class="text-on-surface-variant w-40">${fmtDate(l.at, true)}</span><span class="font-bold">${esc(l.item)}</span><span class="${l.delta < 0 ? 'text-error' : 'text-success'}">${l.delta > 0 ? '+' : ''}${l.delta}</span><span class="text-on-surface-variant">${esc(l.reason)}</span></li>`).join('')}</ul>` : '<p class="text-on-surface-variant">No stock changes recorded in this session.</p>')}`;
  };
  $('#app').addEventListener('submit', (e) => {
    const f = e.target.closest('[data-adjust]');
    if (!f) return;
    e.preventDefault();
    const [qty, reason] = f.querySelectorAll('input');
    const d = Number(qty.value);
    if (!d) { toast('Enter a non-zero change.', 'error'); return; }
    const it = adjustInventory(f.dataset.adjust, d, reason.value.trim());
    toast(`${it.name}: now ${it.quantity} ${it.unit}`, it.quantity < it.min ? 'error' : 'success');
    render();
  });
  render();
}
