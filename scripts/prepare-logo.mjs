import sharp from 'sharp';

// Key the logo by darkness: dark glyphs and the script's shadow become the mark,
// the near-white background becomes fully transparent.
const SRC = 'resourses/Logo-main.png';
const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });

function tinted([r, g, b], T, D) {
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i++) {
    const L = data[i];
    let a = Math.round((255 * (T - L)) / (T - D));
    a = Math.max(0, Math.min(255, a));
    const o = i * 4;
    out[o] = r;
    out[o + 1] = g;
    out[o + 2] = b;
    out[o + 3] = a;
  }
  return out;
}

async function save(rgb, file, T, D) {
  await sharp(tinted(rgb, T, D), { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 10 })
    .resize({ width: 900, withoutEnlargement: true })
    .png()
    .toFile(file);
  console.log('saved', file);
}

await save([0x3b, 0x30, 0x27], 'public/images/logo-dark.png', 235, 70);
await save([0xf6, 0xf1, 0xea], 'public/images/logo-light.png', 205, 80);

// visual check: dark logo on cream, light logo on footer brown
const dark = await sharp('public/images/logo-dark.png').toBuffer();
const light = await sharp('public/images/logo-light.png').toBuffer();
const darkMeta = await sharp(dark).metadata();
await sharp({ create: { width: darkMeta.width + 80, height: darkMeta.height * 2 + 120, channels: 3, background: '#F8F5F0' } })
  .composite([
    { input: dark, top: 40, left: 40 },
    {
      input: await sharp({ create: { width: darkMeta.width + 80, height: darkMeta.height + 40, channels: 3, background: '#2C241E' } }).png().toBuffer(),
      top: darkMeta.height + 80,
      left: 0,
    },
    { input: light, top: darkMeta.height + 100, left: 40 },
  ])
  .jpeg()
  .toFile('scripts/logo-preview.jpg');
console.log('preview written to scripts/logo-preview.jpg');
