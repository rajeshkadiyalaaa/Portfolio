/**
 * Regenerate optimized WebP assets from assets/source/
 * Run: npm run optimize:assets
 */
import sharp from 'sharp';
import { statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets/source');

const jobs = [
  {
    in: 'about-footer.png',
    outs: [
      { file: 'public/about-footer.webp', width: 1920 },
      { file: 'public/about-footer-1280.webp', width: 1280 },
    ],
  },
  {
    in: 'projects-footer.png',
    outs: [
      { file: 'public/projects-footer.webp', width: 1920 },
      { file: 'public/projects-footer-1280.webp', width: 1280 },
    ],
  },
  {
    in: 'mountain-art.svg',
    outs: [{ file: 'public/mountain-art.webp', width: 480 }],
  },
  {
    in: 'mountain-right.png',
    outs: [{ file: 'public/mountain-right.webp', width: 480 }],
  },
];

for (const { in: input, outs } of jobs) {
  const inputPath = path.join(source, input);
  for (const { file, width } of outs) {
    const outPath = path.join(root, file);
    await sharp(inputPath, { density: 200 })
      .resize(width, null, { fit: 'inside', withoutEnlargement: false })
      .webp({ quality: 88, effort: 6 })
      .toFile(outPath);
    const kb = (statSync(outPath).size / 1024).toFixed(1);
    console.log(`${file} — ${kb} KB`);
  }
}

console.log('Done.');
