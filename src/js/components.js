// Reusable rendering helpers for customer and admin pages.
import { esc, fmtDate, statusChip } from './layout.js';
import { inr, estimate } from './store.js';

export function productCard(p) {
  const est = p.quoteOnly ? null : estimate({ productId: p.id, quantity: p.quantities[0], material: p.materials[0].id, colour: p.colours[0], sides: 'Single', finishes: [] });
  const media = p.image
    ? `<img src="${p.image}" alt="${esc(p.name)} sample" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" loading="lazy" />`
    : `<div class="w-full h-full flex items-center justify-center bg-surface-container"><span class="material-symbols-outlined text-[56px] text-primary/60">${p.icon}</span></div>`;
  return `
  <a href="/configure.html?product=${p.id}" class="card group overflow-hidden flex flex-col hover:border-primary transition-colors">
    <div class="relative aspect-[4/3] overflow-hidden">${media}
      <span class="absolute top-3 left-3 bg-surface-container-lowest/95 font-label-md text-label-md uppercase px-2 py-1 border border-outline-variant">${esc(p.category)}</span>
    </div>
    <div class="cmyk-strip opacity-70"><span></span><span></span><span></span><span></span></div>
    <div class="p-5 flex flex-col flex-1">
      <h3 class="font-title-md text-title-md text-on-surface">${esc(p.name)}</h3>
      <p class="text-body-md text-on-surface-variant mt-1.5 flex-1">${esc(p.description)}</p>
      <div class="mt-4 flex items-end justify-between gap-2">
        <div>
          <div class="font-label-tech text-label-tech uppercase text-outline">${est ? `From · ${p.quantities[0]} pcs` : 'Pricing'}</div>
          <div class="font-headline-sm text-headline-sm text-primary">${est ? inr(est.total) : 'Quote on request'}</div>
        </div>
        <span class="btn btn-outline px-3 py-2 group-hover:border-primary group-hover:text-primary">Configure<span class="material-symbols-outlined text-[18px]">tune</span></span>
      </div>
    </div>
  </a>`;
}

export function breakdownTable(est, { label = 'Estimate', confirmed = null } = {}) {
  if (est.quoteOnly) {
    return `<p class="text-body-md text-on-surface-variant">Custom jobs are priced by the press after review. You'll see the quote on your tracking page.</p>`;
  }
  return `
    <table class="w-full text-body-md">
      <tbody>
        ${est.lines.map((l) => `<tr class="border-b border-outline-variant/60"><td class="py-2 pr-3 text-on-surface-variant">${esc(l.label)}</td><td class="py-2 text-right tabular-nums">${inr(l.amount)}</td></tr>`).join('')}
        <tr><td class="pt-3 pr-3 text-on-surface-variant">Subtotal</td><td class="pt-3 text-right tabular-nums">${inr(est.subtotal)}</td></tr>
        <tr><td class="py-1 pr-3 text-on-surface-variant">GST (18%)</td><td class="py-1 text-right tabular-nums">${inr(est.tax)}</td></tr>
        <tr class="border-t border-on-surface"><td class="pt-3 font-bold">${label} total</td><td class="pt-3 text-right font-headline-sm text-headline-sm tabular-nums">${inr(est.total)}</td></tr>
        ${confirmed != null ? `<tr><td class="pt-2 font-bold text-success">Confirmed quote</td><td class="pt-2 text-right font-headline-sm text-headline-sm text-success tabular-nums">${inr(confirmed)}</td></tr>` : ''}
      </tbody>
    </table>`;
}

const stageIcon = { Completed: 'check', 'In Progress': 'autorenew', 'On Hold': 'pause', Issue: 'priority_high', Pending: '' };
const stageTone = {
  Completed: 'bg-success text-on-success border-success',
  'In Progress': 'bg-primary text-on-primary border-primary',
  'On Hold': 'bg-tertiary-container text-on-tertiary-container border-tertiary',
  Issue: 'bg-error text-on-error border-error',
  Pending: 'bg-surface-container-lowest text-outline border-outline-variant',
};

