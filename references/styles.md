# Animation Style Catalog

## 1. Minimal / Clean

**Philosophy:** "Less is more." Every motion is intentional and purposeful. No decoration.

**Visual Properties:**
- Colors: monochrome, max 2 accent colors, lots of whitespace
- Timing: 150–300ms, never longer
- Easing: `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` (snap out)
- Motion: fade + subtle Y translate (20–30px max)

**CSS Template:**
```css
:root {
  --anim-fast: 0.15s;
  --anim-normal: 0.25s;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal {
  animation: minimalReveal var(--anim-normal) var(--ease-out) both;
}

@keyframes minimalReveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Hover states: subtle */
.btn { transition: opacity var(--anim-fast) ease; }
.btn:hover { opacity: 0.7; }
```

**Stagger timing:** 60–80ms between items
**Use for:** SaaS products, design agencies, portfolios, Apple-inspired UIs

---

## 2. Cinematic

**Philosophy:** Film-inspired pacing. Slow, deliberate. Every moment has weight.

**Visual Properties:**
- Colors: deep, desaturated, filmic
- Timing: 600ms–2s
- Easing: `cubic-bezier(0.19, 1, 0.22, 1)` (expo ease out)
- Motion: slow reveals, letterbox bars, zoom, blur-to-sharp
- Effects: film grain, vignette, depth of field (blur)

**CSS/JS Template:**
```css
/* Letterbox reveal */
.hero::before, .hero::after {
  content: "";
  position: fixed;
  left: 0; right: 0;
  height: 10vh;
  background: #000;
  z-index: 100;
  transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
}
.hero::before { top: 0; }
.hero::after  { bottom: 0; }
.reveal .hero::before { transform: translateY(-100%); }
.reveal .hero::after  { transform: translateY(100%); }

/* Cinematic text reveal */
@keyframes cinematicReveal {
  from { opacity: 0; transform: translateY(60px); filter: blur(10px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.hero-title {
  animation: cinematicReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) 0.5s both;
}

/* Film grain overlay */
.grain::after {
  content: "";
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.08;
  pointer-events: none;
  animation: grain 0.5s steps(1) infinite;
}
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  25%       { transform: translate(-2%, -2%); }
  50%       { transform: translate(2%, 1%); }
  75%       { transform: translate(-1%, 2%); }
}
```

**Stagger timing:** 200–400ms between items
**Use for:** Film portfolios, luxury brands, art exhibitions, game cutscenes

---

## 3. Retro / Pixel Art

**Philosophy:** Celebrate the constraints of early digital aesthetics.

**Visual Properties:**
- Colors: limited palette (4–16 colors), high contrast
- Timing: `steps(n)` — no smooth easing, discrete jumps
- Font: pixel/monospace fonts
- Motion: frame-by-frame, no anti-aliasing (`image-rendering: pixelated`)
- Effects: scanlines, CRT bend, dithering

**CSS Template:**
```css
/* Pixel font */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body { font-family: 'Press Start 2P', monospace; image-rendering: pixelated; }

/* Step animation — 8 frames */
@keyframes pixelWalk {
  0%   { background-position: 0px 0; }
  100% { background-position: -256px 0; }
}
.sprite {
  width: 32px; height: 32px;
  animation: pixelWalk 0.8s steps(8) infinite;
}

/* CRT scanlines */
.crt::after {
  content: "";
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.15) 0px,
    rgba(0,0,0,0.15) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
}

/* Blinking cursor */
@keyframes blink { 50% { opacity: 0; } }
.cursor { animation: blink 1s steps(1) infinite; }

/* Pixel reveal (typewriter-ish) */
@keyframes pixelReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
.pixel-text { animation: pixelReveal 0.8s steps(16) forwards; }
```

**Stagger timing:** 100ms fixed (not eased)
**Use for:** Games, retro brands, dev tools, hackathon projects, nostalgia campaigns

---

## 4. Glassmorphism

**Philosophy:** Frosted glass — depth through blur and translucency.

**Visual Properties:**
- Colors: gradient backgrounds with blur overlay, iridescent accents
- Timing: 300–600ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot spring)
- Motion: scale + fade reveals, floating cards, blur transitions

