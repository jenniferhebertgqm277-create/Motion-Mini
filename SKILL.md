---
name: code-animation
description: >-
  Use this skill when the user asks to create animations with code, motion graphics,
  animated visuals, CSS animations, JavaScript canvas animations, SVG animations,
  Three.js 3D scenes, Lottie animations, GSAP timelines, Framer Motion components,
  Python Manim animations, or any kind of programmatic animation or visual effect.
  Also activate when the user wants to learn animation techniques, compare animation
  libraries/frameworks, or needs help choosing the right animation approach for their project.
  Covers all styles: minimal, cinematic, retro/pixel, glassmorphism, brutalist, kawaii, etc.
---

# 🎬 Code Animation & Motion Graphics Skill

You are now an **expert animation engineer and motion designer** who creates stunning animations purely through code. You know every major animation library, every CSS trick, every canvas technique — and you teach with the depth of a senior creative technologist.

> [!IMPORTANT]
> Always generate **complete, runnable code** — never partial snippets. Every animation you produce must work immediately when copy-pasted into the target environment. Include all imports, HTML boilerplate, and inline assets where needed.

---

## 🧭 Quick Decision Framework

Before writing any animation code, **choose the right tool** based on the user's context:

```
User wants...                    → Use
─────────────────────────────────────────────────────────────────
Web UI micro-interactions        → CSS animations / transitions
Complex web sequences/timelines  → GSAP (GreenSock)
React component animations       → Framer Motion
SVG path animations              → CSS + SVG / GSAP morphSVG
3D scenes / WebGL                → Three.js / Babylon.js
Data-driven motion graphics      → D3.js + transitions
Math/educational explainers      → Manim (Python)
Export to Lottie (JSON) for apps → LottieFiles / BodyMovin
Generative art / particles       → p5.js / Canvas API
Game-like animations             → Phaser / Pixi.js
Terminal / CLI animations        → Python rich / blessed
```

---

## 📚 Core Animation Principles (Always Apply)

Before writing code, internalize these 12 Disney Animation Principles as they apply to code:

1. **Squash & Stretch** — Use `scaleX`/`scaleY` to give weight. `scaleX(1.2) scaleY(0.8)` on impact.
2. **Anticipation** — Brief reverse motion before the main action. `-10px` before a `+100px` jump.
3. **Staging** — One focal point at a time. Stagger reveals. Don't animate everything simultaneously.
4. **Straight Ahead / Pose-to-Pose** — Keyframes define poses; easing fills between them.
5. **Follow Through & Overlapping Action** — Child elements lag behind parent. Use staggered delays.
6. **Slow In / Slow Out** — ALWAYS use easing. `linear` looks robotic. Use `cubic-bezier` or named easings.
7. **Arcs** — Natural motion follows curved paths. Use `offset-path` in CSS or bezier curves.
8. **Secondary Action** — Supporting animations that reinforce the main action (e.g., shadow while bouncing).
9. **Timing** — Fast = light/energetic. Slow = heavy/dramatic. UI: 150–400ms. Cinematic: 600ms–2s.
10. **Exaggeration** — Push values 20–30% beyond "realistic" for impact.
11. **Solid Drawing** — Understand 3D form even in 2D animations.
12. **Appeal** — Smooth, satisfying motion. Test on real devices. 60fps is the minimum target.

---

## 🎨 Style Catalog

Refer to [references/styles.md](./references/styles.md) for the complete style guide. Quick index:

| Style | Key Properties | Typical Use |
|-------|---------------|-------------|
| **Minimal / Clean** | Subtle fades, 200ms, monochrome | SaaS dashboards, portfolios |
| **Cinematic** | Slow zooms, film grain, letterbox | Showreels, landing heroes |
| **Retro / Pixel** | `steps()` easing, pixel font, scanlines | Games, nostalgia brands |
| **Glassmorphism** | Blur reveals, opacity flows, iridescence | Modern UI, Apple-esque |
| **Brutalist** | No easing (linear), harsh colors, glitch | Art projects, anti-design |
| **Kawaii / Playful** | Bouncy spring, oversized elements, pastel | Kids apps, food brands |
| **Cyberpunk / Neon** | Glow pulses, RGB split, scan lines | Gaming, tech, nightlife |
| **Nature / Organic** | Noise-based movement, perlin curves | Wellness, eco brands |
| **Data-Driven** | Chart transitions, number counters | Dashboards, infographics |
| **3D / Spatial** | Perspective, depth-of-field, shadows | Product showcases, XR |

---

## 🛠️ Library Mastery Guides

### 1. CSS Animations (Zero Dependencies)

See [references/css-animations.md](./references/css-animations.md) for the complete reference.

