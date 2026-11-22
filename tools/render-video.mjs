#!/usr/bin/env node
/**
 * Motion-Mini deterministic renderer
 * Renders examples/*.html (any page exposing window.captureAt(t) + window.CONFIG)
 * frame-by-frame -> PNG sequence -> MP4 (and optional GIF) via ffmpeg.
 *
 * Usage:
 *   cd tools && npm i
 *   node render-video.mjs ../examples/3d-video-template.html out/video.mp4 [--fps 30] [--gif] [--scale 1]
 *
 * Needs: node 18+, ffmpeg in PATH. Works on GitHub Actions (see .github/workflows/render-video.yml).
 */
import puppeteer from 'puppeteer';
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const raw = process.argv.slice(2), opts = {}, pos = [];
for (let i = 0; i < raw.length; i++) {
  const a = raw[i];
  if (a === '--gif') opts.gif = true;
  else if (a === '--fps') opts.fps = raw[++i];
  else if (!a.startsWith('--')) pos.push(a);
}
const flag = (n, d) => (n in opts ? opts[n] : d);
const [input, output = 'out/video.mp4'] = pos;
if (!input) { console.error('usage: node render-video.mjs <page.html> [out.mp4] [--fps 30] [--gif]'); process.exit(1); }

const run = (cmd, a) => new Promise((ok, no) => {
  const p = spawn(cmd, a, { stdio: ['ignore', 'inherit', 'inherit'] });
  p.on('exit', c => c === 0 ? ok() : no(new Error(`${cmd} exited ${c}`)));
});

const out = resolve(output), tmp = join(dirname(out), '.frames');
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
page.on('pageerror', e => console.error('page error:', e.message));
const cfgSize = [1280, 720];
await page.setViewport({ width: cfgSize[0], height: cfgSize[1] });
await page.goto(pathToFileURL(resolve(input)).href + '?capture=1', { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForFunction('window.__ready === true', { timeout: 60000 });

const cfg = await page.evaluate(() => ({ duration: window.CONFIG.duration, fps: window.CONFIG.fps }));
const fps = Number(flag('fps', cfg.fps)) || cfg.fps;
const total = Math.round(cfg.duration * fps);
console.log(`Rendering ${total} frames @ ${fps}fps (${cfg.duration}s)…`);

for (let i = 0; i < total; i++) {
  const t = i / fps;
  const dataUrl = await page.evaluate(tt => window.captureAt(tt), t);
  writeFileSync(join(tmp, String(i).padStart(5, '0') + '.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  if (i % 30 === 0) console.log(`  ${i}/${total}`);
}
await browser.close();

await run('ffmpeg', ['-y', '-framerate', String(fps), '-i', join(tmp, '%05d.png'),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'medium', '-movflags', '+faststart', out]);
console.log('MP4 ->', out);

if (flag('gif', false)) {
  const gif = out.replace(/\.mp4$/, '.gif');
  await run('ffmpeg', ['-y', '-i', out, '-vf', `fps=${Math.min(fps, 20)},scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`, gif]);
  console.log('GIF ->', gif);
}
rmSync(tmp, { recursive: true, force: true });
