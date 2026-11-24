// Imports Stitch screens (HTML + screenshot + metadata) into public/ and localizes their images.
//
// Usage: node scripts/import-stitch-screens.mjs <screens.json>
//   screens.json: [{ "id": "<screenId>", "title": "...", "device": "MOBILE|DESKTOP", "slug": "file-name" }]
//
// - HTML      -> public/screens/<desktop|mobile>/<slug>.html
// - Screenshot -> public/screenshots/<slug>.png
// - Metadata  -> .stitch/import/screens/<id>.json
// - Public Stitch images (lh3.googleusercontent.com/aida-public/...) are downloaded to
//   public/images/stitch-asset-NN.<ext>, recorded in public/images/manifest.json and rewritten in the HTML.
// - The auth-gated logo URL (lh3.googleusercontent.com/aida/...) is mapped to /images/printflow-logo.svg,
//   matching the existing screens.
// Existing files are never overwritten unless --force is passed.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT = JSON.parse(readFileSync(join(root, '.stitch.json'), 'utf8')).project;
const STITCH = join(process.env.APPDATA ?? '', 'npm', 'node_modules', '@google', 'stitch', 'dist', 'stitch.js');
const force = process.argv.includes('--force');
const list = JSON.parse(readFileSync(process.argv[2], 'utf8'));

function stitch(args) {
  const r = spawnSync(process.execPath, [STITCH, ...args], { encoding: 'buffer', maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`stitch ${args.slice(0, 3).join(' ')} failed: ${r.stderr.toString().slice(0, 500)}`);
  return r.stdout;
}

const manifestPath = join(root, 'public/images/manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
const nextAssetIndex = () => {
  const nums = readdirSync(join(root, 'public/images'))
    .map((f) => /^stitch-asset-(\d+)\./.exec(f)?.[1]).filter(Boolean).map(Number);
  return (nums.length ? Math.max(...nums) : 0) + 1;
};
const sniffExt = (buf, ctype = '') => {
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  if (buf.toString('ascii', 0, 4) === 'RIFF') return 'webp';
  if (ctype.includes('svg')) return 'svg';
  return null;
};

let failures = 0;
for (const s of list) {
  const dev = s.device.toLowerCase();
  const htmlRel = `public/screens/${dev}/${s.slug}.html`;
  const pngRel = `public/screenshots/${s.slug}.png`;
  const metaRel = `.stitch/import/screens/${s.id}.json`;
  for (const rel of [htmlRel, pngRel]) {
    if (existsSync(join(root, rel)) && !force) throw new Error(`refusing to overwrite ${rel} (use --force)`);
  }
  mkdirSync(join(root, `public/screens/${dev}`), { recursive: true });

  writeFileSync(join(root, metaRel), stitch(['get', 'screen', s.id, '--project', PROJECT, '--json', '--no-cache']));
  stitch(['download', 'screen', s.id, '--project', PROJECT, '--html', '--no-cache', '-q', '-o', join(root, htmlRel)]);
  stitch(['download', 'screen', s.id, '--project', PROJECT, '--image', '--no-cache', '-q', '-o', join(root, pngRel)]);

  let html = readFileSync(join(root, htmlRel), 'utf8');
  const urls = new Set([...html.matchAll(/https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^"')\s]+/g)].map((m) => m[0]));
  for (const url of urls) {
    if (!manifest[url]) {
      const res = await fetch(url);
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = res.ok ? sniffExt(buf, res.headers.get('content-type') ?? '') : null;
      if (!ext) { console.warn(`WARN image not downloaded (${res.status}) in ${s.slug}: ${url.slice(0, 80)}...`); failures++; continue; }
      const name = `stitch-asset-${String(nextAssetIndex()).padStart(2, '0')}.${ext}`;
      writeFileSync(join(root, 'public/images', name), buf);
      manifest[url] = `/images/${name}`;
      console.log(`  image ${name} (${buf.length} B)`);
    }
    html = html.split(url).join(manifest[url]);
  }
  html = html.replace(/https:\/\/lh3\.googleusercontent\.com\/aida\/[^"')\s]+/g, '/images/printflow-logo.svg');
  writeFileSync(join(root, htmlRel), html);
  console.log(`imported ${s.title} -> ${htmlRel}`);
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
if (failures) { console.error(`${failures} image(s) failed`); process.exit(1); }
