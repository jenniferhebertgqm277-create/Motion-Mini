# Prompt Templates & Prompt Expander

Two uses:
1. **For the AI** — how to expand a short user request into a full brief *internally* (without asking 10 questions).
2. **For the user** — copy-paste prompts (Indonesian & English) that get the best result from this skill.

## A. Prompt Expander (AI-side, silent)
Given a short ask ("bikin animasi dadah kota 3D"), fill this brief with defaults, show it as **one line**, then build:
```
FORMAT   : 16:9, 1280x720, 30fps, {10–15}s, loop? {no}
STYLE    : {cinematic | kawaii | cyberpunk | minimal | retro …} (default cinematic)
STACK    : Three.js (3D) via examples/3d-video-template.html
MOOD     : {palette, time of day}
STORY    : {3 beats: setup → hero moment → payoff}
HERO     : {one subject}
CAMERA   : {dolly / orbit / crane}
TEXT     : {≤2 captions, ≤4 words}
AUDIO    : {none | voice-over timestamps | BPM}
EXPORT   : {HTML preview | MP4 | GIF}
```
Output line example: `Default: 13s cinematic 3D, dusk→night, 3 beats (kota → karakter melambai → kota malam), HTML + MP4 via Actions.`

## B. Master prompt (user-side) — Indonesian
```
Pakai skill Motion-Mini. Buatkan video animasi 3D (Three.js) dengan detail ini:

TEMA/CERITA   : [mis. perpisahan warga kota saat senja]
DURASI        : [10–15] detik, 16:9, 30 fps
GAYA          : [cinematic / kawaii / cyberpunk / retro / minimal]
PALET WARNA   : [mis. oranye senja → ungu → biru malam, aksen kuning]
KARAKTER UTAMA: [1 saja, mis. pria bertopi merah melambai]
ADEGAN (maks 3–4):
  1) 0–3 dtk  : [pembuka, kamera tinggi turun mendekat]
  2) 3–9 dtk  : [karakter utama beraksi, kamera orbit]
  3) 9–13 dtk : [penutup, kamera naik menjauh, teks "…"]
TEKS LAYAR    : [maks 2 teks, maks 4 kata]
AUDIO         : [tanpa audio / voice-over durasi X detik / BPM Y]
OUTPUT        : [HTML saja / MP4 / GIF]

Aturan: satu fokus per adegan, maksimal 5 objek bergerak bersamaan,
gunakan template 3d-video-template.html dan edit CONFIG saja,
hemat token (tanpa basa-basi, perbaikan lewat diff).
```

## C. Master prompt (user-side) — English
```
Use the Motion-Mini skill. Make a 3D (Three.js) video:
THEME: [...]  LENGTH: [10–15]s 16:9 30fps  STYLE: [...]  PALETTE: [...]
HERO: [one subject]
BEATS: 1) 0–3s [...]  2) 3–9s [...]  3) 9–13s [...]
TEXT: [≤2 captions]  AUDIO: [none / VO Xs / BPM Y]  OUTPUT: [HTML / MP4 / GIF]
Rules: one hero per beat, ≤5 moving objects, copy the 3D template and edit CONFIG only, token-lean.
```

## D. Ready-made recipes
**Logo reveal 3D (5–6 s)** — beat 1: particles converge (seeded) → beat 2: extruded logo rotates in with rim light sweep → beat 3: hold + subtle camera push. Hero: logo. Text: brand name only.

**Product showcase (10 s)** — turntable orbit 360° (one smooth arc), 3 light sweeps, 3 callouts (≤3 words) on the beat grid.

**Cyberpunk street (12 s)** — rain via seeded `Points` (positions = f(t)), neon emissive signs, camera dolly down the street, bloom optional. Hero: one neon sign flicker (pure function: `on = step(sin(37t)*sin(11t))`).

**Kawaii intro (8 s)** — pastel palette, spring easing, squash & stretch on every pop-in, stagger 0.12 s, hero bounces to centre, caption pops with overshoot.

**Educational explainer** — use Manim (`references/manim.md`), one concept per scene, formulas appear on the voice-over word.

**Short chaos/"anomaly" comedy** — escalate, don't stack: beat 1 normal → beat 2 one absurd thing → beat 3 two absurd things → beat 4 payoff. Each absurdity gets 1.5–2.5 s of exclusive focus.

## E. Fixing "berantakan" (messy) — one-line prompt
```
Rapikan: kurangi elemen yang bergerak bersamaan jadi maks 5, bagi jadi 3 adegan dengan 1 fokus tiap adegan,
tambah gerak kamera halus, pakai pencahayaan 3 titik + bayangan, dan ubah ke render berbasis waktu t.
```
