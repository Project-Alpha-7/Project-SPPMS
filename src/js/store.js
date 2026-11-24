// Demo data layer for the frontend prototype.
// Everything lives in this browser's localStorage. It stands in for the real backend
// (Supabase per brain/04-architecture) until development Stage 3 is built.
// Money is integer paise. Prices are DEMO RATES, not the press's real rates.

const KEY = 'pf-demo-v1';

export const ORDER_STATUSES = [
  'Submitted', 'Under Review', 'Modification Requested', 'Confirmed', 'Rejected',
  'In Production', 'Ready for Delivery', 'Dispatched', 'Delivered', 'Cancelled',
];
export const STAGES = ['Pre-Press', 'Printing', 'Quality Check', 'Finishing', 'Packing', 'Ready for Delivery', 'Dispatch', 'Delivered'];
export const STAGE_STATUSES = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Issue'];
export const PAYMENT_STATUSES = ['Pending', 'Successful', 'Failed', 'Refunded'];
export const PAYMENT_METHODS = {
  pickup: 'Pay at pickup',
  advance: 'Advance payment (manual)',
  online: 'Online payment (demo mode)',
};

const finish = (id, label, perUnit, flat = 0) => ({ id, label, perUnit, flat });

// perUnit values are paise per piece. setup is a flat paise charge per order.
export const PRODUCTS = [
  {
    id: 'visiting-card', name: 'Visiting Card', category: 'Stationery', image: '/images/stitch-asset-04.jpg', icon: 'badge',
    description: 'Business cards on premium board, single or double sided, with lamination and corner options.',
    sizes: ['90 × 54 mm', '85 × 55 mm', '90 × 50 mm'], quantities: [100, 250, 500, 1000, 2000],
    materials: [{ id: 'art-card-300', label: 'Art Card 300 GSM', perUnit: 120 }, { id: 'art-card-350', label: 'Art Card 350 GSM', perUnit: 150 }, { id: 'textured-350', label: 'Textured 350 GSM', perUnit: 220 }],
    colours: ['Full Colour', 'Black only'], sides: true, methods: ['Digital', 'Offset'],
    finishes: [finish('matte', 'Matte lamination', 60), finish('gloss', 'Gloss lamination', 60), finish('rounded', 'Rounded corners', 40), finish('spot-uv', 'Spot UV', 90, 30000)],
    setup: 25000, printPerUnit: 80,
  },
  {
    id: 'flyer', name: 'Flyer', category: 'Marketing', image: '/images/stitch-asset-06.jpg', icon: 'description',
    description: 'A4, A5 and DL flyers for promotions and events.',
    sizes: ['A4 (210 × 297 mm)', 'A5 (148 × 210 mm)', 'DL (99 × 210 mm)'], quantities: [250, 500, 1000, 2500, 5000],
    materials: [{ id: 'gloss-130', label: 'Gloss Art 130 GSM', perUnit: 90 }, { id: 'matte-170', label: 'Matte Art 170 GSM', perUnit: 130 }],
    colours: ['Full Colour'], sides: true, methods: ['Digital', 'Offset'],
    finishes: [finish('none', 'No finishing', 0)], setup: 30000, printPerUnit: 110,
  },
  {
    id: 'brochure', name: 'Brochure', category: 'Marketing', image: '/images/stitch-asset-05.jpg', icon: 'menu_book',
    description: 'Folded brochures (bi-fold, tri-fold) and multi-page booklets.',
    sizes: ['A4 tri-fold', 'A4 bi-fold', 'A5 booklet (8 pp)'], quantities: [100, 250, 500, 1000],
    materials: [{ id: 'art-150', label: 'Art Paper 150 GSM', perUnit: 400 }, { id: 'art-170', label: 'Art Paper 170 GSM', perUnit: 480 }],
    colours: ['Full Colour'], sides: true, methods: ['Digital', 'Offset'],
    finishes: [finish('folding', 'Folding / creasing', 150), finish('binding', 'Saddle-stitch binding', 600)], setup: 50000, printPerUnit: 600,
  },
  {
    id: 'poster', name: 'Poster', category: 'Large Format', image: null, icon: 'image',
    description: 'A3 to A1 posters for retail, events and display.',
    sizes: ['A3', 'A2', 'A1'], quantities: [10, 25, 50, 100, 250],
    materials: [{ id: 'gloss-170', label: 'Gloss Art 170 GSM', perUnit: 1200 }, { id: 'satin-200', label: 'Satin 200 GSM', perUnit: 1600 }],
    colours: ['Full Colour'], sides: false, methods: ['Digital'],
    finishes: [finish('none', 'No finishing', 0), finish('lamination', 'Matte lamination', 900)], setup: 20000, printPerUnit: 2500,
  },
  {
    id: 'invitation', name: 'Invitation', category: 'Stationery', image: null, icon: 'mail',
    description: 'Wedding, event and corporate invitation cards with envelopes.',
    sizes: ['5 × 7 in', 'A5', 'Square 6 × 6 in'], quantities: [50, 100, 250, 500],
    materials: [{ id: 'pearl-300', label: 'Pearl Board 300 GSM', perUnit: 1400 }, { id: 'textured-300', label: 'Textured 300 GSM', perUnit: 1200 }],
    colours: ['Full Colour'], sides: true, methods: ['Digital'],
    finishes: [finish('foil', 'Gold foil stamping', 1800, 50000), finish('envelope', 'Matching envelope', 900)], setup: 40000, printPerUnit: 1500,
  },
  {
    id: 'sticker', name: 'Sticker', category: 'Labels', image: '/images/stitch-asset-08.jpg', icon: 'label',
    description: 'Paper and vinyl stickers, kiss-cut or die-cut to shape.',
    sizes: ['50 × 50 mm', '75 × 75 mm', '100 × 50 mm'], quantities: [100, 250, 500, 1000],
    materials: [{ id: 'paper', label: 'Paper sticker', perUnit: 150 }, { id: 'vinyl', label: 'Waterproof vinyl', perUnit: 400 }],
    colours: ['Full Colour'], sides: false, methods: ['Digital'],
    finishes: [finish('kiss-cut', 'Kiss-cut', 100), finish('die-cut', 'Die-cut to shape', 200, 30000)], setup: 20000, printPerUnit: 200,
  },
  {
    id: 'banner', name: 'Banner', category: 'Large Format', image: '/images/stitch-asset-09.jpg', icon: 'flag',
    description: 'Flex banners and roll-up standees for shops and exhibitions.',
    sizes: ['2 × 3 ft', '3 × 6 ft', 'Roll-up 2.75 × 6.5 ft'], quantities: [1, 2, 5, 10],
    materials: [{ id: 'flex', label: 'Flex 340 GSM', perUnit: 40000 }, { id: 'star-flex', label: 'Star Flex 440 GSM', perUnit: 60000 }],
    colours: ['Full Colour'], sides: false, methods: ['Digital (large format)'],
    finishes: [finish('eyelets', 'Eyelets', 5000), finish('standee', 'Roll-up stand', 120000)], setup: 0, printPerUnit: 30000,
  },
  {
    id: 'custom', name: 'Custom Printing', category: 'Custom', image: '/images/stitch-asset-07.jpg', icon: 'design_services',
    description: 'Packaging, boxes or anything else. Tell us what you need and the press will quote.',
    sizes: ['Custom size'], quantities: [50, 100, 250, 500, 1000],
    materials: [{ id: 'to-confirm', label: 'To be confirmed with press', perUnit: 0 }],
    colours: ['Full Colour', 'Pantone / spot'], sides: false, methods: ['To be confirmed'],
    finishes: [], setup: 0, printPerUnit: 0, quoteOnly: true,
  },
];
export const product = (id) => PRODUCTS.find((p) => p.id === id);

