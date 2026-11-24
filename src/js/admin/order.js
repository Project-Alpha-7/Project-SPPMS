import { initLayout, $, esc, param, fmtDate, statusChip, toast } from '../layout.js';
import {
  getOrder, product, setStatus, updateStage, setQuote, addNote, recordPayment, inr, orderValue, paidAmount,
  STAGE_STATUSES, PAYMENT_METHODS,
} from '../store.js';
import { breakdownTable, timeline, specList } from '../components.js';
import { sectionCard } from './common.js';

const PRE = ['Submitted', 'Under Review', 'Modification Requested'];
const fmtSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

function dialog(id, title, body, submitLabel, danger = false) {
  return `<dialog id="${id}" class="rounded-lg p-0 w-[min(560px,calc(100%-2rem))] bg-surface-container-lowest text-on-surface backdrop:bg-black/50">
    <form method="dialog" class="p-6 space-y-4" data-dialog-form>
      <div class="flex items-start justify-between gap-4"><h2 class="font-headline-sm text-headline-sm">${title}</h2><button value="cancel" formnovalidate class="btn btn-ghost px-2" aria-label="Close"><span class="material-symbols-outlined">close</span></button></div>
      ${body}
      <div class="flex justify-end gap-3 pt-2"><button value="cancel" formnovalidate class="btn btn-outline">Cancel</button><button value="ok" class="btn ${danger ? 'btn-danger' : 'btn-primary'}">${submitLabel}</button></div>
    </form></dialog>`;
}

function jobCard(o, p) {
  const fin = (o.config.finishes ?? []).map((id) => p.finishes.find((f) => f.id === id)?.label).filter(Boolean);
  return `
  <div class="p-8 text-[#181c1f] bg-white" style="font-family:'Times New Roman',serif">
    <div class="flex justify-between items-start border-b-2 border-black pb-3">
      <div><div style="font-size:11px;letter-spacing:.1em">PRINTFLOW · DIGITAL JOB CARD</div><div style="font-size:28px;font-weight:700">${esc(o.number)}</div></div>
      <div class="text-right" style="font-size:12px">Printed ${fmtDate(new Date().toISOString(), true)}<br/>Status: ${esc(o.status)}</div>
    </div>
    <table class="w-full mt-4" style="font-size:14px;border-collapse:collapse">
      ${[['Customer (internal)', `${o.customer.name} · ${o.customer.phone}`], ['Product', p.name], ['Quantity', `${o.config.quantity} pcs`], ['Size', o.config.size],
        ['Material / GSM', p.materials.find((m) => m.id === o.config.material)?.label], ['Colour / sides', `${o.config.colour}${p.sides ? ` · ${o.config.sides} sided` : ''}`],
        ['Printing method', o.config.method], ['Finishing', fin.join(', ') || 'None'], ['Approved artwork', o.files.map((f) => f.name).join(', ')],
        ['Requested date', o.delivery.date ? fmtDate(o.delivery.date) : 'Not specified'], ['Handover', o.delivery.method === 'delivery' ? `Delivery · PIN ${o.delivery.pin}` : 'Pickup'],
        ['Approval / payment', `${o.status} · payment ${o.payment.status}`], ['Special instructions', o.config.notes || '—']]
        .map(([k, v]) => `<tr><td style="border:1px solid #999;padding:6px 8px;width:35%;font-weight:700">${k}</td><td style="border:1px solid #999;padding:6px 8px">${esc(v)}</td></tr>`).join('')}
    </table>
    <div style="font-weight:700;margin-top:18px;font-size:13px;letter-spacing:.06em">PRODUCTION CHECKLIST</div>
    <table class="w-full mt-2" style="font-size:13px;border-collapse:collapse">
      ${o.stages.map((s) => `<tr><td style="border:1px solid #999;padding:6px 8px;width:30px">${s.status === 'Completed' ? '☑' : '☐'}</td><td style="border:1px solid #999;padding:6px 8px">${s.seq}. ${esc(s.name)}</td><td style="border:1px solid #999;padding:6px 8px;width:30%">Sign / time:</td></tr>`).join('')}
    </table>
  </div>`;
}