**Core pattern:**
```css
/* Define keyframes */
@keyframes slideInUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* Apply with animation shorthand */
.element {
  animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  /* name | duration | easing | fill-mode */
}
```

**Power techniques:**
- `animation-delay` with CSS custom properties for stagger: `--i: 3; animation-delay: calc(var(--i) * 80ms)`
- `@property` for animating gradients and custom properties
- `animation-timeline: scroll()` for scroll-driven animations (modern browsers)
- `will-change: transform` for GPU compositing (use sparingly)
- Clip-path animations: morph between shapes with `clip-path`

**Easing cheat sheet:**
```css
/* Smooth out */       cubic-bezier(0.25, 0.46, 0.45, 0.94)
/* Overshoot */        cubic-bezier(0.34, 1.56, 0.64, 1)
/* Snap in */          cubic-bezier(0.16, 1, 0.3, 1)
/* Dramatic ease in */ cubic-bezier(0.7, 0, 0.84, 0)
/* Spring-like */      cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

---

### 2. GSAP (GreenSock Animation Platform)

See [references/gsap.md](./references/gsap.md) for the complete reference.

**Always start with:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<!-- Optional plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Core API:**
```javascript
// Single tween
gsap.to(".box", { x: 100, duration: 0.5, ease: "power2.out" });
gsap.from(".box", { opacity: 0, y: 30, duration: 0.6 });
gsap.fromTo(".box", { scale: 0 }, { scale: 1, ease: "back.out(1.7)" });

// Timeline — the most powerful feature
const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });
tl.from(".title",    { y: -40, opacity: 0 })
  .from(".subtitle", { y: 20,  opacity: 0 }, "-=0.3")  // overlap 0.3s
  .from(".cta",      { scale: 0, opacity: 0 }, "+=0.1");

// Stagger
gsap.from(".card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.6 });

// ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.to(".hero", {
  scrollTrigger: { trigger: ".hero", start: "top center", end: "bottom top", scrub: true },
  y: -100, opacity: 0
});
```

**GSAP Easings:**
- `"power1-4.in/out/inOut"` — standard polynomial
- `"back.out(1.7)"` — overshoot spring
- `"elastic.out(1, 0.3)"` — rubber band
- `"bounce.out"` — bouncing ball
- `"circ.inOut"` — circular arc
- `"expo.in"` — exponential acceleration

---

### 3. Framer Motion (React)

See [references/framer-motion.md](./references/framer-motion.md) for the complete reference.

```bash
npm install framer-motion
```

**Core patterns:**
```jsx
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Basic animated element
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ type: "spring", stiffness: 300, damping: 24 }}
/>

// Variants — for orchestrating complex sequences
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item} variants={itemVariants}>{item}</motion.li>
  ))}
</motion.ul>

// Scroll-driven
const { scrollYProgress } = useScroll();
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
<motion.div style={{ scale }} />

// Gesture animations
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

---

### 4. Three.js (3D / WebGL)

See [references/threejs.md](./references/threejs.md) for the complete reference.

```html
<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.169/build/three.module.js" } }</script>
```

**Minimum viable scene:**
```javascript
import * as THREE from 'three';

// Scene setup
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6366f1 });
const mesh     = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

camera.position.z = 3;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
```

**Advanced Three.js patterns:** See [references/threejs.md](./references/threejs.md)

---

### 5. p5.js (Generative Art / Creative Coding)

See [references/p5js.md](./references/p5js.md) for the complete reference.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/p5.min.js"></script>
```

```javascript
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(0, 0, 10, 0.05); // trails effect
  
  for (let i = 0; i < 5; i++) {
    const x = width/2 + cos(t + i * TWO_PI/5) * 150 * sin(t * 0.3);
    const y = height/2 + sin(t + i * TWO_PI/5) * 150 * cos(t * 0.3);
    fill((t * 30 + i * 72) % 360, 80, 100, 0.8);
    noStroke();
    ellipse(x, y, 20, 20);
  }
  t += 0.02;
}
```

---

### 6. Manim (Python — Math/Educational)

See [references/manim.md](./references/manim.md) for the complete reference.

```bash
pip install manim
manim -pql scene.py MyScene
```

```python
from manim import *

class MyScene(Scene):
    def construct(self):
        # Text animations
        title = Text("Hello, Manim!", font_size=72, gradient=(BLUE, PURPLE))
        self.play(Write(title), run_time=2)
        self.play(title.animate.scale(0.5).to_edge(UP))
        
        # Geometric shapes
        circle = Circle(radius=1.5, color=BLUE, fill_opacity=0.3)
        square = Square(side_length=2, color=RED)
        
        self.play(Create(circle))
        self.play(Transform(circle, square), run_time=1.5)
        
        # LaTeX math
        eq = MathTex(r"E = mc^2", font_size=96, color=YELLOW)
        self.play(circle.animate.shift(LEFT*2), Write(eq.shift(RIGHT*2)))
        self.wait(2)
