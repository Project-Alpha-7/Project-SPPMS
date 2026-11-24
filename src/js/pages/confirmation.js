import QRCode from 'qrcode';
import { initLayout, $, esc, param, fmtDate, statusChip, toast } from '../layout.js';
import { getOrderByToken, product, PAYMENT_METHODS } from '../store.js';
import { breakdownTable, steps, specList } from '../components.js';

initLayout();
$('#steps').innerHTML = steps(4);

const o = getOrderByToken(param('t'));
if (!o) {
  $('#content').innerHTML = `<div class="card p-8 text-center"><h1 class="font-headline-lg text-headline-lg">Order not found</h1><p class="text-on-surface-variant mt-2">Use the tracking page to look up your order.</p><a class="btn btn-primary mt-6" href="/track.html">Track an order</a></div>`;
} else {
  const p = product(o.productId);
  const trackUrl = `${location.origin}/track.html?t=${encodeURIComponent(o.token)}`;
  $('#content').innerHTML = `
    <div class="card overflow-hidden">
      <div class="cmyk-strip"><span></span><span></span><span></span><span></span></div>
      <div class="p-6 md:p-10 grid gap-8 md:grid-cols-[minmax(0,1fr),auto] items-start">
        <div>
          <span class="w-14 h-14 rounded-full bg-success-container text-on-success-container inline-flex items-center justify-center"><span class="material-symbols-outlined text-[32px]">check</span></span>
          <h1 class="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl mt-4">Thank you, your order is submitted</h1>
          <p class="text-body-lg text-on-surface-variant mt-2">We've sent it to the press for review. Keep your Order ID to track progress.</p>
          <div class="mt-6 inline-flex flex-wrap items-center gap-3 p-4 rounded-lg border-[1.5px] border-primary bg-primary/5">
            <div><div class="field-label mb-0">Order ID</div><div class="font-headline-lg text-headline-lg tracking-wider" id="oid">${esc(o.number)}</div></div>
            <button class="btn btn-outline" id="copy"><span class="material-symbols-outlined text-[18px]">content_copy</span>Copy</button>
            ${statusChip(o.status)}
          </div>
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <a class="btn btn-primary" href="/track.html?t=${encodeURIComponent(o.token)}"><span class="material-symbols-outlined">local_shipping</span>Track this order</a>
            <button class="btn btn-outline" id="copy-link"><span class="material-symbols-outlined">link</span>Copy tracking link</button>
            <a class="btn btn-ghost" href="/">Back to home</a>
          </div>
        </div>
        <figure class="text-center">
          <canvas id="qr" class="mx-auto border border-outline-variant rounded bg-white p-2"></canvas>
          <figcaption class="text-body-sm text-on-surface-variant mt-2">Scan to track on your phone</figcaption>
        </figure>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-8">
      <section class="card p-6"><h2 class="font-title-md text-title-md mb-4">Specifications</h2>${specList(o, p)}
        <p class="text-body-sm text-on-surface-variant mt-4"><span class="material-symbols-outlined text-[16px]">attach_file</span> ${o.files.map((f) => esc(f.name)).join(', ')}</p></section>
      <section class="card p-6"><div class="flex justify-between items-center mb-4"><h2 class="font-title-md text-title-md">Estimate</h2><span class="chip chip-warn">Not final</span></div>${breakdownTable(o.estimate)}
        <dl class="grid grid-cols-[auto,1fr] gap-x-6 gap-y-1.5 text-body-md mt-5 pt-4 border-t border-outline-variant">
          <dt class="text-on-surface-variant">Payment</dt><dd>${esc(PAYMENT_METHODS[o.payment.method])}</dd>
          <dt class="text-on-surface-variant">${o.delivery.method === 'delivery' ? 'Delivery to' : 'Pickup'}</dt><dd>${o.delivery.method === 'delivery' ? `PIN ${esc(o.delivery.pin)}` : 'At the press'}</dd>
          <dt class="text-on-surface-variant">Submitted</dt><dd>${fmtDate(o.createdAt, true)}</dd>
        </dl></section>
    </div>

    <section class="card p-6 mt-8">
      <h2 class="font-title-md text-title-md mb-4">What happens next</h2>
      <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-body-md">
        <li><span class="font-bold text-primary">1.</span> The press reviews your specifications and artwork.</li>
        <li><span class="font-bold text-primary">2.</span> If anything needs changing, we'll ask on your tracking page.</li>
        <li><span class="font-bold text-primary">3.</span> Production starts once your order and final quote are confirmed.</li>
        <li><span class="font-bold text-primary">4.</span> Follow pre-press, printing, finishing and dispatch live.</li>
      </ol>
    </section>`;

  QRCode.toCanvas($('#qr'), trackUrl, { width: 150, margin: 1 });
  const copy = (text, msg) => navigator.clipboard?.writeText(text).then(() => toast(msg, 'success'), () => toast('Copy failed, please copy manually.'));
  $('#copy').addEventListener('click', () => copy(o.number, 'Order ID copied'));
  $('#copy-link').addEventListener('click', () => copy(trackUrl, 'Tracking link copied'));
}
