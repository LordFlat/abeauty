// Prepares imagery for the /treatments section ONLY.
// - Title images (name baked into the artwork) → public/treatments/titles/<slug>.jpg
// - Example photo folders                      → public/treatments/<key>/NN.jpg
// Writes exclusively under public/treatments/ — touches nothing else.
// Source filenames are matched case-insensitively (the archive uses Title Case).
// Run: node scripts/prepare-treatments.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'resourses/Category');
const OUT = path.join(ROOT, 'public/treatments');

function rm(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}
function mkdir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function isImg(f) {
  return /\.(jpe?g|png|webp|avif)$/i.test(f);
}

// Case-insensitive lookup of a file/dir inside resourses/Category.
const entries = fs.readdirSync(SRC);
function find(name) {
  const hit = entries.find((e) => e.toLowerCase() === name.toLowerCase());
  return hit ? path.join(SRC, hit) : null;
}

// Fresh rebuild of the whole output tree.
rm(OUT);
mkdir(OUT);

// --- 1. Title images (one per page: 6 categories + all sub-treatments) ---
const titleImages = {
  'semi-permanent-makeup': 'Semi-Permanent Makeup.png',
  'lip-blush': 'Lip Blush.png',
  'semi-permanent-brows': 'Semi-Permanent Brows.png',
  'semi-permanent-eyeliner': 'Semi-Permanent Eyeliner.png',
  'facial-treatments': 'Facial Treatments.png',
  'bubble-facial': 'Bubble Facial.png',
  'carbon-facial': 'Carbon Facial.png',
  hifu: 'HIFU.png',
  'hifu-face-lift': 'HIFU Face Lift.png',
  'hifu-body-lift': 'HIFU Body Lift.png',
  'intimate-hifu-tightening': 'Intimate HIFU Treatment.png',
  'brows-waxing': 'Brows & Waxing.png',
  'brow-wax-shape': 'Brow Wax & Shape.png',
  'brow-wax-shape-tint': 'Brow Wax, Shape & Tint.png',
  'hd-brows': 'Brows HD.png',
  'brow-lamination': 'Brow Lamination.png',
  'lash-lift': 'Lash-Lift.png',
  'lash-tint': 'Lash Tint.png',
  ipl: 'IPL  Laser Hair Removal.png',
  'laser-tattoo-removal': 'Laser Tattoo Removal.png',
};

const titleDir = path.join(OUT, 'titles');
mkdir(titleDir);
for (const [slug, file] of Object.entries(titleImages)) {
  const from = find(file);
  if (!from) {
    console.warn(`! missing title image: ${file}`);
    continue;
  }
  await sharp(from)
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(titleDir, `${slug}.jpg`));
  console.log(`titles/${slug}.jpg`);
}

// --- 2. Example photo galleries ------------------------------------------
// source folder (in resourses/Category) → gallery key used on the page
const galleryFolders = {
  'Lip Blush': 'lip-blush',
  'Semi Permanent Brows': 'semi-permanent-brows',
  Eyeliner: 'eyeliner',
  'Carbon facial': 'carbon-facial',
  'HIFU Face Lift': 'hifu-face-lift',
  'HIFU Body Lift': 'hifu-body-lift',
  'HD Brows': 'hd-brows',
  'Lash lift': 'lash-lift',
  'Laser Tattoo Removal': 'laser-tattoo-removal',
};

for (const [folder, key] of Object.entries(galleryFolders)) {
  const from = find(folder);
  if (!from || !fs.statSync(from).isDirectory()) {
    console.warn(`! missing gallery folder: ${folder}`);
    continue;
  }
  const to = path.join(OUT, key);
  mkdir(to);
  const files = fs.readdirSync(from).filter(isImg).sort();
  let i = 0;
  for (const f of files) {
    i += 1;
    await sharp(path.join(from, f))
      .resize({ width: 1100, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(to, `${String(i).padStart(2, '0')}.jpg`));
  }
  console.log(`${key}: ${files.length} photos`);
}

console.log('\nDone.');
