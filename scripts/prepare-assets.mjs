import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC = 'resourses/anastasia_sorted_photos';
const RES = 'resourses';

function rm(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}
function mkdir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function isImg(f) {
  return /\.(jpe?g|png|webp|avif)$/i.test(f);
}

// --- 1. Gallery: repopulate category folders from the sorted archive ---
const galleryMap = {
  lips: '01_Lip_Blush',
  brows: '02_Brows_SPMU_Powder_Combo_Stroke',
  lashes: '03_Eyeliner_Lash_Enhancement_Eyes',
  facials: '04_Facials_Carbon_Bubble',
  nails: '05_Nails_ARCHIVE_Not_Current_Treatments',
  aesthetic: '06_aesthetic',
};

for (const [cat, folder] of Object.entries(galleryMap)) {
  const from = path.join(SRC, folder);
  const to = path.join('public/gallery', cat);
  rm(to);
  mkdir(to);
  const files = fs
    .readdirSync(from)
    .filter(isImg)
    .sort((a, b) => {
      const na = parseInt(a, 10) || 0;
      const nb = parseInt(b, 10) || 0;
      return na - nb;
    });
  files.forEach((f, i) => {
    const ext = path.extname(f).toLowerCase();
    fs.copyFileSync(path.join(from, f), path.join(to, `${cat}-${String(i + 1).padStart(2, '0')}${ext}`));
  });
  console.log(`gallery/${cat}: ${files.length} photos`);
}

// --- 2. Treatment covers ---
mkdir('public/images/treatments');
const covers = {
  'lip-blush': 'category_covers/Lip_Blush.jpg',
  makeup: 'category_covers/Makeup__Semi_Permanent_Makeup.jpg',
  eyeliner: 'category_covers/Eyeliner__Lash_Enhancement.jpg',
  facial: 'category_covers/Facial__Carbon_Bubble.jpg',
  'brows-waxing': 'category_covers/Brows_and_Waxing.jpg',
};
for (const [name, rel] of Object.entries(covers)) {
  fs.copyFileSync(path.join(SRC, rel), `public/images/treatments/${name}.jpg`);
  console.log(`cover ${name}.jpg`);
}

// HIFU: real photo provided (webp) → normalise to jpg cover
await sharp(path.join(SRC, 'category_covers/HIFU-Facelift-image.webp'))
  .jpeg({ quality: 88 })
  .toFile('public/images/treatments/hifu.jpg');
console.log('cover hifu.jpg (from HIFU-Facelift-image.webp)');

// --- 3. Branded placeholder for IPL (no real photo yet) ---
async function placeholder(label, file) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
    <rect width="1200" height="900" fill="#EFE4D3"/>
    <rect x="40" y="40" width="1120" height="820" fill="none" stroke="#A88A63" stroke-width="1.5"/>
    <text x="600" y="420" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#3B3027" text-anchor="middle" letter-spacing="4">${label}</text>
    <text x="600" y="500" font-family="Georgia, serif" font-size="26" fill="#A88A63" text-anchor="middle" letter-spacing="6" style="text-transform:uppercase">photo coming soon</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(file);
  console.log(`placeholder ${file}`);
}
await placeholder('IPL', 'public/images/treatments/ipl.jpg');

// --- 4. Main homepage section photos ---
fs.copyFileSync(path.join(RES, 'main-first.jpg'), 'public/images/main-first.jpg');
fs.copyFileSync(path.join(RES, 'main-second.jpg'), 'public/images/main-second.jpg');
console.log('main-first.jpg, main-second.jpg');

// --- 5. Follow Us strip (6 square photos) ---
const followFrom = path.join(SRC, 'best6_follow_us_square_ready');
rm('public/images/follow');
mkdir('public/images/follow');
const followFiles = fs.readdirSync(followFrom).filter(isImg).sort();
followFiles.forEach((f, i) => {
  fs.copyFileSync(path.join(followFrom, f), `public/images/follow/${String(i + 1).padStart(2, '0')}.jpg`);
});
console.log(`follow: ${followFiles.length} photos`);

console.log('\nDone.');
