<div align="center">

# 🎬 Motion-Mini

### *A complete Antigravity AI skill for creating animations with code*

[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1.svg?style=flat-square)](LICENSE)
[![p5.js](https://img.shields.io/badge/p5.js-creative%20coding-ED225D?style=flat-square)](https://p5js.org)
[![GSAP](https://img.shields.io/badge/GSAP-animation-88CE02?style=flat-square)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square)](https://framer.com/motion)
[![Manim](https://img.shields.io/badge/Manim-Python-306998?style=flat-square)](https://www.manim.community)

</div>

---

## 🎥 Demo — Dadah Warga Kota **3D** (13 detik)

> v2: Three.js · pencahayaan 3 titik · bayangan · kabut · kamera spline · render deterministik

Buka `examples/3d-video-template.html` di browser (ada tombol play + scrubber).
Tiga adegan, **satu fokus per adegan**: kota senja → karakter melambai (kamera orbit) → kota malam + burung (crane up).

Jadikan MP4/GIF: **Actions → Render 3D video → Run workflow** (bisa dari HP) atau
`cd tools && npm i && node render-video.mjs ../examples/3d-video-template.html ../out/video.mp4 --gif`.

<sub>Demo v1 (2D p5.js, 10 fps) disimpan di `assets/legacy/` sebagai perbandingan.</sub>

---

## ✨ What is Motion-Mini?

Motion-Mini is a **skill for [Antigravity AI](https://antigravity.dev)** that transforms any AI assistant into an **expert animation engineer**. When activated, the AI can:

- 🎯 **Choose the right tool** for every use case automatically  
- 🎨 **Apply 10 visual styles** (Minimal, Cinematic, Retro, Glassmorphism, Kawaii, Cyberpunk...)  
- 🧠 **Apply all 12 Disney Animation Principles** to code  
- 📦 **Generate complete, runnable code** — never partial snippets  
- 🏎️ **Enforce 60fps** — only animates GPU-composited properties  

---

## 📦 Skill Structure

```
Motion-Mini/
├── 📄 SKILL.md                         ← router + aturan inti (kecil, hemat token)
├── 📂 references/
│   ├── video-3d-pipeline.md            ← storyboard, Rule of One, lighting, kamera, export, sinkron audio
│   ├── prompt-templates.md             ← prompt panjang siap pakai (ID/EN) + prompt expander
│   ├── token-saver.md                  ← aturan hemat limit/token
│   ├── css-animations.md · gsap.md · framer-motion.md
│   └── threejs.md · p5js.md · manim.md · styles.md
├── 📂 examples/
│   ├── 3d-video-template.html          ← engine video 3D berbasis CONFIG (+ demo)
│   └── loaders.html · particles.html · parallax.html
├── 📂 tools/render-video.mjs           ← export MP4/GIF frame-by-frame
└── 📂 .github/workflows/render-video.yml
```

### Kenapa SKILL.md dibuat ringkas?
**Progressive disclosure**: AI hanya membaca SKILL.md (±9 KB) lalu membuka file referensi *sesuai tugas*.
Total pengetahuan jauh lebih banyak dari v1, tapi token yang terpakai per permintaan jauh lebih sedikit.

## 💸 Hemat Token / Limit

- Template **berbasis CONFIG**: video baru = edit ±60 baris, bukan tulis ulang 400 baris.
- Storyboard berupa tabel, revisi lewat *diff*, tanpa basa-basi, maksimal 1 pertanyaan.
- Detail: [`references/token-saver.md`](references/token-saver.md) — ada *cheat card* yang bisa ditempel ke chat AI mana pun.

---

## 🛠️ Libraries Covered

| Library | Use Case | Coverage |
|---------|----------|----------|
| **CSS Animations** | Zero-dependency web animations | ⭐⭐⭐ Full |
| **GSAP** | Timelines, ScrollTrigger, Flip | ⭐⭐⭐ Full |
| **Framer Motion** | React component animations | ⭐⭐⭐ Full |
| **Three.js** | WebGL / 3D scenes | ⭐⭐⭐ Full |
| **p5.js** | Generative art, particles | ⭐⭐⭐ Full |
| **Manim** | Python math explainers | ⭐⭐⭐ Full |
| **SVG** | Path drawing & morphing | ⭐⭐ Covered |
| **D3.js** | Data-driven transitions | ⭐⭐ Covered |

---

## 🎨 10 Animation Styles

```
1.  Minimal / Clean      → Subtle, monochrome, purposeful
2.  Cinematic            → Film-paced, blur reveals, letterbox
3.  Retro / Pixel        → steps() easing, CRT scanlines, sprites
4.  Glassmorphism        → Blur reveals, iridescence, frosted
5.  Brutalist            → Hard cuts, glitch, RGB split
6.  Kawaii / Playful     → Bouncy springs, squash & stretch
7.  Cyberpunk / Neon     → Glow pulses, holographic shimmer
8.  Nature / Organic     → Perlin noise, breath, ripples
9.  Data-Driven          → Counters, chart transitions, progress
10. 3D / Spatial         → WebGL depth, lights, camera spline (DEFAULT for video)
```

---

## 🚀 Installation

### Global (all projects)
```
~/.gemini/config/skills/code-animation/
```
Copy this folder there — Antigravity discovers it automatically.

### Per-project (team shared)
```
your-project/.agents/skills/Motion-Mini/
```
Commit to version control so your whole team gets it.

---

## ⚡ Quick Decision Framework

```
User wants...                     → Use
─────────────────────────────────────────────────────────
Web UI micro-interactions         → CSS animations
Complex web sequences/timelines   → GSAP (GreenSock)
React component animations        → Framer Motion
SVG path animations               → CSS + SVG / GSAP
3D scenes / WebGL                 → Three.js
Data-driven motion graphics       → D3.js
Math/educational explainers       → Manim (Python)
Generative art / particles        → p5.js / Canvas API
```

---

## 📐 The 12 Disney Principles (In Code)

| # | Principle | Code Equivalent |
|---|-----------|----------------|
| 1 | Squash & Stretch | `scaleX(1.2) scaleY(0.8)` on impact |
| 2 | Anticipation | `-10px` before `+100px` jump |
| 3 | Staging | Stagger reveals, one focus at a time |
| 4 | Pose-to-Pose | Keyframes define poses |
| 5 | Follow Through | Child elements lag with `delay` |
| 6 | Slow In/Out | Always easing — never `linear` for UI |
| 7 | Arcs | `offset-path` or bezier motion paths |
| 8 | Secondary Action | Shadow bounce, hair wobble |
| 9 | Timing | UI: 150-400ms · Cinematic: 600ms-2s |
| 10 | Exaggeration | Push values 20-30% beyond realistic |
| 11 | Solid Drawing | Understand 3D form even in 2D |
| 12 | Appeal | 60fps minimum · Test on real devices |

---

## ⚙️ Performance Rules (Always Enforced)

- ✅ Only animate `transform`, `opacity`, `filter` (GPU-composited)
- ✅ Use `requestAnimationFrame` — never `setInterval`
- ✅ Include `@media (prefers-reduced-motion: reduce)` override
- ✅ Target 60fps — 16.67ms per frame budget
- ❌ Never animate `width`, `height`, `top`, `left`, `margin`

---

## 📄 License

MIT — use freely in personal and commercial projects.

---

<div align="center">

Made with 🎬 by the Motion-Mini skill for [Antigravity AI](https://antigravity.dev)

*Star ⭐ if this helped you animate something awesome!*

</div>
