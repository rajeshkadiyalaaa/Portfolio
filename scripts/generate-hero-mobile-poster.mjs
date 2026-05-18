/**
 * Extract first frame from mobile hero video → public/hero-mobile-poster.webp
 * Run: node scripts/generate-hero-mobile-poster.mjs
 */
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const videoIn = path.join(root, 'public/mobile-video-layout.mp4');
const pngOut = path.join(root, 'public/hero-mobile-poster.png');
const webpOut = path.join(root, 'public/hero-mobile-poster.webp');

if (!existsSync(videoIn)) {
  console.error('Missing public/mobile-video-layout.mp4');
  process.exit(1);
}

execFileSync(ffmpegPath, [
  '-ss',
  '0.5',
  '-i',
  videoIn,
  '-vframes',
  '1',
  '-q:v',
  '2',
  '-update',
  '1',
  pngOut,
]);

await sharp(pngOut).webp({ quality: 82 }).toFile(webpOut);
unlinkSync(pngOut);
console.log('Wrote', webpOut);
