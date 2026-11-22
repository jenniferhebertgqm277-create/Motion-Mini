# CSS Animation Complete Reference

## @keyframes Syntax

```css
@keyframes name {
  0%   { /* from state */ }
  50%  { /* midpoint */   }
  100% { /* to state */   }
}

/* Shorthand */
@keyframes name {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

## animation Shorthand

```css
.el {
  animation:
    name           /* @keyframes name */
    duration       /* 0.4s, 400ms */
    easing         /* ease, linear, cubic-bezier(...), steps(n) */
    delay          /* 0s, 100ms */
    iteration      /* 1, infinite, 3 */
    direction      /* normal, reverse, alternate, alternate-reverse */
    fill-mode      /* none, forwards, backwards, both */
    play-state;    /* running, paused */
}

/* Multiple animations */
animation: fadeIn 0.3s ease both, slideUp 0.5s ease 0.1s both;
```

## Easing Functions

### Named Easings
```css
ease          /* cubic-bezier(0.25, 0.1, 0.25, 1)   — default */
ease-in       /* cubic-bezier(0.42, 0, 1, 1)         — accelerate */
ease-out      /* cubic-bezier(0, 0, 0.58, 1)         — decelerate */
ease-in-out   /* cubic-bezier(0.42, 0, 0.58, 1)      — both */
linear        /* constant speed — use only for loops */
```

### Custom Cubic Bezier (use https://cubic-bezier.com)
```css
/* Snap out (Material You feel) */    cubic-bezier(0.16, 1, 0.3, 1)
/* Overshoot spring */                cubic-bezier(0.34, 1.56, 0.64, 1)
/* Smooth decelerate */               cubic-bezier(0.25, 0.46, 0.45, 0.94)
/* Dramatic accelerate-then-stop */   cubic-bezier(0.7, 0, 0.84, 0)
/* Anticipation (slight back) */      cubic-bezier(0.68, -0.55, 0.265, 1.55)
/* Expo ease out */                   cubic-bezier(0.19, 1, 0.22, 1)
```

### Steps (Pixel/Retro)
```css
steps(4)              /* 4 discrete jumps */
steps(4, end)         /* jump at end of each interval */
steps(4, start)       /* jump at start of each interval */
steps(1, end)         /* one jump — toggle effect */
```

## transform Functions (Only animate these for 60fps)

```css
/* Translation */
transform: translate(x, y);
transform: translateX(100px);
transform: translateY(-50%);
transform: translate3d(x, y, z);  /* triggers GPU layer */

/* Scale */
transform: scale(1.2);
transform: scale(1.1, 0.9);       /* squash and stretch */

/* Rotation */
transform: rotate(45deg);
transform: rotateX(90deg);        /* 3D flip */
transform: rotate3d(1, 1, 0, 45deg);

/* Skew */
transform: skewX(10deg);

/* Combined — right-to-left order */
transform: translateY(-20px) scale(1.1) rotate(5deg);

/* Transform origin */
transform-origin: center;         /* default */
transform-origin: top left;
transform-origin: 50% 100%;       /* bottom center — for grow from bottom */
```

## Useful Keyframe Patterns

### Fade In Up
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Fade In Scale
```css
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.8); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
```

### Shake / Error
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-10px); }
  40%       { transform: translateX(10px); }
  60%       { transform: translateX(-6px); }
  80%       { transform: translateX(6px); }
}
```

### Pulse / Heartbeat
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
}
.el { animation: pulse 1.5s ease-in-out infinite; }
```

### Bounce
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0);    animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50%       { transform: translateY(-25px); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
}
```

### Spin
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner { animation: spin 1s linear infinite; }
```

### Float (Gentle Up-Down)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-15px); }
}
.floating { animation: float 3s ease-in-out infinite; }
```

### Typewriter
```css
@keyframes typing {
  from { width: 0; }
  to   { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  width: fit-content;
  animation: typing 3s steps(30) forwards, blink 0.75s step-end infinite;
}
```

### Gradient Shift
```css
@property --gradient-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
@keyframes gradientRotate {
  to { --gradient-angle: 360deg; }
}
.gradient-bg {
  background: conic-gradient(from var(--gradient-angle), #6366f1, #ec4899, #f59e0b, #6366f1);
  animation: gradientRotate 4s linear infinite;
}
```

## Stagger with CSS Custom Properties

```html
<ul>
  <li style="--i: 0">Item 1</li>
  <li style="--i: 1">Item 2</li>
  <li style="--i: 2">Item 3</li>
</ul>
```
```css
li {
  animation: fadeInUp 0.5s ease both;
  animation-delay: calc(var(--i) * 80ms);
}
```

## CSS Transitions (For Interactive States)

```css
.btn {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease,
              background-color 0.15s ease;
}
.btn:hover  { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
.btn:active { transform: translateY(0) scale(0.97); }
```

## Scroll-Driven Animations (Modern CSS — Chrome 115+)

```css
/* Animate as user scrolls */
@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

/* Progress bar tied to scroll */
.progress-bar {
  transform-origin: left;
  animation: scaleX linear both;
  animation-timeline: scroll(root);
}
@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

## Clip-Path Animations

```css
/* Wipe reveal left-to-right */
@keyframes wipeIn {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

/* Circle reveal */
@keyframes circleReveal {
  from { clip-path: circle(0% at 50% 50%); }
  to   { clip-path: circle(150% at 50% 50%); }
}

/* Shapes: inset(), circle(), ellipse(), polygon() */
```

## Filter Animations

```css
/* Blur reveal */
@keyframes blurIn {
  from { filter: blur(20px); opacity: 0; }
  to   { filter: blur(0px);  opacity: 1; }
}

/* Neon glow pulse */
@keyframes neonPulse {
  0%, 100% { filter: drop-shadow(0 0 5px #6366f1) drop-shadow(0 0 10px #6366f1); }
  50%       { filter: drop-shadow(0 0 20px #6366f1) drop-shadow(0 0 40px #6366f1) drop-shadow(0 0 60px #6366f1); }
}
```

## Performance Checklist

- ✅ Animate only `transform`, `opacity`, `filter`
- ✅ Add `will-change: transform` for heavy animations
- ✅ Use `animation: ... both` to avoid flash of un-styled content
- ✅ Test with `@media (prefers-reduced-motion: reduce)` override
- ❌ Never animate `width`, `height`, `top`, `left`, `margin`
- ❌ Avoid `animation: all` — be explicit
- ❌ Don't apply `will-change` to every element
