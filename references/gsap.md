# GSAP Complete Reference

## Installation

```html
<!-- CDN (all free features) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>
```

```bash
# NPM
npm install gsap
```

## Core Tweens

```javascript
// gsap.to() — animate FROM current state TO these values
gsap.to(".box", {
  x: 200,           // translateX (use x/y instead of left/top)
  y: -100,          // translateY
  xPercent: -50,    // translateX in %
  yPercent: -50,    // translateY in %
  rotation: 360,    // degrees
  rotationX: 90,    // 3D X rotation
  rotationY: 180,   // 3D Y rotation
  scale: 1.5,
  scaleX: 1.2,
  scaleY: 0.8,
  skewX: 15,
  opacity: 0,
  width: "50%",     // layout (avoid for perf if possible)
  backgroundColor: "#6366f1",
  color: "white",
  borderRadius: "50%",
  duration: 1,
  ease: "power2.out",
  delay: 0.5,
  repeat: -1,       // infinite; positive number = repeat count
  yoyo: true,       // reverse on repeat
  stagger: 0.1,     // when selector matches multiple elements
  onStart: () => console.log("started"),
  onComplete: () => console.log("done"),
  onUpdate: (self) => console.log(self.progress()),
});

// gsap.from() — animate FROM these values TO current state
gsap.from(".hero", { y: 50, opacity: 0, duration: 0.8 });

// gsap.fromTo() — explicit start and end
gsap.fromTo(".box", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 });

// gsap.set() — instant set (no animation)
gsap.set(".box", { x: 100, opacity: 0 });
```

## Easings

```javascript
// Power easings (most common)
"power1.in"   "power1.out"   "power1.inOut"  // gentle
"power2.in"   "power2.out"   "power2.inOut"  // medium (default-ish)
"power3.in"   "power3.out"   "power3.inOut"  // strong
"power4.in"   "power4.out"   "power4.inOut"  // very strong

// Specialty
"back.out(1.7)"         // slight overshoot — great for popups
"back.in(2)"            // anticipation before move
"back.inOut(1.7)"
"elastic.out(1, 0.3)"   // bouncy rubber band
"elastic.in(1, 0.3)"
"bounce.out"            // ball bouncing
"bounce.in"
"circ.out"              // quarter circle arc
"expo.out"              // very fast then crawl
"sine.out"              // very gentle sine curve

// Custom cubic bezier
"M0,0 C0.126,0.382 0.282,0.674 0.790,0.902 1,1"  // CustomEase (plugin)

// Step easing
"steps(4)"              // discrete steps, great for pixel art
"steps(4, end)"
```

## Timeline (The Powerhouse)

```javascript
// Basic timeline
const tl = gsap.timeline();
tl.from(".el1", { y: -50, opacity: 0, duration: 0.5 })
  .from(".el2", { y: -50, opacity: 0, duration: 0.5 })  // plays after el1
  .from(".el3", { x: -30, opacity: 0, duration: 0.4 }); // plays after el2

// Position parameter — control timing precisely
tl.from(".a", { y: 50, duration: 0.5 })
  .from(".b", { y: 50, duration: 0.5 }, "-=0.3")  // start 0.3s before previous ends
  .from(".c", { y: 50, duration: 0.5 }, "+=0.2")  // start 0.2s after previous ends
  .from(".d", { y: 50, duration: 0.5 }, "<")       // start at same time as previous
  .from(".e", { y: 50, duration: 0.5 }, "<0.1")    // 0.1s after previous START
  .from(".f", { y: 50, duration: 0.5 }, "1.5")     // at absolute time 1.5s
  .from(".g", { y: 50, duration: 0.5 }, "myLabel") // at a named label

// Labels
tl.addLabel("phase2", 1.0);
tl.from(".h", { opacity: 0 }, "phase2");

// Timeline defaults (apply to all children)
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.out" },
  repeat: -1,
  yoyo: true,
  delay: 1,
  paused: true,  // start paused, play manually
  onComplete: () => console.log("timeline done")
});

// Timeline control
tl.play();
tl.pause();
tl.reverse();
tl.restart();
tl.seek(1.5);       // jump to 1.5s
tl.seek("phase2");  // jump to label
tl.progress(0.5);   // jump to 50%
tl.timeScale(2);    // 2x speed
tl.kill();          // destroy
```

## Stagger

