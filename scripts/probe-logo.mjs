import sharp from 'sharp';

const src = 'resourses/Logo-main.png';
const img = sharp(src);
const meta = await img.metadata();
console.log('meta:', { width: meta.width, height: meta.height, channels: meta.channels, hasAlpha: meta.hasAlpha, format: meta.format });

const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => {
  const i = (y * info.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};
console.log('corner TL:', px(2, 2));
console.log('corner TR:', px(info.width - 3, 2));
console.log('corner BR:', px(info.width - 3, info.height - 3));
console.log('center:', px(Math.floor(info.width / 2), Math.floor(info.height / 2)));

// alpha histogram
const hist = new Map();
for (let i = 3; i < data.length; i += 4) {
  const a = data[i];
  hist.set(a, (hist.get(a) || 0) + 1);
}
const top = [...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log('top alpha values [alpha, count]:', top);

// color histogram of fully opaque pixels (quantized)
const chist = new Map();
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] > 200) {
    const key = `${data[i] >> 4},${data[i + 1] >> 4},${data[i + 2] >> 4}`;
    chist.set(key, (chist.get(key) || 0) + 1);
  }
}
const ctop = [...chist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
console.log('top opaque colors (r,g,b >>4):', ctop);