export const DELIVERY_CHARGE = 8000; // ₹80 flat demo delivery charge
export const GST_RATE = 0.18;

export function estimate(cfg) {
  const p = product(cfg.productId);
  if (!p) return null;
  const q = Number(cfg.quantity) || 0;
  const mat = p.materials.find((m) => m.id === cfg.material) ?? p.materials[0];
  const sidesFactor = p.sides && cfg.sides === 'Double' ? 1.6 : 1;
  const colourFactor = cfg.colour === 'Black only' ? 0.6 : 1;
  const tier = q >= 1000 ? 0.8 : q >= 500 ? 0.9 : 1; // volume discount
  const lines = [];
  const add = (label, amount) => { if (amount) lines.push({ label, amount: Math.round(amount) }); };
  add('Base / setup charge', p.setup);
  add(`Material: ${mat.label}`, mat.perUnit * q * tier);
  add(`Printing (${cfg.colour ?? p.colours[0]}${p.sides ? `, ${cfg.sides ?? 'Single'} sided` : ''})`, p.printPerUnit * q * sidesFactor * colourFactor * tier);
  for (const fid of cfg.finishes ?? []) {
    const f = p.finishes.find((x) => x.id === fid);
    if (f) add(`Finishing: ${f.label}`, f.perUnit * q + f.flat);
  }
  if (cfg.deliveryMethod === 'delivery') add('Delivery', DELIVERY_CHARGE);
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * GST_RATE);
  return { lines, subtotal, tax, total: subtotal + tax, quoteOnly: !!p.quoteOnly };
}

