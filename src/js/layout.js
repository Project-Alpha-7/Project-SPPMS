// Shared layout: customer header/footer, admin shell, theme toggle, toast and small helpers.
import { resetDemo } from './store.js';

// Press details shown in header/footer. PLACEHOLDERS: replace with the press's real details.
export const SITE = {
  brand: 'PrintFlow',
  tagline: 'Online printing, from order to delivery.',
  phone: '+91 00000 00000',
  email: 'orders@printflow.example',
  address: 'Press address to be confirmed',
  hours: 'Mon–Sat, 9:00 am – 8:00 pm',
};

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmtDate = (iso, withTime = false) => (iso ? new Date(iso).toLocaleString('en-IN', withTime
  ? { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  : { day: '2-digit', month: 'short', year: 'numeric' }) : '—');
export const param = (k) => new URLSearchParams(location.search).get(k);

export function statusChip(status) {
  const map = {
    Submitted: 'chip-info', 'Under Review': 'chip-warn', 'Modification Requested': 'chip-warn', Confirmed: 'chip-info',
    Rejected: 'chip-danger', 'In Production': 'chip-info', 'Ready for Delivery': 'chip-success', Dispatched: 'chip-success',
    Delivered: 'chip-success', Cancelled: 'chip-muted', Pending: 'chip-warn', Successful: 'chip-success', Failed: 'chip-danger',
    Refunded: 'chip-muted', 'Partially paid': 'chip-warn', Completed: 'chip-success', 'In Progress': 'chip-info', 'On Hold': 'chip-warn', Issue: 'chip-danger',
  };
  return `<span class="chip ${map[status] ?? 'chip-muted'}">${esc(status)}</span>`;
}

// ---------- theme ----------
function currentTheme() { return document.documentElement.classList.contains('dark') ? 'dark' : 'light'; }
function setTheme(t) {
  const root = document.documentElement;
  root.classList.toggle('dark', t === 'dark');
  root.classList.toggle('light', t !== 'dark');
  root.style.colorScheme = t;
  try { localStorage.setItem('pf-theme', t); } catch { /* ignore */ }
  $$('[data-theme-toggle]').forEach(syncToggle);
}
function syncToggle(btn) {
  const dark = currentTheme() === 'dark';
  btn.setAttribute('aria-pressed', String(dark));
  btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  btn.title = btn.getAttribute('aria-label');
  const icon = btn.querySelector('.material-symbols-outlined');
  if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
}
const themeButton = (extra = '') => `<button type="button" data-theme-toggle class="w-10 h-10 inline-flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container ${extra}"><span class="material-symbols-outlined">dark_mode</span></button>`;

// ---------- toast ----------
export function toast(msg, kind = 'info') {
  let el = $('#pf-toast');
  if (!el) { el = document.createElement('div'); el.id = 'pf-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  const tone = kind === 'error' ? 'bg-error text-on-error' : kind === 'success' ? 'bg-success text-on-success' : 'bg-inverse-surface text-inverse-on-surface';
  el.className = `${tone} px-4 py-3 rounded-lg shadow-lg text-body-md font-bold`;
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}

const logo = (href) => `
  <a href="${href}" class="flex items-center gap-2.5 shrink-0" aria-label="${SITE.brand} home">
    <span class="relative w-9 h-9 rounded border-[1.5px] border-on-surface inline-flex items-center justify-center text-on-surface"><span class="material-symbols-outlined text-[20px]">print</span><span class="absolute -bottom-[1.5px] left-1 right-1 h-[2px] flex"><span class="flex-1 bg-cmyk-cyan"></span><span class="flex-1 bg-cmyk-magenta"></span><span class="flex-1 bg-cmyk-yellow"></span></span></span>
    <span class="leading-none">
      <span class="block font-headline-sm text-headline-sm text-on-surface tracking-tight">${SITE.brand}</span>
      <span class="flex items-center gap-[3px] mt-1"><span class="w-1.5 h-1.5 bg-cmyk-cyan"></span><span class="w-1.5 h-1.5 bg-cmyk-magenta"></span><span class="w-1.5 h-1.5 bg-cmyk-yellow"></span><span class="w-1.5 h-1.5 bg-cmyk-key"></span><span class="font-label-tech text-label-tech text-outline uppercase ml-1">Print Studio</span></span>
    </span>
  </a>`;

// ---------- customer header & footer ----------
const NAV = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/products.html', label: 'Products', key: 'products' },
  { href: '/#how-it-works', label: 'How it works', key: 'how' },
  { href: '/track.html', label: 'Track order', key: 'track' },
  { href: '/account.html', label: 'My orders', key: 'account' },
];

function customerHeader(active) {
  const link = (n, mobile) => `<a href="${n.href}" class="${mobile ? 'block px-4 py-3 border-b border-outline-variant/60 text-body-lg' : 'px-2.5 xl:px-3 py-2 text-label-lg uppercase tracking-wider whitespace-nowrap'} ${n.key === active ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}" ${n.key === active ? 'aria-current="page"' : ''}>${n.label}</a>`;
  return `
  <div class="bg-inverse-surface text-inverse-on-surface text-body-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
      <span class="hidden sm:inline-flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">schedule</span>${SITE.hours}</span>
      <span class="inline-flex items-center gap-4 ml-auto">
        <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="inline-flex items-center gap-1.5 hover:underline"><span class="material-symbols-outlined text-[16px]">call</span>${SITE.phone}</a>
        <a href="/track.html" class="hidden md:inline-flex items-center gap-1.5 hover:underline"><span class="material-symbols-outlined text-[16px]">local_shipping</span>Track your order</a>
      </span>
    </div>
  </div>
  <div class="cmyk-strip"><span></span><span></span><span></span><span></span></div>
  <div class="bg-surface-container-lowest/95 backdrop-blur border-b border-outline-variant">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      ${logo('/')}
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main">${NAV.map((n) => link(n)).join('')}</nav>
      <div class="flex items-center gap-1 sm:gap-2">
        ${themeButton()}
        <a href="/products.html" class="btn btn-primary hidden sm:inline-flex"><span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>Start an order</a>
        <button type="button" id="nav-toggle" class="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span class="material-symbols-outlined">menu</span></button>
      </div>
    </div>
    <nav id="mobile-nav" class="lg:hidden hidden border-t border-outline-variant bg-surface-container-lowest" aria-label="Mobile">
      ${NAV.map((n) => link(n, true)).join('')}
      <div class="p-4"><a href="/products.html" class="btn btn-primary w-full">Start an order</a></div>
    </nav>
  </div>`;
}

function customerFooter() {
  const col = (title, items) => `<div><h3 class="font-label-md text-label-md uppercase text-on-surface mb-3">${title}</h3><ul class="space-y-2">${items.map(([h, t]) => `<li><a href="${h}" class="text-body-md text-on-surface-variant hover:text-primary">${t}</a></li>`).join('')}</ul></div>`;
  return `
  <div class="cmyk-strip"><span></span><span></span><span></span><span></span></div>
  <div class="bg-surface-container-low border-t border-outline-variant">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-2 space-y-4">
        ${logo('/')}
        <p class="text-body-md text-on-surface-variant max-w-sm">${SITE.tagline} Configure your job, upload artwork, get an instant estimate and follow every production stage online.</p>
        <ul class="space-y-1.5 text-body-md text-on-surface-variant">
          <li class="flex gap-2"><span class="material-symbols-outlined text-[18px] text-primary">call</span>${SITE.phone}</li>
          <li class="flex gap-2"><span class="material-symbols-outlined text-[18px] text-primary">mail</span>${SITE.email}</li>
          <li class="flex gap-2"><span class="material-symbols-outlined text-[18px] text-primary">location_on</span>${SITE.address}</li>
        </ul>
      </div>
      ${col('Products', [['/configure.html?product=visiting-card', 'Visiting cards'], ['/configure.html?product=flyer', 'Flyers'], ['/configure.html?product=brochure', 'Brochures'], ['/configure.html?product=banner', 'Banners'], ['/products.html', 'All products']])}
      ${col('Help', [['/track.html', 'Track an order'], ['/#how-it-works', 'How it works'], ['/#file-guidelines', 'File guidelines'], ['/account.html', 'My orders']])}
      ${col('Company', [['/#contact', 'Contact'], ['/legal.html#privacy', 'Privacy notice'], ['/legal.html#terms', 'Terms of service'], ['/admin/', 'Staff &amp; admin login']])}
    </div>
    <div class="border-t border-outline-variant">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-body-sm text-on-surface-variant">
        <span>© ${new Date().getFullYear()} ${SITE.brand}. All rights reserved.</span>
        <span class="flex items-center gap-3"><span class="demo-flag">Prototype · demo data</span><a href="/admin/" class="inline-flex items-center gap-1 hover:text-primary"><span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>Admin</a></span>
      </div>
    </div>
  </div>`;
}

// ---------- admin shell ----------
const ADMIN_NAV = [
  { href: '/admin/dashboard.html', label: 'Dashboard', icon: 'dashboard', key: 'dashboard' },
  { href: '/admin/orders.html', label: 'Orders', icon: 'receipt_long', key: 'orders' },
  { href: '/admin/production.html', label: 'Production', icon: 'precision_manufacturing', key: 'production' },
  { href: '/admin/payments.html', label: 'Payments', icon: 'payments', key: 'payments' },
  { href: '/admin/inventory.html', label: 'Inventory', icon: 'inventory_2', key: 'inventory' },
  { href: '/admin/reports.html', label: 'Reports', icon: 'monitoring', key: 'reports' },
];
export const ADMIN_SESSION = 'pf-admin-session';

function adminShell(active, title) {
  const user = sessionStorage.getItem(ADMIN_SESSION) || 'admin';
  const side = ADMIN_NAV.map((n) => `<a href="${n.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-md ${n.key === active ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}" ${n.key === active ? 'aria-current="page"' : ''}><span class="material-symbols-outlined text-[20px]">${n.icon}</span>${n.label}</a>`).join('');
  return {
    aside: `
      <div class="h-16 px-5 flex items-center border-b border-outline-variant">${logo('/admin/dashboard.html')}</div>
      <nav class="p-3 space-y-1" aria-label="Admin">${side}</nav>
      <div class="mt-auto p-3 border-t border-outline-variant space-y-1">
        <a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-md text-on-surface-variant hover:bg-surface-container"><span class="material-symbols-outlined text-[20px]">storefront</span>View customer site</a>
        <button type="button" data-reset-demo class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-md text-on-surface-variant hover:bg-surface-container"><span class="material-symbols-outlined text-[20px]">restart_alt</span>Reset demo data</button>
      </div>`,
    top: `
      <div class="h-16 px-4 sm:px-6 flex items-center gap-3">
        <button type="button" id="admin-nav-toggle" class="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg hover:bg-surface-container" aria-label="Open navigation"><span class="material-symbols-outlined">menu</span></button>
        <div class="min-w-0">
          <div class="font-label-tech text-label-tech uppercase text-outline tracking-widest">PrintFlow OS · Admin</div>
          <h1 class="font-headline-sm text-headline-sm text-on-surface truncate">${esc(title)}</h1>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <span class="demo-flag hidden md:inline">Demo data</span>
          ${themeButton()}
          <div class="hidden sm:flex items-center gap-2 pl-2 border-l border-outline-variant">
            <span class="w-8 h-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">person</span></span>
            <span class="text-body-md text-on-surface">${esc(user)}</span>
          </div>
          <button type="button" data-logout class="btn btn-ghost px-2" title="Sign out" aria-label="Sign out"><span class="material-symbols-outlined">logout</span></button>
        </div>
      </div>
      <div class="cmyk-strip"><span></span><span></span><span></span><span></span></div>`,
  };
}

// ---------- boot ----------
export function initLayout() {
  const body = document.body;
  const shell = body.dataset.shell;
  const page = body.dataset.page;

  if (shell === 'customer') {
    const h = document.createElement('header'); h.className = 'sticky top-0 z-40'; h.innerHTML = customerHeader(page);
    const f = document.createElement('footer'); f.innerHTML = customerFooter();
    body.prepend(h); body.append(f);
    const btn = $('#nav-toggle'), menu = $('#mobile-nav');
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.material-symbols-outlined').textContent = open ? 'close' : 'menu';
    });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); btn.querySelector('.material-symbols-outlined').textContent = 'menu'; } });
  }

  if (shell === 'admin') {
    if (!sessionStorage.getItem(ADMIN_SESSION)) { location.replace(`/admin/?next=${encodeURIComponent(location.pathname + location.search)}`); return false; }
    const { aside, top } = adminShell(page, body.dataset.title || document.title);
    const main = $('main');
    const wrap = document.createElement('div');
    wrap.className = 'min-h-screen lg:pl-64';
    const sidebar = document.createElement('aside');
    sidebar.id = 'admin-sidebar';
    sidebar.className = 'fixed inset-y-0 left-0 z-50 w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col -translate-x-full lg:translate-x-0 transition-transform';
    sidebar.innerHTML = aside;
    const scrim = document.createElement('div');
    scrim.className = 'fixed inset-0 z-40 bg-black/40 hidden lg:hidden';
    const header = document.createElement('header');
    header.className = 'sticky top-0 z-30 bg-surface-container-lowest/95 backdrop-blur border-b border-outline-variant';
    header.innerHTML = top;
    main.replaceWith(wrap);
    wrap.append(header, main);
    body.prepend(sidebar, scrim);
    const toggle = (open) => { sidebar.classList.toggle('-translate-x-full', !open); scrim.classList.toggle('hidden', !open); };
    $('#admin-nav-toggle').addEventListener('click', () => toggle(true));
    scrim.addEventListener('click', () => toggle(false));
    $('[data-logout]').addEventListener('click', () => { sessionStorage.removeItem(ADMIN_SESSION); location.href = '/admin/'; });
    $('[data-reset-demo]').addEventListener('click', () => {
      if (confirm('Reset all demo orders and inventory in this browser?')) { resetDemo(); location.reload(); }
    });
  }

  $$('[data-theme-toggle]').forEach((btn) => {
    syncToggle(btn);
    btn.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  });
  // Keep tabs in sync
  window.addEventListener('storage', (e) => { if (e.key === 'pf-theme' && e.newValue) setTheme(e.newValue); });
  return true;
}
