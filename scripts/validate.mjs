import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Stitch design reference screens (imported as-is, see README "Design reference").
const SCREEN_NAMES = {
  desktop: [
    'admin-dashboard-overview', 'production-workflow-digital-job-cards', 'print-specification-preflight-order-tracking',
    'printflow-os-admin-login', 'printflow-os-order-management', 'printflow-os-payments', 'printflow-os-inventory', 'printflow-os-reports',
  ],
  mobile: [
    'printflow-mobile-home', 'printflow-mobile-product-catalogue', 'printflow-mobile-product-configurator',
    'printflow-mobile-artwork-upload', 'printflow-mobile-checkout', 'printflow-mobile-order-confirmation',
    'printflow-mobile-order-tracking', 'printflow-mobile-account-and-order-history',
  ],
};
const screens = Object.entries(SCREEN_NAMES).flatMap(([dev, names]) => names.map((n) => `public/screens/${dev}/${n}.html`));
const screenshots = Object.values(SCREEN_NAMES).flat().map((n) => `public/screenshots/${n}.png`);

// The responsive website (customer site + admin console).
const sitePages = [
  'index.html', 'products.html', 'configure.html', 'upload.html', 'checkout.html', 'confirmation.html', 'track.html',
  'account.html', 'legal.html', 'design.html',
  'admin/index.html', 'admin/dashboard.html', 'admin/orders.html', 'admin/order.html', 'admin/production.html',
  'admin/payments.html', 'admin/inventory.html', 'admin/reports.html',
];

const requiredRefs = [
  '.stitch/import/design-system.md',
  '.stitch/import/theme.json',
  '.stitch/import/project.json',
  'public/js/tw-config.js',
  'public/css/site.css',
  ...sitePages.filter((p) => p !== 'design.html'),
];

let failed = 0;
const fail = (msg) => { failed++; console.error(`FAIL  ${msg}`); };
const ok = (msg) => console.log(`ok    ${msg}`);

for (const rel of [...screens, ...screenshots, ...requiredRefs]) {
  const abs = join(root, rel);
  if (!existsSync(abs)) { fail(`missing: ${rel}`); continue; }
  const size = statSync(abs).size;
  if (size === 0) { fail(`empty: ${rel}`); continue; }
  ok(`${rel} (${size} bytes)`);
}

for (const rel of screenshots) {
  const abs = join(root, rel);
  if (!existsSync(abs)) continue;
  const buf = readFileSync(abs);
  const isPng = buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (!isPng) fail(`not a valid PNG (corrupt download): ${rel}`);
  else ok(`PNG integrity: ${rel}`);
}

// Auth-gated Stitch asset: only loads in a signed-in Google browser session;
// broken even in Stitch's own screenshots. Kept as the original remote URL.
const ALLOWED_REMOTE = 'lh3.googleusercontent.com/aida/';

for (const rel of screens) {
  const abs = join(root, rel);
  if (!existsSync(abs)) continue;
  const html = readFileSync(abs, 'utf8');
  if (!/<\/html>\s*$/i.test(html.trim())) fail(`unterminated document: ${rel}`);
  if (!html.includes('cdn.tailwindcss.com')) fail(`tailwind config missing: ${rel}`);
  if (!html.includes('Times New Roman')) fail(`design typography missing: ${rel}`);
  if (!html.includes('darkMode')) fail(`theme (dark mode) config missing: ${rel}`);
  const remoteImgs = [...html.matchAll(/<img[^>]+src="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  for (const src of remoteImgs) {
    if (src.includes(ALLOWED_REMOTE)) console.log(`warn  ${rel} auth-gated remote logo (expected): ${src.slice(0, 60)}...`);
    else fail(`${rel} unexpected remote image: ${src}`);
  }
  const localImgs = [...html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const src of localImgs) {
    const target = join(root, 'public', src.replace(/^\//, ''));
    if (!existsSync(target)) fail(`${rel} broken image ref: ${src}`);
    else ok(`${rel} -> ${src}`);
  }
}

for (const rel of sitePages.filter((p) => p !== 'design.html')) {
  const abs = join(root, rel);
  if (!existsSync(abs)) continue;
  const html = readFileSync(abs, 'utf8');
  if (!html.includes('name="viewport"')) fail(`${rel} missing responsive viewport meta`);
  if (!html.includes('/js/tw-config.js') || !html.includes('/css/site.css')) fail(`${rel} missing shared theme (tw-config.js / site.css)`);
  const entry = html.match(/<script type="module" src="([^"]+)"/)?.[1];
  if (entry && !existsSync(join(root, entry))) fail(`${rel} page script not found: ${entry}`);
  else ok(`site page ${rel}`);
}

const cmyk = ['#219bc3', '#d9476b', '#f5d21b', '#1b2427'];
const theme = readFileSync(join(root, '.stitch/import/theme.json'), 'utf8').toLowerCase();
for (const color of cmyk) {
  if (!theme.includes(color)) fail(`CMYK token missing from theme.json: ${color}`);
  else ok(`CMYK token present: ${color}`);
}

const imagesDir = join(root, 'public/images');
const imageFiles = existsSync(imagesDir)
  ? (await import('node:fs')).readdirSync(imagesDir).filter((f) => f !== 'manifest.json' && f !== 'gitkeep' && !f.startsWith('.'))
  : [];
if (imageFiles.length < 8) fail(`expected >= 8 imported images, found ${imageFiles.length}`);
else ok(`${imageFiles.length} imported images in public/images`);

for (const f of imageFiles) {
  const buf = readFileSync(join(imagesDir, f));
  const isJpeg = buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8;
  const isPng = buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50;
  const isWebp = buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF';
  const head = buf.toString('utf8', 0, Math.min(300, buf.length)).trimStart();
  const isSvg = head.startsWith('<svg') || head.startsWith('<?xml');
  if (!isJpeg && !isPng && !isWebp && !isSvg) fail(`not a valid image file: public/images/${f}`);
  else ok(`image integrity: public/images/${f}`);
}

const distScreens = join(root, 'dist/screens');
if (existsSync(distScreens)) {
  const count = screens.filter((rel) => existsSync(join(root, 'dist', rel.replace(/^public\//, '')))).length;
  if (count !== screens.length) fail(`dist build incomplete: ${count}/${screens.length} screens`);
  else ok(`dist build contains all ${screens.length} screens`);
  const pages = sitePages.filter((rel) => existsSync(join(root, 'dist', rel))).length;
  if (pages !== sitePages.length) fail(`dist build incomplete: ${pages}/${sitePages.length} site pages`);
  else ok(`dist build contains all ${sitePages.length} site pages`);
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log('\nAll validation checks passed');
