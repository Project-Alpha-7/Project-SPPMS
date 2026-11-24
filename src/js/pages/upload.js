import { initLayout, $, esc, param, toast } from '../layout.js';
import { product, estimate, inr, getOrderByToken, replaceFiles } from '../store.js';
import { steps } from '../components.js';
import { getDraft, saveDraft } from '../draft.js';

initLayout();

const MAX = 25 * 1024 * 1024;
const OK_TYPES = { pdf: ['application/pdf'], jpg: ['image/jpeg'], jpeg: ['image/jpeg'], png: ['image/png'] };
const fmtSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

// Two modes: new order (draft) or corrected upload for an existing order (?order=<token>).
const fixToken = param('order');
const fixOrder = fixToken ? getOrderByToken(fixToken) : null;
const draft = getDraft();

if (!fixOrder && !draft?.config) { location.replace('/products.html'); }

let files = fixOrder ? [] : [...(draft?.files ?? [])];
let rejected = [];
const cfg = fixOrder ? fixOrder.config : draft?.config;
const p = cfg ? product(cfg.productId) : null;

if (fixOrder) {
  $('#steps').parentElement.remove();
  $('#page-title').textContent = 'Upload corrected artwork';
  $('#page-sub').textContent = `For order ${fixOrder.number}. Your previous files will be replaced and the press will review again.`;
  if (fixOrder.message) {
    const b = $('#mod-banner'); b.classList.remove('hidden');
    b.className = 'card p-4 border-tertiary bg-tertiary-container/30 flex gap-3';
    b.innerHTML = `<span class="material-symbols-outlined text-tertiary">edit_note</span><div><div class="font-bold">Requested by the press</div><p class="text-body-md">${esc(fixOrder.message)}</p></div>`;
  }
  $('#next').innerHTML = 'Submit corrected files<span class="material-symbols-outlined">send</span>';
  $('#back').href = `/track.html?t=${encodeURIComponent(fixToken)}`; $('#back').innerHTML = '<span class="material-symbols-outlined">arrow_back</span>Back to tracking';
} else if (p) {
  $('#steps').innerHTML = steps(2);
  $('#back').href = `/configure.html?product=${p.id}`;
}
if (p) $('#for-product').textContent = `${p.name} · ${Number(cfg.quantity).toLocaleString('en-IN')} pcs`;

function renderSummary() {
  if (!p) return;
  const est = fixOrder ? fixOrder.estimate : estimate(cfg);
  $('#summary').innerHTML = `<dl class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5">
    <dt class="text-on-surface-variant">Product</dt><dd>${esc(p.name)}</dd>
    <dt class="text-on-surface-variant">Quantity</dt><dd>${Number(cfg.quantity).toLocaleString('en-IN')} pcs</dd>
    <dt class="text-on-surface-variant">Size</dt><dd>${esc(cfg.size)}</dd>
    <dt class="text-on-surface-variant">Files</dt><dd>${files.length || 'None yet'}</dd></dl>`;
  $('#total').textContent = est.quoteOnly ? 'On request' : inr(est.total);
}

function render() {
  $('#files').innerHTML = [
    ...files.map((f, i) => `
      <li class="card p-4 flex items-center gap-4">
        <span class="material-symbols-outlined text-[32px] ${f.type === 'application/pdf' ? 'text-secondary' : 'text-primary'}">${f.type === 'application/pdf' ? 'picture_as_pdf' : 'image'}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2"><span class="font-bold truncate">${esc(f.name)}</span><span class="text-body-sm text-on-surface-variant shrink-0">${fmtSize(f.size)}</span></div>
          <div class="mt-2 h-1.5 bg-surface-container rounded overflow-hidden"><div class="h-full bg-success transition-all duration-500" style="width:${f.progress ?? 100}%"></div></div>
          <div class="text-body-sm mt-1 ${f.progress < 100 ? 'text-on-surface-variant' : 'text-success'}">${f.progress < 100 ? `Uploading… ${f.progress}%` : 'Uploaded · awaiting pre-press review'}</div>
        </div>
        <button type="button" data-remove="${i}" class="btn btn-ghost px-2" aria-label="Remove ${esc(f.name)}"><span class="material-symbols-outlined">delete</span></button>
      </li>`),
    ...rejected.map((r) => `
      <li class="card p-4 flex items-center gap-4 border-error">
        <span class="material-symbols-outlined text-[32px] text-error">error</span>
        <div class="flex-1 min-w-0"><div class="font-bold truncate">${esc(r.name)}</div><div class="text-body-sm text-error mt-1">${esc(r.reason)}</div></div>
      </li>`),
  ].join('');
  renderSummary();
}

function addFiles(list) {
  rejected = [];
  for (const file of list) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!OK_TYPES[ext]) { rejected.push({ name: file.name, reason: `Unsupported file type (.${ext}). Upload a PDF, JPG or PNG.` }); continue; }
    if (file.type && !OK_TYPES[ext].includes(file.type)) { rejected.push({ name: file.name, reason: 'The file contents do not match its extension.' }); continue; }
    if (file.size > MAX) { rejected.push({ name: file.name, reason: `File is ${fmtSize(file.size)}. The limit is 25 MB.` }); continue; }
    if (file.size === 0) { rejected.push({ name: file.name, reason: 'The file is empty.' }); continue; }
    const entry = { name: file.name, size: file.size, type: file.type || OK_TYPES[ext][0], progress: 0, uploadedAt: new Date().toISOString() };
    files.push(entry);
    // Simulated upload progress (there is no server yet).
    const tick = setInterval(() => { entry.progress = Math.min(100, entry.progress + 25); render(); if (entry.progress >= 100) { clearInterval(tick); persist(); } }, 180);
  }
  render();
}
function persist() {
  if (!fixOrder) saveDraft({ ...getDraft(), files: files.filter((f) => f.progress >= 100).map(({ progress, ...f }) => f) });
}

$('#file').addEventListener('change', (e) => { addFiles([...e.target.files]); e.target.value = ''; });
const drop = $('#drop');
['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('border-primary', 'bg-primary/5'); }));
['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove('border-primary', 'bg-primary/5'); }));
drop.addEventListener('drop', (e) => addFiles([...e.dataTransfer.files]));
$('#files').addEventListener('click', (e) => {
  const b = e.target.closest('[data-remove]');
  if (b) { files.splice(Number(b.dataset.remove), 1); persist(); render(); }
});

$('#next').addEventListener('click', () => {
  if (files.some((f) => f.progress < 100)) { toast('Please wait for uploads to finish.'); return; }
  if (!files.length) { toast('Upload at least one artwork file to continue.', 'error'); return; }
  if (fixOrder) {
    replaceFiles(fixOrder.number, files.map(({ progress, ...f }) => f));
    toast('Corrected files sent to the press.', 'success');
    setTimeout(() => { location.href = `/track.html?t=${encodeURIComponent(fixToken)}`; }, 700);
    return;
  }
  persist();
  location.href = '/checkout.html';
});

render();
