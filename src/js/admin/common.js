// Shared admin building blocks.
import { esc, fmtDate, statusChip } from '../layout.js';
import { inr, orderValue } from '../store.js';

const TONES = { cyan: 'border-t-cmyk-cyan', magenta: 'border-t-cmyk-magenta', yellow: 'border-t-cmyk-yellow', key: 'border-t-cmyk-key' };

export const kpi = ({ label, value, note = '', tone = 'cyan', href = '' }) => `
  <${href ? `a href="${href}"` : 'div'} class="card border-t-[3px] ${TONES[tone]} p-4 block ${href ? 'hover:border-primary transition-colors' : ''}">
    <div class="font-label-md text-label-md uppercase text-on-surface-variant">${label}</div>
    <div class="font-headline-xl text-headline-xl mt-2 tabular-nums">${value}</div>
    ${note ? `<div class="text-body-sm text-on-surface-variant mt-1">${note}</div>` : ''}
  </${href ? 'a' : 'div'}>`;

export const sectionCard = (title, body, actions = '') => `
  <section class="card">
    <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-outline-variant">
      <h2 class="font-title-md text-title-md">${title}</h2>${actions}
    </div>
    <div class="p-5">${body}</div>
  </section>`;

export function ordersTable(orders, { selectable = false, compact = false } = {}) {
  if (!orders.length) return '<p class="text-body-md text-on-surface-variant py-8 text-center">No orders match.</p>';
  const rows = orders.map((o) => `
    <tr class="border-b border-outline-variant/70 hover:bg-surface-container-low">
      ${selectable ? `<td class="py-3 pl-3"><input type="checkbox" data-select="${esc(o.number)}" aria-label="Select ${esc(o.number)}" /></td>` : ''}
      <td class="py-3 px-3"><a href="/admin/order.html?id=${encodeURIComponent(o.number)}" class="font-bold text-primary hover:underline whitespace-nowrap">${esc(o.number)}</a>
        <div class="text-body-sm text-on-surface-variant whitespace-nowrap">${fmtDate(o.createdAt, true)}</div>${o.demo ? '<span class="demo-flag">demo</span>' : ''}</td>
      <td class="py-3 px-3"><div class="font-bold">${esc(o.customer.name)}</div>${compact ? '' : `<div class="text-body-sm text-on-surface-variant">${esc(o.customer.phone)}</div>`}</td>
      <td class="py-3 px-3"><div>${esc(o.productName)}</div><div class="text-body-sm text-on-surface-variant">${Number(o.config.quantity).toLocaleString('en-IN')} pcs · ${esc(o.config.size)}</div></td>
      <td class="py-3 px-3">${statusChip(o.status)}</td>
      ${compact ? '' : `<td class="py-3 px-3">${statusChip(o.payment.status)}</td>`}
      <td class="py-3 px-3 text-right tabular-nums whitespace-nowrap">${inr(orderValue(o))}<div class="text-body-sm text-on-surface-variant">${o.confirmedTotal != null ? 'confirmed' : 'estimate'}</div></td>
      <td class="py-3 px-3 text-right"><a href="/admin/order.html?id=${encodeURIComponent(o.number)}" class="btn btn-outline px-3 py-1.5">Open</a></td>
    </tr>`).join('');
  return `
    <div class="overflow-x-auto -mx-5">
      <table class="w-full text-body-md min-w-[760px]">
        <thead><tr class="text-left font-label-md text-label-md uppercase text-on-surface-variant border-b border-outline-variant">
          ${selectable ? '<th class="py-2 pl-3 w-8"></th>' : ''}<th class="py-2 px-3">Order</th><th class="py-2 px-3">Customer</th><th class="py-2 px-3">Product</th><th class="py-2 px-3">Status</th>${compact ? '' : '<th class="py-2 px-3">Payment</th>'}<th class="py-2 px-3 text-right">Value</th><th class="py-2 px-3"></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// Simple bar chart in SVG (no dependency). data: [{label, value}]
export function barChart(data, { height = 180, color = 'rgb(var(--c-primary))', format = (v) => v } = {}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100 / data.length;
  return `<svg viewBox="0 0 100 ${height / 2}" preserveAspectRatio="none" class="w-full" style="height:${height}px" role="img" aria-label="Bar chart">
    ${data.map((d, i) => { const h = (d.value / max) * (height / 2 - 4); return `<rect x="${i * w + w * 0.18}" y="${height / 2 - h}" width="${w * 0.64}" height="${h}" fill="${color}"><title>${esc(d.label)}: ${format(d.value)}</title></rect>`; }).join('')}
  </svg>
  <div class="grid text-center font-label-tech text-label-tech text-on-surface-variant mt-1" style="grid-template-columns:repeat(${data.length},1fr)">${data.map((d) => `<span class="truncate">${esc(d.label)}</span>`).join('')}</div>`;
}

export function hbars(data, { format = (v) => v } = {}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const palette = ['bg-cmyk-cyan', 'bg-cmyk-magenta', 'bg-cmyk-yellow', 'bg-cmyk-key'];
  return `<ul class="space-y-3">${data.map((d, i) => `
    <li><div class="flex justify-between text-body-md"><span>${esc(d.label)}</span><span class="tabular-nums">${format(d.value)}</span></div>
    <div class="h-2 bg-surface-container rounded mt-1 overflow-hidden"><div class="h-full ${palette[i % 4]}" style="width:${(d.value / max) * 100}%"></div></div></li>`).join('')}</ul>`;
}