export const inr = (paise) => {
  const p = Math.round(paise);
  const d = p % 100 === 0 ? 0 : 2;
  return '₹' + (p / 100).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
};

// ---------- persistence ----------
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.orders) return s; } catch { /* ignore */ }
  const s = seed();
  save(s);
  return s;
}
function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage full or blocked */ } }
export function resetDemo() { localStorage.removeItem(KEY); return load(); }

const rand = (n, alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789') => {
  const a = new Uint32Array(n); crypto.getRandomValues(a);
  return [...a].map((x) => alphabet[x % alphabet.length]).join('');
};
const newOrderNumber = () => `SP-${new Date().getFullYear()}-${rand(5)}`;
const newToken = () => rand(24, 'abcdefghijkmnpqrstuvwxyz23456789');

function freshStages() {
  return STAGES.map((name, i) => ({ name, seq: i + 1, status: 'Pending', updatedAt: null, by: null, note: '' }));
}

export function getState() { return load(); }
export function listOrders() { return load().orders.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)); }
export function getOrder(number) { return load().orders.find((o) => o.number.toUpperCase() === String(number).trim().toUpperCase()); }
export function getOrderByToken(token) { return load().orders.find((o) => o.token === token); }

export function createOrder(draft) {
  const s = load();
  const est = estimate(draft.config);
  const now = new Date().toISOString();
  const order = {
    number: newOrderNumber(), token: newToken(), createdAt: now, updatedAt: now, demo: false,
    productId: draft.config.productId, productName: product(draft.config.productId).name,
    config: draft.config, files: draft.files ?? [], customer: draft.customer, delivery: draft.delivery,
    estimate: est, confirmedTotal: null, quoteNote: '',
    status: 'Submitted', payment: { method: draft.paymentMethod, status: 'Pending', records: [] },
    stages: freshStages(), message: '', notes: [],
    history: [{ at: now, from: null, to: 'Submitted', by: 'Customer', note: 'Order submitted online' }],
  };
  s.orders.push(order);
  save(s);
  return order;
}

function mutate(number, fn) {
  const s = load();
  const o = s.orders.find((x) => x.number === number);
  if (!o) throw new Error('Order not found');
  fn(o);
  o.updatedAt = new Date().toISOString();
  save(s);
  return o;
}

export function setStatus(number, to, { by = 'Admin', note = '', message } = {}) {
  return mutate(number, (o) => {
    o.history.push({ at: new Date().toISOString(), from: o.status, to, by, note });
    o.status = to;
    if (message !== undefined) o.message = message;
  });
}

export function updateStage(number, stageName, status, { by = 'Admin', note = '' } = {}) {
  return mutate(number, (o) => {
    const idx = o.stages.findIndex((st) => st.name === stageName);
    const st = o.stages[idx];
    if (status === 'Completed' && o.stages.slice(0, idx).some((p) => p.status !== 'Completed')) {
      throw new Error(`Complete the earlier stages before ${stageName}.`);
    }
    if (['In Production', 'Ready for Delivery', 'Dispatched', 'Delivered'].includes(o.status) === false && o.status !== 'Confirmed') {
      throw new Error('Production can only start after the order is confirmed.');
    }
    st.status = status; st.updatedAt = new Date().toISOString(); st.by = by; st.note = note;
    // Derive order status from stages
    const done = (n) => o.stages.find((x) => x.name === n).status === 'Completed';
    let next = o.status;
    if (done('Delivered')) next = 'Delivered';
    else if (done('Dispatch')) next = 'Dispatched';
    else if (done('Ready for Delivery')) next = 'Ready for Delivery';
    else if (o.stages.some((x) => x.status !== 'Pending')) next = 'In Production';
    if (next !== o.status) o.history.push({ at: st.updatedAt, from: o.status, to: next, by, note: `${stageName}: ${status}` });
    o.status = next;
  });
}

