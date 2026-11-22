# 3D Video Pipeline (Three.js, deterministic, export-ready)

Read this when the user wants a **video, a cinematic, a 3D scene, a farewell/intro/outro, a logo reveal**, or complains the animation is "messy / berantakan / not 3D".

## 0. Why animations end up messy (and the fix)
| Symptom | Cause | Fix in this pipeline |
|---|---|---|
| Everything moves at once | No staging | **Rule of One** (§2): 1 hero, ≤2 support, rest still |
| Choppy / inconsistent video | Frame-based (`x += 0.02`) + screen recording | **Pure `render(t)`** + frame-by-frame export (§6) |
| Looks flat, "2D clipart" | No lights, no depth cues, no camera motion | 3-point lights, fog, shadows, camera spline (§3–§4) |
| Random chaos each run | `Math.random()` in the loop | Seeded RNG at build time only |
| No story | No beats | Storyboard table (§1) |

## 1. Storyboard (mandatory, ≤ 8 rows)
```
| # | t (s)     | Hero (1 thing)          | Support (≤2)        | Camera            | Light/mood |
|---|-----------|-------------------------|---------------------|-------------------|-----------|
| 1 | 0.0–3.0   | city at dusk            | title fade          | high wide→dolly in| warm      |
| 2 | 3.0–9.5   | character waves         | breathing, shadow   | orbit R→L         | warm→cool |
| 3 | 9.5–13    | night skyline           | birds, window lights| crane up & back   | night     |
```
Beat length ≥ 1.5 s. Total 10–15 s for a "short"; 1 beat per 2–4 s.

## 2. Visual hierarchy — the Rule of One
- **1 hero action** per beat (the thing the eye follows).
- **≤ 2 supporting actions** (secondary action, ambient).
- Everything else is static or very slow (< 10% of hero speed).
- Max **5 simultaneously moving things** on screen. More = noise.
- Hero gets: biggest size, highest contrast, brightest light, camera framing.
- Text: ≤ 4 words per card, ≥ 1.8 s on screen (≈ 0.3 s/word, min 1.2 s). Fade in/out 0.4 s.
- Chaos/"anomaly" style is allowed but **sequenced**: one absurd thing per beat, escalating — never all at once.

## 3. Quality bar for 3D (what makes it NOT look flat)
1. **3-point lighting**: warm key (strong, 30–45° off camera) + hemisphere fill + cool rim from behind.
2. **Shadows on** (`PCFSoftShadowMap`, 2048 map, tight shadow camera bounds, `bias ≈ -0.0004`).
3. **Fog = sky colour** → instant depth. Update both together.
4. **Tone mapping** `ACESFilmicToneMapping`, exposure 1.0–1.3.
5. **Emissive for light sources** (windows, neon, screens) — raise at night; this is what sells dusk→night.
6. **Palette 60/30/10**: 60 % base (dark/neutral), 30 % secondary, 10 % accent (hero colour).
7. **Scale & rhythm**: vary building/prop heights with seeded RNG; avoid perfect grids.
8. **Camera never static**: slow push-in/orbit even on "still" shots (≥ 3 % per second).
9. Optional post-FX (only if asked, costs perf): bloom for neon, vignette via CSS.

## 4. Camera cookbook (all in the template's `CONFIG.camera`)
| Move | Keyframes pattern |
|---|---|
| Dolly in | pos z decreases, look fixed |
| Orbit | pos = center + r·(sin a, h, cos a), look = center; a sweeps 40–90° |
| Crane up & back | pos y↑ and z↑ together, look y slightly ↑ |
| Push-in on hero | pos approaches hero, FOV 42→35 (optional) |
| Reveal | start behind an occluder / low, rise to wide |
Use ≥ 3 keys per move; the spline avoids hard stops between keys. Keep roll = 0 (no dutch tilt unless asked).

## 5. Character blocking (low-poly rig that reads well)
- Build from primitives: capsule body, sphere head, cylinder limbs; limbs pivot from **groups at the joint** (shoulder group → arm offset by −half length).
- Squash & stretch on breath: `scale.y = 1+0.03·sin(3t)`, `scale.x = 1−0.02·sin(3t)`.
- Follow-through: head/hat phase-lag the body by 0.3–0.5 rad.
- Anticipation: before a big gesture, 0.2 s counter-move (arm dips, then rises).
- Face the camera partially: `rotation.y = atan2(cam.x, cam.z) * 0.8`.
- Wave: weight `w = smooth(in) * (1 − smooth(out))`; angle = lerp(rest, raised, w) + w·sin(10t)·0.38.

## 6. Deterministic rendering (required for video export)
```js
function update(t) { /* set EVERY animated property from t */ }
window.renderAt  = t => { update(t); renderer.render(scene, camera); };
window.captureAt = t => { renderAt(t); return renderer.domElement.toDataURL('image/png'); };
```
Rules: no `Math.random()` in update · no `+=` accumulation · no `setInterval`/`setTimeout` for motion · no `Date.now()` · seeded RNG (`mulberry32`) only while building the scene · `preserveDrawingBuffer: true` in capture mode.

### Export options
| Where | Command |
|---|---|
| PC / Termux with Node+ffmpeg | `cd tools && npm i && node render-video.mjs ../examples/3d-video-template.html ../out/video.mp4 --gif` |
| Phone only | GitHub → **Actions → Render 3D video → Run workflow** → download artifact |
| Quick preview | Open the HTML, use the scrubber; or screen-record (lower quality) |

## 7. Audio / voice-over sync
1. Get the voice-over duration `V` (seconds). Set `CONFIG.duration = V + 1` (0.5 s head/tail).
2. Put each spoken phrase in `CONFIG.captions` with `from/to` = its timestamp (from SRT / ElevenLabs timestamps; otherwise ≈ 0.4 s per word).
3. Align beats: a hero gesture should land **on** the emphasised word (±0.1 s).
4. Merge after export: `ffmpeg -i video.mp4 -i voice.mp3 -c:v copy -c:a aac -shortest final.mp4`.
5. Beat-synced music: compute `beat = t * BPM/60`; use `Math.floor(beat)` for cuts and `1 - (beat % 1)` for pulses (still a pure function of t).

## 8. Quality Gate (check silently, report only failures)
- [ ] Storyboard exists; each beat has exactly 1 hero.
- [ ] ≤ 5 things moving at once; no beat < 1.5 s.
- [ ] Lights: key + fill + rim; shadows on; fog colour = background.
- [ ] Camera moves in every beat; no hard stops.
- [ ] `update(t)` is pure; no random/accumulation; re-render of t=4.0 twice is identical.
- [ ] Text readable (≥ 1.8 s, ≤ 4 words, contrast OK, inside the safe area of the letterbox).
- [ ] Runs ≥ 30 fps on a mid phone (≤ 150k triangles, ≤ 1 shadow-casting light, pixelRatio ≤ 2).
- [ ] Loops cleanly or ends on a deliberate final frame.

## 9. Mobile performance
Pixel ratio ≤ 2 · one shadow light · `MeshStandardMaterial` only (avoid Physical) · merge repeated static meshes (`InstancedMesh`) beyond ~200 objects · textures ≤ 1024² · avoid per-frame allocations (reuse `Vector3`/`Color`).