**CSS Template:**
```css
/* Glass card */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
}

/* Glass reveal animation */
@keyframes glassReveal {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
    filter: blur(10px);
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
    backdrop-filter: blur(20px);
  }
}
.glass-card { animation: glassReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

/* Iridescent shimmer */
@keyframes iridescence {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.iridescent {
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #667eea);
  background-size: 300% 300%;
  animation: iridescence 4s ease infinite;
}
```

**Use for:** iOS-inspired UIs, modern dashboards, fintech apps, AI products

---

## 5. Brutalist

**Philosophy:** Harsh, confrontational, anti-conventional. Motion is deliberate and jarring.

**Visual Properties:**
- Colors: black, white, primary red/yellow — no gradients
- Timing: instant or very slow — no in-between
- Easing: `linear` ONLY — no smooth curves
- Motion: hard cuts, abrupt jumps, glitch effects
- Typography: huge, overlapping, raw

**CSS Template:**
```css
/* Hard reveal — no easing */
@keyframes brutalistReveal {
  0%   { opacity: 0; transform: translateX(-100vw); }
  100% { opacity: 1; transform: translateX(0); }
}
.brute { animation: brutalistReveal 0.3s linear; }

/* Glitch effect */
@keyframes glitch {
  0%   { transform: none; }
  20%  { transform: skewX(5deg) scaleX(1.05); filter: hue-rotate(90deg); }
  21%  { transform: none; }
  40%  { transform: translateX(5px); clip-path: inset(10% 0 80% 0); }
  41%  { transform: none; clip-path: none; }
  60%  { transform: skewX(-3deg); filter: invert(1); }
  61%  { transform: none; filter: none; }
  80%  { transform: translateX(-3px) skewY(1deg); }
  81%  { transform: none; }
}
.glitch-text {
  animation: glitch 0.5s linear infinite;
  position: relative;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0;
  animation: glitch 0.5s linear infinite reverse;
}
.glitch-text::before { color: cyan;    clip-path: inset(0 0 60% 0); transform: translateX(2px); }
.glitch-text::after  { color: magenta; clip-path: inset(60% 0 0 0);  transform: translateX(-2px); }

/* RGB split */
@keyframes rgbSplit {
  0%, 100% { text-shadow: 2px 0 red, -2px 0 blue; }
  50%       { text-shadow: -2px 0 red, 2px 0 blue; }
}
.rgb-text { animation: rgbSplit 0.1s linear infinite; }
```

**Use for:** Art projects, counter-culture brands, music events, experimental portfolios

---

## 6. Kawaii / Playful

**Philosophy:** Joyful, bouncy, oversized, friendly. Everything feels alive and happy.

**Visual Properties:**
- Colors: pastel, high saturation, rounded
- Timing: 300–500ms but with spring overshoot
- Easing: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (spring) — overshoot everything
- Motion: big bounces, jiggles, squash and stretch
- Effects: confetti, sparkles, stars

**CSS Template:**
```css
/* Bouncy button */
@keyframes kawaiiBounce {
  0%   { transform: scale(1); }
  30%  { transform: scale(0.85, 1.15); }  /* squash */
  50%  { transform: scale(1.3, 0.75); }   /* stretch */
  70%  { transform: scale(0.9, 1.1); }    /* bounce */
  85%  { transform: scale(1.05, 0.98); }  /* settle */
  100% { transform: scale(1); }
}
.kawaii-btn:active { animation: kawaiiBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Wiggle */
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25%       { transform: rotate(-8deg) scale(1.1); }
  75%       { transform: rotate(8deg) scale(1.1); }
}
.wiggle:hover { animation: wiggle 0.4s ease infinite; }

/* Pop in */
@keyframes kawaiiPop {
  0%   { transform: scale(0) rotate(-10deg); }
  60%  { transform: scale(1.2) rotate(5deg); }
  80%  { transform: scale(0.9) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
}
.pop-in { animation: kawaiiPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both; }

/* Confetti particle */
@keyframes confetti {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.confetti-particle {
  position: fixed;
  animation: confetti 2s linear forwards;
  /* Use JS to spawn many with random x, delay, color */
}
```

**Use for:** Kids apps, food delivery, games, celebration UIs, onboarding flows

---

## 7. Cyberpunk / Neon

**Philosophy:** Futuristic dystopia. Glowing lines, RGB, digital decay.