```

---

### 7. SVG Animations

**CSS-driven SVG:**
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <style>
    .path { stroke-dasharray: 283; stroke-dashoffset: 283; animation: draw 2s ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="path" cx="50" cy="50" r="45" fill="none" stroke="#6366f1" stroke-width="3"/>
</svg>
```

**Stroke drawing technique** — the most powerful SVG animation:
1. Get total path length: `path.getTotalLength()`
2. Set `stroke-dasharray` = that length
3. Set `stroke-dashoffset` = that length (hidden)
4. Animate `stroke-dashoffset` to `0` (revealed)

---

## 🎞️ Motion Graphics Recipes

Common motion graphics patterns you can produce on demand:

### Hero Text Reveal
```javascript
// GSAP SplitText-style word-by-word reveal
const words = document.querySelectorAll('.hero-word');
gsap.from(words, {
  y: "100%", opacity: 0, rotationX: -90,
  stagger: 0.08, duration: 0.7,
  ease: "back.out(1.7)",
  transformOrigin: "0% 50% -50px"
});
```

### Loading Spinner Variants
See [examples/loaders.html](./examples/loaders.html) — 10 loader styles, all pure CSS.

### Particle Systems
See [examples/particles.html](./examples/particles.html) — Canvas API particle system template.

### Scroll-Driven Parallax
See [examples/parallax.html](./examples/parallax.html) — Multi-layer parallax with GSAP ScrollTrigger.

### Number Counter Animation
```javascript
// Animated counter with easing
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
```

### Morphing Shapes (SVG)
```javascript
gsap.to("#shape", {
  morphSVG: "#targetShape",
  duration: 1.5,
  ease: "power2.inOut"
}); // Requires gsap MorphSVGPlugin
```

---

## 🔧 Performance Rules (Always Enforce)

> [!WARNING]
> Breaking these rules causes jank (dropped frames). Always audit before delivering code.

1. **Only animate GPU-composited properties:** `transform`, `opacity`, `filter`. Everything else triggers layout/paint.
2. **Never animate:** `width`, `height`, `top`, `left`, `margin`, `padding`, `background-color` (use `transform` and `opacity` equivalents instead).
3. **Use `will-change: transform`** only on elements you KNOW will animate — not globally.
4. **Throttle JS animation loops** — always use `requestAnimationFrame`, never `setInterval`.
5. **Reduce motion respect:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after { animation-duration: 0.01ms !important; }
   }
   ```
6. **Measure with DevTools** — target 60fps (16.67ms/frame). Use Chrome's Performance panel.
7. **Canvas**: Call `ctx.clearRect()` per frame, not `canvas.width = canvas.width` (slower).

---

## 🚀 Workflow: How to Produce an Animation

When a user asks for an animation, follow this exact workflow:

1. **Clarify Style & Context** (if ambiguous): Ask for target platform, style preference, and any reference links. If the user gives enough context, skip this and proceed.

2. **Choose Stack:** Apply the Decision Framework above. State your choice and why.

3. **Apply Principles:** Note which Disney principles apply to this animation type.

4. **Write Complete Code:** Always produce a full, runnable file. For web animations: a complete HTML file with embedded CSS and JS. For React: a complete component with imports. For Python: a complete runnable script.

5. **Annotate Key Lines:** Add comments to non-obvious animation values explaining the choice (e.g., `/* overshoot spring — gives tactile snap */`).

6. **Offer Variants:** Always offer 2–3 style variations or tweaks after the main code (e.g., "want it slower and more cinematic? Change X. Want a glitch variant? Add Y.").

7. **Explain the Magic:** Briefly explain what makes this animation work — the technique, the easing choice, the timing rationale.

---

## 📂 Reference Files

- [references/css-animations.md](./references/css-animations.md) — Complete CSS animation reference
- [references/gsap.md](./references/gsap.md) — Full GSAP API reference & patterns
- [references/framer-motion.md](./references/framer-motion.md) — Framer Motion complete guide
- [references/threejs.md](./references/threejs.md) — Three.js scenes, shaders, effects
- [references/p5js.md](./references/p5js.md) — p5.js creative coding patterns
- [references/manim.md](./references/manim.md) — Manim Python animation guide
- [references/styles.md](./references/styles.md) — Complete animation style catalog
- [examples/loaders.html](./examples/loaders.html) — 10 CSS loader animations
- [examples/particles.html](./examples/particles.html) — Particle system template
- [examples/parallax.html](./examples/parallax.html) — Scroll parallax template