if (initLayout()) {
  const number = param('id');

  function render() {
    const o = getOrder(number);
    if (!o) { $('#app').innerHTML = `<div class="card p-10 text-center"><h2 class="font-headline-lg text-headline-lg">Order not found</h2><a href="/admin/orders.html" class="btn btn-primary mt-6">Back to orders</a></div>`; return; }
    const p = product(o.productId);
    document.title = `${o.number} — PrintFlow OS`;
    const canProduce = !PRE.includes(o.status) && !['Rejected', 'Cancelled'].includes(o.status);
    const paid = paidAmount(o);

    const actions = [
      o.status === 'Submitted' && '<button class="btn btn-outline" data-act="review"><span class="material-symbols-outlined">visibility</span>Start review</button>',
      PRE.includes(o.status) && '<button class="btn btn-primary" data-act="confirm"><span class="material-symbols-outlined">check_circle</span>Confirm order</button>',
      PRE.includes(o.status) && '<button class="btn btn-outline" data-act="modify"><span class="material-symbols-outlined">edit_note</span>Request modification</button>',
      PRE.includes(o.status) && '<button class="btn btn-outline text-error" data-act="reject"><span class="material-symbols-outlined">block</span>Reject</button>',
      canProduce && '<button class="btn btn-outline" data-act="jobcard"><span class="material-symbols-outlined">print</span>Job card</button>',
      !['Delivered', 'Rejected', 'Cancelled', 'Dispatched'].includes(o.status) && '<button class="btn btn-ghost" data-act="cancel">Cancel order</button>',
    ].filter(Boolean).join('');

    const stageControls = o.stages.map((s) => `
      <div class="grid sm:grid-cols-[minmax(0,1fr),150px,1fr,auto] gap-2 items-center py-2 border-b border-outline-variant/60" data-stage="${esc(s.name)}">
        <div><span class="font-bold">${s.seq}. ${esc(s.name)}</span><div class="text-body-sm text-on-surface-variant">${s.updatedAt ? `${fmtDate(s.updatedAt, true)} · ${esc(s.by)}` : 'Not started'}</div></div>
        <select class="field py-1.5" aria-label="${esc(s.name)} status" ${canProduce ? '' : 'disabled'}>${STAGE_STATUSES.map((st) => `<option ${st === s.status ? 'selected' : ''}>${st}</option>`).join('')}</select>
        <input class="field py-1.5" placeholder="Note (required for On Hold / Issue)" value="${esc(s.note)}" ${canProduce ? '' : 'disabled'} />
        <button class="btn btn-outline px-3 py-1.5" data-save-stage ${canProduce ? '' : 'disabled'}>Save</button>
      </div>`).join('');

    $('#app').innerHTML = `
      <a href="/admin/orders.html" class="inline-flex items-center gap-1 text-body-md text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined text-[18px]">arrow_back</span>All orders</a>
      <section class="card overflow-hidden">
        <div class="cmyk-strip"><span></span><span></span><span></span><span></span></div>
        <div class="p-5 flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
          <div>
            <div class="flex flex-wrap items-center gap-3"><h2 class="font-headline-lg text-headline-lg tracking-wide">${esc(o.number)}</h2>${statusChip(o.status)}${o.demo ? '<span class="demo-flag">demo order</span>' : ''}</div>
            <p class="text-body-md text-on-surface-variant mt-1">${esc(o.productName)} · ${Number(o.config.quantity).toLocaleString('en-IN')} pcs · submitted ${fmtDate(o.createdAt, true)}</p>
          </div>
          <div class="flex flex-wrap gap-2">${actions}</div>
        </div>
        ${o.message ? `<div class="px-5 pb-4 text-body-md"><span class="font-bold">Message shown to customer:</span> ${esc(o.message)}</div>` : ''}
      </section>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr),420px]">
        <div class="space-y-6">
          ${sectionCard('Specifications', specList(o, p))}
          ${sectionCard('Artwork', `<ul class="space-y-2">${o.files.map((f) => `<li class="flex items-center gap-3 p-3 rounded border border-outline-variant"><span class="material-symbols-outlined text-secondary">${f.type === 'application/pdf' ? 'picture_as_pdf' : 'image'}</span><span class="flex-1 truncate">${esc(f.name)}</span><span class="text-body-sm text-on-surface-variant">${fmtSize(f.size)}</span></li>`).join('')}</ul>
            <p class="text-body-sm text-on-surface-variant mt-3"><span class="demo-flag">Demo</span> File preview and secure download arrive with private storage (Stage 6). Uploaded files are not print-ready until reviewed.</p>`)}
          ${sectionCard('Production stages', `${canProduce ? '' : '<p class="text-body-md text-tertiary mb-3 flex gap-2"><span class="material-symbols-outlined">lock</span>Confirm the order before starting production.</p>'}${stageControls}`, '<a href="/admin/production.html" class="text-primary text-body-md">Production board</a>')}
          ${sectionCard('Activity history', `<ol class="space-y-3">${o.history.slice().reverse().map((h) => `<li class="flex gap-3 text-body-md"><span class="material-symbols-outlined text-outline text-[18px] mt-0.5">history</span><div><div>${h.from ? `${esc(h.from)} → ` : ''}<span class="font-bold">${esc(h.to)}</span> <span class="text-on-surface-variant">by ${esc(h.by)}</span></div><div class="text-body-sm text-on-surface-variant">${fmtDate(h.at, true)}${h.note ? ` · ${esc(h.note)}` : ''}</div></div></li>`).join('')}</ol>`)}
        </div>
        <div class="space-y-6">
          ${sectionCard('Customer', `<dl class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-body-md">
            <dt class="text-on-surface-variant">Name</dt><dd>${esc(o.customer.name)}</dd>
            <dt class="text-on-surface-variant">Phone</dt><dd><a class="text-primary" href="tel:${esc(o.customer.phone)}">${esc(o.customer.phone)}</a></dd>
            <dt class="text-on-surface-variant">Email</dt><dd class="break-all"><a class="text-primary" href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a></dd>
            <dt class="text-on-surface-variant">Handover</dt><dd>${o.delivery.method === 'delivery' ? `Delivery: ${esc(o.delivery.address)}, ${esc(o.delivery.pin)}` : 'Pickup at press'}</dd>
            <dt class="text-on-surface-variant">Requested</dt><dd>${o.delivery.date ? fmtDate(o.delivery.date) : '—'}</dd>
            ${o.delivery.notes ? `<dt class="text-on-surface-variant">Notes</dt><dd>${esc(o.delivery.notes)}</dd>` : ''}</dl>`)}
          ${sectionCard('Price & quote', `${breakdownTable(o.estimate, { confirmed: o.confirmedTotal })}${o.quoteNote ? `<p class="text-body-sm text-on-surface-variant mt-2">Quote note: ${esc(o.quoteNote)}</p>` : ''}`, '<button class="btn btn-outline px-3 py-1.5" data-act="quote">Adjust quote</button>')}
          ${sectionCard('Payment', `<dl class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-body-md">
            <dt class="text-on-surface-variant">Method</dt><dd>${esc(PAYMENT_METHODS[o.payment.method])}</dd>
            <dt class="text-on-surface-variant">Status</dt><dd>${statusChip(o.payment.status)}</dd>
            <dt class="text-on-surface-variant">Order value</dt><dd>${inr(orderValue(o))}</dd>
            <dt class="text-on-surface-variant">Paid</dt><dd>${inr(paid)}</dd>
            <dt class="text-on-surface-variant">Outstanding</dt><dd class="font-bold">${inr(Math.max(0, orderValue(o) - paid))}</dd></dl>
            ${o.payment.records.length ? `<ul class="mt-3 space-y-1 text-body-sm text-on-surface-variant">${o.payment.records.map((r) => `<li>${fmtDate(r.at)} · ${inr(r.amount)} · ${esc(r.reference)} · ${esc(r.verification)}</li>`).join('')}</ul>` : ''}`,
            '<button class="btn btn-outline px-3 py-1.5" data-act="pay">Record payment</button>')}
          ${sectionCard('Internal notes', `<p class="text-body-sm text-on-surface-variant mb-3">Never shown to the customer.</p>
            <ul class="space-y-2 mb-3">${o.notes.map((n) => `<li class="text-body-md p-2 rounded bg-surface-container-low"><div>${esc(n.text)}</div><div class="text-body-sm text-on-surface-variant">${fmtDate(n.at, true)} · ${esc(n.by)}</div></li>`).join('') || '<li class="text-body-md text-on-surface-variant">No notes yet.</li>'}</ul>
            <form id="note-form" class="flex gap-2"><input id="note" class="field" placeholder="Add a note" maxlength="300" required /><button class="btn btn-primary px-3">Add</button></form>`)}
        </div>
      </div>

      ${dialog('dlg-modify', 'Request modification', `<div><label class="field-label" for="mod-reason">Reason &amp; instructions for the customer *</label><textarea id="mod-reason" class="field" rows="4" required minlength="10" placeholder="E.g. Please add 3 mm bleed on all sides and re-upload the PDF."></textarea></div>`, 'Send request')}
      ${dialog('dlg-reject', 'Reject order', `<p class="text-body-md text-on-surface-variant">The order stays on record. The customer sees this reason.</p><div><label class="field-label" for="rej-reason">Reason *</label><textarea id="rej-reason" class="field" rows="3" required minlength="5"></textarea></div>`, 'Reject order', true)}
      ${dialog('dlg-cancel', 'Cancel order', `<p class="text-body-md text-on-surface-variant">The order stays on record as Cancelled.</p><div><label class="field-label" for="can-reason">Reason *</label><textarea id="can-reason" class="field" rows="2" required minlength="5"></textarea></div>`, 'Cancel order', true)}
      ${dialog('dlg-quote', 'Adjust quote', `<div><label class="field-label" for="q-amount">Final quote incl. GST (₹) *</label><input id="q-amount" type="number" min="0" step="0.01" class="field" required value="${(orderValue(o) / 100).toFixed(2)}" /></div><div><label class="field-label" for="q-reason">Reason for change *</label><input id="q-reason" class="field" required minlength="5" value="${esc(o.quoteNote)}" /></div><p class="text-body-sm text-on-surface-variant">The revised amount is shown to the customer.</p>`, 'Save quote')}
      ${dialog('dlg-pay', 'Record manual payment', `<div class="grid sm:grid-cols-2 gap-3"><div><label class="field-label" for="p-amount">Amount (₹) *</label><input id="p-amount" type="number" min="1" step="0.01" class="field" required value="${(Math.max(0, orderValue(o) - paid) / 100).toFixed(2)}" /></div><div><label class="field-label" for="p-method">Method</label><select id="p-method" class="field"><option>Cash</option><option>UPI</option><option>Bank transfer</option><option>Card at counter</option></select></div></div><div><label class="field-label" for="p-ref">Reference *</label><input id="p-ref" class="field" required placeholder="UPI ref / receipt no." /></div><p class="text-body-sm text-on-surface-variant">Recorded as manually verified by admin, with an audit entry.</p>`, 'Record payment')}
      <dialog id="dlg-jobcard" class="rounded-lg p-0 w-[min(820px,calc(100%-2rem))] bg-white backdrop:bg-black/50">
        <div class="flex justify-end gap-2 p-3 border-b no-print"><button class="btn btn-primary" id="print-card"><span class="material-symbols-outlined">print</span>Print</button><button class="btn btn-outline text-[#181c1f]" id="close-card">Close</button></div>
        <div id="jobcard-body">${jobCard(o, p)}</div>
      </dialog>`;
  }

  // The dialog's submit handler (below) runs the pending action when the form is submitted with "ok".
  let pending = null;
  const open = (id, onOk) => { pending = onOk; $(`#${id}`).showModal(); };

  $('#app').addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    const o = getOrder(number);
    if (act === 'review') { setStatus(number, 'Under Review', { note: 'Review started' }); toast('Order moved to Under Review'); render(); }
    if (act === 'confirm') {
      if (o.estimate.quoteOnly && o.confirmedTotal == null) { toast('Set a quote before confirming a custom job.', 'error'); return; }
      if (o.confirmedTotal == null) setQuote(number, o.estimate.total, 'Estimate accepted as final quote');
      setStatus(number, 'Confirmed', { note: 'Specifications and artwork approved', message: '' });
      toast('Order confirmed. Job card is ready.', 'success'); render();
    }
    if (act === 'modify') open('dlg-modify', () => { const r = $('#mod-reason').value.trim(); setStatus(number, 'Modification Requested', { note: r, message: r }); toast('Modification request sent to customer'); });
    if (act === 'reject') open('dlg-reject', () => { const r = $('#rej-reason').value.trim(); setStatus(number, 'Rejected', { note: r, message: '' }); toast('Order rejected'); });
    if (act === 'cancel') open('dlg-cancel', () => { setStatus(number, 'Cancelled', { note: $('#can-reason').value.trim() }); toast('Order cancelled'); });
    if (act === 'quote') open('dlg-quote', () => { setQuote(number, Math.round(Number($('#q-amount').value) * 100), $('#q-reason').value.trim()); toast('Quote updated', 'success'); });
    if (act === 'pay') open('dlg-pay', () => { recordPayment(number, { amount: Math.round(Number($('#p-amount').value) * 100), method: $('#p-method').value, reference: $('#p-ref').value.trim() }); toast('Payment recorded', 'success'); });
    if (act === 'jobcard') {
      $('#dlg-jobcard').showModal();
      $('#close-card').onclick = () => $('#dlg-jobcard').close();
      $('#print-card').onclick = () => {
        const w = window.open('', '_blank', 'width=900,height=1000');
        w.document.write(`<!doctype html><title>Job card ${esc(o.number)}</title><script src="https://cdn.tailwindcss.com"><\/script><body>${$('#jobcard-body').innerHTML}<script>setTimeout(()=>print(),600)<\/script></body>`);
        w.document.close();
      };
    }
    if (e.target.closest('[data-save-stage]')) {
      const row = e.target.closest('[data-stage]');
      const status = row.querySelector('select').value;
      const note = row.querySelector('input').value.trim();
      if (['On Hold', 'Issue'].includes(status) && !note) { toast('Add a note for On Hold or Issue.', 'error'); return; }
      try { updateStage(number, row.dataset.stage, status, { note }); toast(`${row.dataset.stage}: ${status}`, 'success'); render(); } catch (err) { toast(err.message, 'error'); }
    }
  });
  $('#app').addEventListener('submit', (e) => {
    if (e.target.id === 'note-form') { e.preventDefault(); addNote(number, $('#note').value.trim()); render(); return; }
    const form = e.target.closest('[data-dialog-form]');
    if (!form) return;
    e.preventDefault();
    const d = form.closest('dialog');
    const ok = e.submitter?.value === 'ok';
    const handler = pending;
    pending = null;
    d.close();
    if (ok && handler) { try { handler(); render(); } catch (err) { toast(err.message, 'error'); } }
  });
  window.addEventListener('storage', (e) => { if (e.key === 'pf-demo-v1' && !document.querySelector('dialog[open]')) render(); });
  render();
}