**Visual Properties:**
- Colors: neon (cyan, magenta, electric yellow) on dark backgrounds
- Timing: 100–300ms fast, plus slow infinite glow pulses
- Easing: mix of `linear` (glitch) and `ease-out` (smooth glow)
- Motion: scan lines, flicker, RGB split, holographic shimmer

**CSS Template:**
```css
/* Neon text */
.neon {
  color: #0ff;
  text-shadow:
    0 0 7px  #0ff,
    0 0 10px #0ff,
    0 0 21px #0ff,
    0 0 42px #00b3b3,
    0 0 82px #00b3b3;
  animation: neonFlicker 3s linear infinite;
}

@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 7px #0ff, 0 0 10px #0ff, 0 0 42px #00b3b3;
  }
  20%, 24%, 55% {
    text-shadow: none;
    color: rgba(0,255,255,0.4);
  }
}

/* Holographic gradient */
.holo {
  background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06d6a0, #ff006e);
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: holoShift 3s linear infinite;
}
@keyframes holoShift { to { background-position: 300% center; } }

/* Scan line sweep */
@keyframes scanSweep {
  0%   { top: -5%; }
  100% { top: 105%; }
}
.scanline {
  position: fixed; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent);
  animation: scanSweep 4s linear infinite;
  pointer-events: none;
}
```

**Use for:** Gaming UIs, music visualizers, hackathon projects, sci-fi interfaces

---

## 8. Nature / Organic

**Philosophy:** Breath, flow, imperfect curves. Mimics natural systems.

**Visual Properties:**
- Colors: earth tones, forest greens, ocean blues
- Timing: 1–3s, slow and breathing
- Easing: sine waves, perlin noise paths — no sharp corners
- Motion: gentle sways, water ripples, leaf flutter, breath cycles

**CSS/JS Template:**
```javascript
// Perlin-noise-like movement with p5.js
function draw() {
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].x += cos(noise(i, t) * TWO_PI) * 0.5;
    blobs[i].y += sin(noise(i + 100, t) * TWO_PI) * 0.5;
    t += 0.001;
  }
}
```

```css
/* Breathing animation */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%       { transform: scale(1.05); opacity: 1; }
}
.organic { animation: breathe 4s ease-in-out infinite; }

/* Water ripple */
@keyframes ripple {
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(4); opacity: 0; }
}
.ripple::after {
  content: "";
  position: absolute; inset: 0;
  border-radius: 50%;
  border: 2px solid currentColor;
  animation: ripple 2s ease-out infinite;
}
```

**Use for:** Wellness apps, eco brands, meditation tools, luxury spas

---

## 9. Data-Driven / Dashboard

**Philosophy:** Animation communicates data change. Numbers, charts, transitions tell stories.

**Key animations:**
- Number counters (count up on load)
- Bar chart grow from bottom
- Line chart draw from left
- Pie/donut chart fill
- Data point appear on hover

**JS Template:**
```javascript
// Number counter
function countUp(el, target, duration = 2000) {
  const start = performance.now();
  const update = now => {
    const p = Math.min((now - start) / duration, 1);
    const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// SVG progress circle
function setProgress(circle, percent) {
  const r = circle.r.baseVal.value;
  const c = 2 * Math.PI * r;
  circle.style.strokeDasharray  = c;
  circle.style.strokeDashoffset = c * (1 - percent / 100);
  circle.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)";
}
```

**D3.js transitions:**
```javascript
d3.select(".bar")
  .transition()
  .duration(800)
  .ease(d3.easeCubicOut)
  .attr("height", d => yScale(d.value))
  .attr("y", d => yScale(d.value));
```

**Use for:** Analytics dashboards, finance apps, reporting tools, data journalism

---

## Style Mixing Guide

You can combine styles for unique effects:

| Combo | Result |
|-------|--------|
| Minimal + Glassmorphism | Modern SaaS — clean with depth |
| Cyberpunk + Brutalist | Extreme digital art — raw neon |
| Kawaii + Data-Driven | Friendly analytics — engaging and fun |
| Cinematic + Organic | Premium wellness brand |
| Retro + Minimal | Nostalgic simplicity |
| Cinematic + Cyberpunk | Sci-fi movie trailer feel |