```javascript
// Simple stagger
gsap.from(".card", { y: 50, opacity: 0, stagger: 0.1 });

// Stagger config object
gsap.from(".card", {
  y: 50,
  opacity: 0,
  stagger: {
    amount: 1,        // total stagger time spread
    each: 0.1,        // time between each (use amount OR each)
    from: "start",    // "start" | "end" | "center" | "random" | index
    grid: "auto",     // for grid layouts: [rows, cols] or "auto"
    axis: "x",        // for grids: stagger along "x" or "y"
    ease: "power2.in" // ease the stagger distribution itself
  }
});
```

## ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);

// Basic scroll-triggered animation
gsap.from(".section", {
  scrollTrigger: {
    trigger: ".section",        // element that triggers
    start: "top 80%",           // "triggerEdge viewportEdge"
    end: "bottom 20%",          // when to end
    toggleActions: "play none none reverse",
    // play | pause | resume | reverse | restart | reset | complete | none
    // onEnter onLeave onEnterBack onLeaveBack
    markers: true,              // debug mode — shows start/end lines
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out"
});

// Scrub — animation tied to scroll position
gsap.to(".parallax", {
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    end: "bottom top",
    scrub: true,       // true = sync directly; number = lag seconds
    scrub: 1,          // 1 second lag for smooth feel
  },
  y: -150,
  ease: "none"         // always use "none" with scrub
});

// Pin an element while scrolling
gsap.to(".hero-content", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=500",      // pin for 500px of scroll
    pin: true,
    pinSpacing: true,
    scrub: 1
  },
  xPercent: -100,
  ease: "none"
});

// ScrollTrigger with Timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: 1,
    pin: true
  }
});
tl.from(".title", { y: 100, opacity: 0 })
  .from(".text",  { y: 50, opacity: 0 }, "-=0.3");

// Batch for many elements
ScrollTrigger.batch(".card", {
  onEnter: (elements) => gsap.from(elements, { y: 50, opacity: 0, stagger: 0.1 }),
  onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
  start: "top 85%"
});
```

## Useful Utilities

```javascript
// Selector — returns array (like querySelectorAll)
const els = gsap.utils.toArray(".card");

// Clamp, mapRange, interpolate
const clamp  = gsap.utils.clamp(0, 100);
const mapper = gsap.utils.mapRange(0, 1, 0, 500);
const lerp   = gsap.utils.interpolate(0, 1, 0.5); // 0.5

// Random
const rand = gsap.utils.random(0, 100);        // random number
const pick = gsap.utils.random(["a","b","c"]); // random from array

// Wrap
const wrap = gsap.utils.wrap(0, 5); // wraps values: 7 → 2

// Get current value
const x = gsap.getProperty(".box", "x");
const opacity = gsap.getProperty(".box", "opacity");

// Kill all animations on element
gsap.killTweensOf(".box");

// Kill all tweens globally
gsap.globalTimeline.clear();
```

## Text Animation (TextPlugin)

```javascript
gsap.registerPlugin(TextPlugin);
gsap.to(".el", {
  duration: 2,
  text: { value: "Hello World!", delimiter: "" },
  ease: "none"
});
```

## Flip Plugin (FLIP Technique)

```javascript
gsap.registerPlugin(Flip);

// Capture state BEFORE DOM change
const state = Flip.getState(".card");

// Make DOM changes (reorder, resize, move)
container.prepend(card);

// Animate FROM old position TO new
Flip.from(state, {
  duration: 0.6,
  ease: "power2.inOut",
  stagger: 0.08,
  absolute: true  // use position:absolute during animation
});
```

## Draggable

```javascript
gsap.registerPlugin(Draggable);

Draggable.create(".box", {
  type: "x,y",          // "x" | "y" | "x,y" | "rotation"
  bounds: ".container",  // constrain within element
  inertia: true,         // momentum on release (InertiaPlugin req.)
  snap: { x: [0, 100, 200] }, // snap to values
  onDrag: function() { console.log(this.x, this.y); },
  onDragEnd: function() { console.log("dropped"); }
});
```

## Common Full Page Animation Pattern

```javascript
// Page load sequence
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.from(".nav",      { y: -80, opacity: 0, duration: 0.6 })
    .from(".hero h1",  { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".hero p",   { y: 40, opacity: 0, duration: 0.6 }, "-=0.4")
    .from(".hero .cta",{ scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
    .from(".hero-img", { x: 60, opacity: 0, duration: 0.8 }, "-=0.6");
  
  // Scroll-triggered sections
  gsap.utils.toArray(".reveal-section").forEach(section => {
    gsap.from(section.querySelectorAll(".reveal-item"), {
      scrollTrigger: { trigger: section, start: "top 75%" },
      y: 50, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power2.out"
    });
  });
});
```
