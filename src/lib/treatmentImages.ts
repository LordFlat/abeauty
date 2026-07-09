// Server-only: resolves example-photo galleries from public/treatments/<key>/.
// A gallery exists only where a folder of photos was produced by prepare-treatments.mjs.
import fs from 'fs';
import path from 'path';

const BASE = path.join(process.cwd(), 'public', 'treatments');
const RESERVED = new Set(['titles', 'categories']);

export function getGalleryImages(key?: string): string[] {
  if (!key || RESERVED.has(key)) return [];
  const dir = path.join(BASE, key);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((f) => `/treatments/${key}/${f}`);
}
