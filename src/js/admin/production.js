import { initLayout, $, esc, fmtDate, toast } from '../layout.js';
import { listOrders, STAGES, updateStage } from '../store.js';

if (initLayout()) {
  function render() {
    const jobs = listOrders().filter((o) => ['Confirmed', 'In Production', 'Ready for Delivery', 'Dispatched'].includes(o.status));
    const current = (o) => o.stages.find((s) => s.status !== 'Completed') ?? o.stages[o.stages.length - 1];
    const cols = STAGES.map((name) => ({ name, jobs: jobs.filter((o) => current(o).name === name) }));
    $('#app').innerHTML = `
      <p class="text-body-md text-on-surface-variant">Confirmed jobs grouped by their current stage. Advance a job to complete its current stage and start the next. Customers see these updates on their tracking page.</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
        ${cols.map((c, i) => `
          <section class="card flex flex-col min-h-[180px]">
            <div class="px-3 py-2 border-b border-outline-variant flex items-center justify-between border-t-[3px] ${['border-t-cmyk-cyan', 'border-t-cmyk-magenta', 'border-t-cmyk-yellow', 'border-t-cmyk-key'][i % 4]} rounded-t-lg">
              <h2 class="font-label-md text-label-md uppercase">${i + 1}. ${esc(c.name)}</h2><span class="chip chip-muted">${c.jobs.length}</span>
            </div>
            <div class="p-2 space-y-2 flex-1">
              ${c.jobs.map((o) => { const st = current(o); return `
                <article class="rounded border border-outline-variant p-3 bg-surface ${st.status === 'Issue' ? 'border-error' : st.status === 'On Hold' ? 'border-tertiary' : ''}">
                  <a href="/admin/order.html?id=${encodeURIComponent(o.number)}" class="font-bold text-primary text-body-md">${esc(o.number)}</a>
                  <div class="text-body-sm">${esc(o.productName)} · ${Number(o.config.quantity).toLocaleString('en-IN')}</div>
                  <div class="text-body-sm text-on-surface-variant">${st.status}${st.updatedAt ? ` · ${fmtDate(st.updatedAt, true)}` : ''}</div>
                  ${st.note ? `<div class="text-body-sm italic mt-1">${esc(st.note)}</div>` : ''}
                  <div class="flex gap-1 mt-2">
                    ${st.status === 'Pending' ? `<button class="btn btn-outline px-2 py-1 text-[12px]" data-start="${esc(o.number)}">Start</button>` : ''}
                    ${st.status !== 'Completed' ? `<button class="btn btn-primary px-2 py-1 text-[12px]" data-advance="${esc(o.number)}">Complete</button>` : '<span class="chip chip-success">Done</span>'}
                  </div>
                </article>`; }).join('') || '<p class="text-body-sm text-outline text-center py-6">Empty</p>'}
            </div>
          </section>`).join('')}
      </div>`;
  }
  $('#app').addEventListener('click', (e) => {
    const adv = e.target.closest('[data-advance]'); const start = e.target.closest('[data-start]');
    const num = adv?.dataset.advance ?? start?.dataset.start;
    if (!num) return;
    const o = listOrders().find((x) => x.number === num);
    const st = o.stages.find((s) => s.status !== 'Completed');
    try {
      updateStage(num, st.name, adv ? 'Completed' : 'In Progress');
      if (adv) { const next = o.stages[st.seq]; if (next) updateStage(num, next.name, 'In Progress'); }
      toast(`${num}: ${st.name} ${adv ? 'completed' : 'started'}`, 'success');
    } catch (err) { toast(err.message, 'error'); }
    render();
  });
  window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1') render(); });
  render();
}