export function setQuote(number, totalPaise, note) {
  return mutate(number, (o) => { o.confirmedTotal = totalPaise; o.quoteNote = note; });
}
export function addNote(number, text, by = 'Admin') {
  return mutate(number, (o) => { o.notes.push({ at: new Date().toISOString(), by, text }); });
}
export function recordPayment(number, { amount, method, reference, status = 'Successful', by = 'Admin' }) {
  return mutate(number, (o) => {
    o.payment.records.push({ at: new Date().toISOString(), amount, method, reference, status, by, verification: 'Manual (admin)' });
    const paid = o.payment.records.filter((r) => r.status === 'Successful').reduce((s, r) => s + r.amount, 0);
    const due = o.confirmedTotal ?? o.estimate.total;
    o.payment.status = paid >= due ? 'Successful' : paid > 0 ? 'Partially paid' : 'Pending';
  });
}
export function replaceFiles(number, files) {
  return mutate(number, (o) => {
    o.files = files;
    o.history.push({ at: new Date().toISOString(), from: o.status, to: 'Under Review', by: 'Customer', note: 'Corrected artwork uploaded' });
    o.status = 'Under Review';
    o.message = '';
  });
}
export const paidAmount = (o) => o.payment.records.filter((r) => r.status === 'Successful').reduce((s, r) => s + r.amount, 0);
export const orderValue = (o) => o.confirmedTotal ?? o.estimate.total;

// ---------- inventory (optional module, manual updates) ----------
export function listInventory() { return load().inventory; }
export function adjustInventory(id, delta, reason) {
  const s = load();
  const it = s.inventory.find((x) => x.id === id);
  it.quantity = Math.max(0, +(it.quantity + delta).toFixed(2));
  it.updatedAt = new Date().toISOString();
  s.inventoryLog.unshift({ at: it.updatedAt, item: it.name, delta, reason });
  save(s);
  return it;
}
export function inventoryLog() { return load().inventoryLog; }

