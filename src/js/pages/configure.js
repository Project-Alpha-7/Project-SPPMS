import { initLayout, $, $$, esc, param } from '../layout.js';
import { product, estimate, PRODUCTS } from '../store.js';
import { breakdownTable, steps } from '../components.js';
import { getDraft, saveDraft } from '../draft.js';

initLayout();
$('#steps').innerHTML = steps(1);

const p = product(param('product')) ?? PRODUCTS[0];
document.title = `Configure ${p.name} — PrintFlow`;
const prev = getDraft();
const saved = prev?.config?.productId === p.id ? prev.config : null;
const cfg = saved ?? {
  productId: p.id, size: p.sizes[0], quantity: p.quantities[Math.min(2, p.quantities.length - 1)], material: p.materials[0].id,
  colour: p.colours[0], sides: p.sides ? 'Single' : undefined, method: p.methods[0], finishes: [], notes: '',
};

$('#product-head').innerHTML = `
  <div class="sm:w-44 shrink-0 aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant">
    ${p.image ? `<img src="${p.image}" alt="" class="w-full h-full object-cover" />` : `<div class="w-full h-full flex items-center justify-center bg-surface-container"><span class="material-symbols-outlined text-[48px] text-primary/60">${p.icon}</span></div>`}
  </div>
  <div class="flex-1">
    <p class="font-label-md text-label-md uppercase text-primary">${esc(p.category)}</p>
    <h1 class="font-headline-lg text-headline-lg mt-1">${esc(p.name)}</h1>
    <p class="text-body-md text-on-surface-variant mt-2">${esc(p.description)}</p>
    <a href="/products.html" class="inline-flex items-center gap-1 text-body-md text-primary mt-3 hover:underline"><span class="material-symbols-outlined text-[18px]">swap_horiz</span>Change product</a>
  </div>`;

const choice = (name, value, label, sub, checked, type = 'radio') => `
  <label class="relative flex flex-col gap-0.5 p-3 rounded-lg border-[1.5px] cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 border-outline-variant hover:border-outline">
    <input type="${type}" name="${name}" value="${esc(value)}" class="sr-only peer" ${checked ? 'checked' : ''} />
    <span class="font-bold text-body-md text-on-surface">${esc(label)}</span>
    ${sub ? `<span class="text-body-sm text-on-surface-variant">${esc(sub)}</span>` : ''}
    <span class="material-symbols-outlined absolute top-2 right-2 text-[18px] text-primary hidden peer-checked:block">check_circle</span>
  </label>`;
const group = (title, inner, cols = 'grid-cols-2 sm:grid-cols-3') => `<fieldset><legend class="field-label">${title}</legend><div class="grid ${cols} gap-3">${inner}</div></fieldset>`;

$('#options').innerHTML = [
  group('Size', p.sizes.map((s) => choice('size', s, s, '', s === cfg.size)).join('')),
  group('Quantity', p.quantities.map((q) => choice('quantity', q, `${q.toLocaleString('en-IN')} pcs`, '', q === Number(cfg.quantity))).join(''), 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'),
  group('Paper / material', p.materials.map((m) => choice('material', m.id, m.label, '', m.id === cfg.material)).join(''), 'grid-cols-1 sm:grid-cols-3'),
  group('Colour', p.colours.map((c) => choice('colour', c, c, '', c === cfg.colour)).join('')),
  p.sides ? group('Sides', ['Single', 'Double'].map((s) => choice('sides', s, `${s} sided`, '', s === cfg.sides)).join(''), 'grid-cols-2') : '',
  group('Printing method', p.methods.map((m) => choice('method', m, m, '', m === cfg.method)).join('')),
  p.finishes.length ? group('Finishing (optional)', p.finishes.map((f) => choice('finishes', f.id, f.label, '', cfg.finishes.includes(f.id), 'checkbox')).join(''), 'grid-cols-1 sm:grid-cols-2') : '',
].join('');
$('#notes').value = cfg.notes ?? '';

function read() {
  const f = $('#cfg');
  const v = (n) => f.querySelector(`[name="${n}"]:checked`)?.value;
  Object.assign(cfg, {
    size: v('size'), quantity: Number(v('quantity')), material: v('material'), colour: v('colour'),
    sides: p.sides ? v('sides') : undefined, method: v('method'),
    finishes: $$('[name="finishes"]:checked', f).map((x) => x.value), notes: $('#notes').value.trim(),
  });
}
function update() {
  read();
  $('#breakdown').innerHTML = breakdownTable(estimate(cfg));
}
$('#cfg').addEventListener('change', update);
$('#cfg').addEventListener('submit', (e) => {
  e.preventDefault();
  read();
  const d = getDraft() ?? {};
  saveDraft({ ...d, config: { ...cfg }, files: d.config?.productId === p.id ? d.files ?? [] : [] });
  location.href = '/upload.html';
});
update();