export function timeline(stages, { showNotes = false } = {}) {
  return `<ol class="relative">${stages.map((s, i) => `
    <li class="relative pl-12 pb-6 last:pb-0">
      ${i < stages.length - 1 ? `<span class="absolute left-[15px] top-8 bottom-0 w-px ${s.status === 'Completed' ? 'bg-success' : 'bg-outline-variant'}"></span>` : ''}
      <span class="absolute left-0 top-0 w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center font-label-md text-label-md ${stageTone[s.status]}">${stageIcon[s.status] ? `<span class="material-symbols-outlined text-[18px]">${stageIcon[s.status]}</span>` : s.seq}</span>
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <span class="font-title-md text-title-md ${s.status === 'Pending' ? 'text-on-surface-variant' : 'text-on-surface'}">${esc(s.name)}</span>
        ${s.status !== 'Pending' ? statusChip(s.status) : ''}
      </div>
      <div class="text-body-sm text-on-surface-variant mt-0.5">${s.updatedAt ? fmtDate(s.updatedAt, true) : 'Pending'}</div>
      ${showNotes && s.note ? `<div class="text-body-sm mt-1 text-on-surface-variant italic">${esc(s.note)}</div>` : ''}
    </li>`).join('')}</ol>`;
}

export function specList(o, p) {
  const c = o.config;
  const mat = p.materials.find((m) => m.id === c.material);
  const fin = (c.finishes ?? []).map((id) => p.finishes.find((f) => f.id === id)?.label).filter(Boolean);
  const rows = [
    ['Product', p.name], ['Quantity', `${c.quantity} pcs`], ['Size', c.size], ['Material', mat?.label],
    ['Colour', c.colour], ...(p.sides ? [['Sides', c.sides]] : []), ['Printing method', c.method],
    ['Finishing', fin.length ? fin.join(', ') : 'None'], ...(c.notes ? [['Instructions', c.notes]] : []),
  ];
  return `<dl class="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2 text-body-md">${rows.map(([k, v]) => `<dt class="text-on-surface-variant">${k}</dt><dd class="text-on-surface">${esc(v ?? '—')}</dd>`).join('')}</dl>`;
}

export function steps(active) {
  const names = ['Product', 'Specifications', 'Artwork', 'Delivery & payment', 'Done'];
  return `<ol class="flex items-center gap-2 sm:gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Order steps">${names.map((n, i) => {
    const state = i < active ? 'done' : i === active ? 'current' : 'todo';
    const dot = state === 'done' ? 'bg-primary text-on-primary border-primary' : state === 'current' ? 'border-primary text-primary' : 'border-outline-variant text-outline';
    return `<li class="flex items-center gap-2 shrink-0" ${state === 'current' ? 'aria-current="step"' : ''}>
      <span class="w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center font-label-md text-label-md ${dot}">${state === 'done' ? '<span class="material-symbols-outlined text-[16px]">check</span>' : i + 1}</span>
      <span class="font-label-md text-label-md uppercase ${state === 'todo' ? 'text-outline' : 'text-on-surface'} ${state === 'current' ? '' : 'hidden md:inline'}">${n}</span>
      ${i < names.length - 1 ? '<span class="w-6 sm:w-10 h-px bg-outline-variant"></span>' : ''}
    </li>`;
  }).join('')}</ol>`;
}

export const pageHeader = (eyebrow, title, sub = '') => `
  <div class="border-b border-outline-variant bg-surface-container-lowest">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <p class="font-label-md text-label-md uppercase tracking-widest text-primary">${eyebrow}</p>
      <h1 class="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl mt-1">${title}</h1>
      ${sub ? `<p class="text-body-lg text-on-surface-variant mt-2 max-w-3xl">${sub}</p>` : ''}
    </div>
  </div>`;