// ---------- seed data (clearly labelled demo) ----------
function seed() {
  const day = (d, h = 10) => { const t = new Date(); t.setDate(t.getDate() - d); t.setHours(h, 15, 0, 0); return t.toISOString(); };
  const mk = (n, productId, quantity, cfg, customer, status, completedStages, d, payment = 'pickup', paid = false) => {
    const config = { productId, quantity, ...cfg };
    const est = estimate({ ...config, deliveryMethod: customer.delivery });
    const stages = freshStages().map((st, i) => (i < completedStages
      ? { ...st, status: 'Completed', updatedAt: day(d - 1 - i * 0.2), by: 'Admin' }
      : i === completedStages && status === 'In Production' ? { ...st, status: 'In Progress', updatedAt: day(0), by: 'Admin' } : st));
    const o = {
      number: `SP-2026-${n}`, token: `demo${n.toLowerCase()}tok${n.toLowerCase()}`, createdAt: day(d), updatedAt: day(Math.max(0, d - 1)), demo: true,
      productId, productName: product(productId).name, config, files: [{ name: `${productId}-artwork.pdf`, size: 2400000, type: 'application/pdf' }],
      customer: { name: customer.name, phone: customer.phone, email: customer.email },
      delivery: { method: customer.delivery, address: customer.address ?? '', pin: customer.pin ?? '', date: '', notes: '' },
      estimate: est, confirmedTotal: ['Submitted', 'Under Review', 'Modification Requested', 'Rejected'].includes(status) ? null : est.total, quoteNote: '',
      status, payment: { method: payment, status: paid ? 'Successful' : 'Pending', records: paid ? [{ at: day(d - 1), amount: est.total, method: PAYMENT_METHODS[payment], reference: `UPI-DEMO-${n}`, status: 'Successful', by: 'Admin', verification: 'Manual (admin)' }] : [] },
      stages, message: status === 'Modification Requested' ? 'Please add 3 mm bleed on all sides and re-upload the PDF.' : '',
      notes: [], history: [{ at: day(d), from: null, to: 'Submitted', by: 'Customer', note: 'Order submitted online' }],
    };
    if (status === 'Rejected') o.history.push({ at: day(d - 1), from: 'Submitted', to: 'Rejected', by: 'Admin', note: 'Artwork contains copyrighted logos without authorisation.' });
    else if (status !== 'Submitted') o.history.push({ at: day(d - 1), from: 'Submitted', to: status === 'Under Review' || status === 'Modification Requested' ? status : 'Confirmed', by: 'Admin', note: '' });
    return o;
  };
  const vc = { size: '90 × 54 mm', material: 'art-card-300', colour: 'Full Colour', sides: 'Double', method: 'Digital', finishes: ['matte'] };
  return {
    version: 1,
    orders: [
      mk('7QK2M', 'visiting-card', 500, vc, { name: 'Ananya Rao', phone: '+91 98450 11223', email: 'ananya@example.com', delivery: 'pickup' }, 'In Production', 2, 3, 'pickup'),
      mk('3HF9T', 'flyer', 1000, { size: 'A5 (148 × 210 mm)', material: 'gloss-130', colour: 'Full Colour', sides: 'Single', method: 'Offset', finishes: [] }, { name: 'Brew Bros Café', phone: '+91 99000 44556', email: 'hello@brewbros.example', delivery: 'delivery', address: '12 MG Road, Bengaluru', pin: '560001' }, 'Submitted', 0, 0, 'advance'),
      mk('9PL4X', 'banner', 2, { size: '3 × 6 ft', material: 'flex', colour: 'Full Colour', method: 'Digital (large format)', finishes: ['eyelets'] }, { name: 'Sri Lakshmi Textiles', phone: '+91 97411 22334', email: 'sales@slt.example', delivery: 'pickup' }, 'Under Review', 0, 1, 'pickup'),
      mk('5TR8C', 'sticker', 500, { size: '50 × 50 mm', material: 'vinyl', colour: 'Full Colour', method: 'Digital', finishes: ['die-cut'] }, { name: 'Kavya Menon', phone: '+91 90080 77889', email: 'kavya@example.com', delivery: 'delivery', address: '44 Indiranagar 2nd Stage, Bengaluru', pin: '560038' }, 'Modification Requested', 0, 2, 'online'),
      mk('2WD6V', 'brochure', 250, { size: 'A4 tri-fold', material: 'art-150', colour: 'Full Colour', sides: 'Double', method: 'Offset', finishes: ['folding'] }, { name: 'GreenLeaf Realty', phone: '+91 98860 55667', email: 'ops@greenleaf.example', delivery: 'delivery', address: '7 Whitefield Main Rd, Bengaluru', pin: '560066' }, 'Ready for Delivery', 6, 6, 'advance', true),
      mk('8MN3B', 'invitation', 100, { size: '5 × 7 in', material: 'pearl-300', colour: 'Full Colour', sides: 'Single', method: 'Digital', finishes: ['envelope'] }, { name: 'Rahul & Priya', phone: '+91 99860 33445', email: 'rp.wedding@example.com', delivery: 'pickup' }, 'Delivered', 8, 12, 'pickup', true),
      mk('4ZX7R', 'poster', 25, { size: 'A2', material: 'gloss-170', colour: 'Full Colour', method: 'Digital', finishes: ['none'] }, { name: 'City Arts Club', phone: '+91 91080 99001', email: 'events@cityarts.example', delivery: 'pickup' }, 'Rejected', 0, 5, 'pickup'),
    ],
    inventory: [
      { id: 'a4', name: 'A4 Paper 80 GSM', category: 'Paper', unit: 'reams', quantity: 120, min: 40, updatedAt: day(1) },
      { id: '13x19', name: '13×19 Art Paper 300 GSM', category: 'Paper', unit: 'reams', quantity: 25, min: 30, updatedAt: day(2) },
      { id: 'art-card', name: 'Art Card 350 GSM', category: 'Board', unit: 'packs', quantity: 18, min: 10, updatedAt: day(1) },
      { id: 'vinyl', name: 'Vinyl Sticker Roll', category: 'Media', unit: 'rolls', quantity: 4, min: 3, updatedAt: day(4) },
      { id: 'flex', name: 'Flex 340 GSM', category: 'Media', unit: 'rolls', quantity: 2, min: 3, updatedAt: day(3) },
      { id: 'ink-c', name: 'Cyan Ink', category: 'Ink', unit: '%', quantity: 18, min: 25, updatedAt: day(0) },
      { id: 'ink-m', name: 'Magenta Ink', category: 'Ink', unit: '%', quantity: 52, min: 25, updatedAt: day(0) },
      { id: 'ink-y', name: 'Yellow Ink', category: 'Ink', unit: '%', quantity: 60, min: 25, updatedAt: day(0) },
      { id: 'ink-k', name: 'Black Ink', category: 'Ink', unit: '%', quantity: 70, min: 25, updatedAt: day(0) },
    ],
    inventoryLog: [],
  };
}
