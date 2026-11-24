import { initLayout, $, esc } from '../layout.js';
import { product, estimate, createOrder } from '../store.js';
import { breakdownTable, steps, specList } from '../components.js';
import { getDraft, saveDraft, clearDraft, rememberOrder } from '../draft.js';

initLayout();
$('#steps').innerHTML = steps(3);

const draft = getDraft();
if (!draft?.config) location.replace('/products.html');
else if (!draft.files?.length) location.replace('/upload.html');

const p = product(draft?.config?.productId);
const form = $('#checkout');

// Restore previously typed details
const c = draft?.customer ?? {};
const d = draft?.delivery ?? {};
Object.entries({ name: c.name, phone: c.phone, email: c.email, address: d.address, pin: d.pin, date: d.date, dnotes: d.notes }).forEach(([k, v]) => { if (v) form.elements[k].value = v; });
if (d.method) form.querySelector(`[name="method"][value="${d.method}"]`).checked = true;
if (draft?.paymentMethod) form.querySelector(`[name="payment"][value="${draft.paymentMethod}"]`).checked = true;
const today = new Date(); today.setDate(today.getDate() + 1);
form.elements.date.min = today.toISOString().slice(0, 10);

function current() {
  const f = form.elements;
  const method = form.querySelector('[name="method"]:checked').value;
  return {
    customer: { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim() },
    delivery: { method, address: f.address.value.trim(), pin: f.pin.value.trim(), date: f.date.value, notes: f.dnotes.value.trim() },
    paymentMethod: form.querySelector('[name="payment"]:checked').value,
  };
}
function render() {
  const cur = current();
  $('#address-fields').classList.toggle('hidden', cur.delivery.method !== 'delivery');
  const o = { config: draft.config };
  $('#spec').innerHTML = specList(o, p);
  $('#files').innerHTML = `<span class="material-symbols-outlined text-[16px]">attach_file</span> ${draft.files.map((x) => esc(x.name)).join(', ')}`;
  $('#breakdown').innerHTML = breakdownTable(estimate({ ...draft.config, deliveryMethod: cur.delivery.method }));
  saveDraft({ ...draft, ...cur });
}

const rules = {
  name: (v) => (v.length >= 2 ? '' : 'Enter your full name.'),
  phone: (v) => (/^\+?[0-9\s-]{10,15}$/.test(v) ? '' : 'Enter a valid phone number.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'),
  address: (v, cur) => (cur.delivery.method !== 'delivery' || v.length >= 5 ? '' : 'Enter the delivery address.'),
  pin: (v, cur) => (cur.delivery.method !== 'delivery' || /^[1-9][0-9]{5}$/.test(v) ? '' : 'Enter a 6-digit PIN code.'),
};
function validate() {
  const cur = current();
  let first = null;
  for (const [k, fn] of Object.entries(rules)) {
    const el = form.elements[k];
    const msg = fn(el.value.trim(), cur);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    let err = el.parentElement.querySelector('.field-error');
    if (!err) { err = document.createElement('p'); err.className = 'field-error'; el.parentElement.append(err); }
    err.textContent = msg;
    if (msg && !first) first = el;
  }
  const agree = $('#agree');
  if (!first && !agree.checked) { $('#form-error').textContent = 'Please accept the terms to submit your order.'; $('#form-error').classList.remove('hidden'); return agree; }
  $('#form-error').classList.add('hidden');
  return first;
}

form.addEventListener('input', render);
form.addEventListener('change', render);
let submitting = false;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (submitting) return; // one click = one order
  const bad = validate();
  if (bad) { bad.focus(); return; }
  submitting = true;
  $('#submit').disabled = true;
  $('#submit').innerHTML = 'Submitting…';
  const cur = current();
  const order = createOrder({ config: { ...draft.config, deliveryMethod: cur.delivery.method }, files: draft.files, ...cur });
  rememberOrder(order.number);
  clearDraft();
  location.replace(`/confirmation.html?t=${encodeURIComponent(order.token)}`);
});
if (draft?.config) render();
