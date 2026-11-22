# 🎬 code-animation — Antigravity Skill

> A comprehensive skill that teaches AI assistants (Gemini, Claude, etc.) to create stunning animations with code — covering every major library, style, and technique.

## What This Skill Does

When activated in [Antigravity](https://antigravity.dev), this skill transforms the AI into an **expert animation engineer** who can:

- Generate **complete, runnable animation code** for any request
- Apply the **12 Disney animation principles** to code
- Choose the **right library** for each use case
- Create animations in **10+ distinct visual styles**
- Explain the **why** behind timing, easing, and motion choices

## Skill Structure

```
code-animation/
├── SKILL.md                  # Main skill instructions & quick reference
├── examples/
│   ├── loaders.html          # 10 pure-CSS loader animations
│   ├── particles.html        # Canvas API particle system
│   └── parallax.html         # GSAP ScrollTrigger parallax page
└── references/
    ├── css-animations.md     # Complete CSS animation reference
    ├── gsap.md               # Full GSAP API (tweens, timelines, ScrollTrigger)
    ├── framer-motion.md      # Framer Motion complete guide (React)
    ├── threejs.md            # Three.js 3D scenes, shaders, particles
    ├── p5js.md               # p5.js creative coding patterns
    ├── manim.md              # Manim Python animation guide
    └── styles.md             # 10 animation style catalog with templates
```

## Libraries Covered

| Library | Use Case |
|---------|----------|
| **CSS Animations** | Zero-dependency web animations |
| **GSAP** | Professional web timelines & ScrollTrigger |
| **Framer Motion** | React component animations |
| **Three.js** | WebGL / 3D scenes |
| **p5.js** | Generative art & creative coding |
| **Manim** | Math/educational Python animations |
| **D3.js** | Data-driven transitions |
| **SVG** | Path drawing & morphing |

## Animation Styles

1. **Minimal / Clean** — Subtle, purposeful, monochrome
2. **Cinematic** — Slow, film-inspired, letterbox reveals
3. **Retro / Pixel** — `steps()` easing, CRT scanlines, sprite animation
4. **Glassmorphism** — Blur reveals, iridescence, frosted layers
5. **Brutalist** — Hard cuts, glitch, raw energy
6. **Kawaii / Playful** — Bouncy springs, squash & stretch, confetti
7. **Cyberpunk / Neon** — Glow pulses, RGB split, holographic
8. **Nature / Organic** — Perlin noise, breathing rhythms, ripples
9. **Data-Driven** — Counters, chart transitions, progress reveals
10. **3D / Spatial** — WebGL depth, particles, post-processing

## Installation

### Option A: Global (all projects)
```
~/.gemini/config/skills/code-animation/
```
Copy this folder there. Antigravity auto-discovers it.

### Option B: Per-project
```
your-project/.agents/skills/code-animation/
```
Check it into version control to share with your team.

### Option C: Explicit config
Add to `skills.json`:
```json
{
  "skills": ["path/to/code-animation"]
}
```

## Example Outputs

The AI will produce code like this when activated:

```html
<!-- Complete, runnable hero animation — GSAP -->
<div class="hero">
  <h1 class="hero-title">Hello World</h1>
  <p class="hero-sub">Subtitle text</p>
</div>
<script>
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".hero-title", { y: 60, opacity: 0, duration: 0.8 })
  .from(".hero-sub",   { y: 40, opacity: 0, duration: 0.6 }, "-=0.3");
</script>
```

## Decision Framework (Quick Reference)

```
User wants...                    → Use
─────────────────────────────────────────────
Web UI micro-interactions        → CSS animations
Complex web sequences            → GSAP
React component animations       → Framer Motion
3D / WebGL                       → Three.js
Generative art / particles       → p5.js
Math educational explainers      → Manim (Python)
Data-driven motion graphics      → D3.js
SVG path animations              → CSS + SVG / GSAP
```

## Contributing

PRs welcome! Especially:
- New library references (Anime.js, Motion One, Rive)
- More example files (data viz, 3D scenes)
- Additional style guides
- Framework integrations (Vue, Svelte, Solid)

## License

MIT
