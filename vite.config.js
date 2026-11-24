import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Multi-page site: every .html file in the project root and in /admin is a page.
const root = import.meta.dirname;
const pages = {};
for (const dir of ['', 'admin']) {
  const abs = resolve(root, dir);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs)) {
    if (f.endsWith('.html')) pages[`${dir ? `${dir}/` : ''}${f.replace(/\.html$/, '')}`] = resolve(abs, f);
  }
}

export default defineConfig({
  build: { rollupOptions: { input: pages } },
  server: { port: 5173 },
});
