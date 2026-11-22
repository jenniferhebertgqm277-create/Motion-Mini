# Framer Motion Complete Reference

## Setup

```bash
npm install framer-motion
# React 18+ supported
```

## Core API

```jsx
import { motion, AnimatePresence, useScroll, useTransform,
         useSpring, useMotionValue, useAnimation, useInView } from "framer-motion";
```

## motion Components

```jsx
// Any HTML element: motion.div, motion.span, motion.button, motion.svg, etc.
// Any SVG element: motion.path, motion.circle, motion.rect, etc.

<motion.div
  // Initial state (before animation)
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  
  // Target animate state
  animate={{ opacity: 1, y: 0, scale: 1 }}
  
  // State on unmount (requires AnimatePresence parent)
  exit={{ opacity: 0, y: -20 }}
  
  // Transition config
  transition={{
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],           // custom bezier array
    // OR
    type: "spring",
    stiffness: 300,
    damping: 24,
    mass: 1,
    // OR
    type: "tween",
    ease: "easeOut",
  }}
  
  // Hover state
  whileHover={{ scale: 1.05, y: -4 }}
  
  // Tap/click state
  whileTap={{ scale: 0.95 }}
  
  // Focus state
  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99,102,241,0.5)" }}
  
  // Drag
  drag                            // "x" | "y" | true
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}               // how far past constraints
  whileDrag={{ scale: 1.1 }}
/>
```

## Transition Types

```jsx
// Tween (default)
transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}

// Spring — most natural for UI
transition={{ type: "spring", stiffness: 300, damping: 24 }}
// High stiffness = fast/snappy, High damping = no oscillation
// stiffness: 100 (slow spring) → 500 (fast snap)
// damping: 10 (bouncy) → 30 (no bounce)
// mass: 0.5 (light) → 2 (heavy)

// Inertia — for drag release
transition={{ type: "inertia", velocity: 100 }}

// Ease presets
ease: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut"
      | "backIn" | "backOut" | "anticipate"

// Custom bezier
ease: [0.16, 1, 0.3, 1]  // same format as CSS cubic-bezier x1,y1,x2,y2
```

## Variants — Orchestrating Complex Animations

```jsx
// Define variant sets
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",    // animate container first, then children
      staggerChildren: 0.1,      // delay between each child
      delayChildren: 0.2,        // initial delay before first child
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

// Use variants
function AnimatedList({ items }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      {items.map((item, i) => (
        <motion.li key={i} variants={item}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Hover variant
const card = {
  rest:  { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  hover: { scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
           transition: { type: "spring", stiffness: 400, damping: 17 } }
};
<motion.div variants={card} initial="rest" whileHover="hover">...</motion.div>
```

## AnimatePresence — Mount/Unmount Animations

```jsx
import { AnimatePresence } from "framer-motion";

// Wraps conditional renders — enables exit animations
function Tooltip({ show, text }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="tooltip"           // key required for AnimatePresence to track
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Page transitions
function PageTransition({ children, key }) {
  return (
    <AnimatePresence mode="wait"> {/* "sync" | "wait" | "popLayout" */}
      <motion.div
        key={key}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Scroll Animations

```jsx
// useScroll — track scroll progress
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="progress-bar" />;
}

// useTransform — map scroll to values
function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <section ref={ref}>
      <motion.div style={{ y, opacity }}>Parallax content</motion.div>
    </section>
  );
}

// useInView — trigger when element enters viewport
function RevealOnScroll({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

## Motion Values & Programmatic Control

```jsx
// useMotionValue — manually controlled value
function DragTracker() {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.3, 1, 0.3]);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  
  return (
    <motion.div drag="x" style={{ x, opacity, rotate }} dragSnapToOrigin>
      Drag me
    </motion.div>
  );
}

// useSpring — smooth spring physics on any value
const x = useMotionValue(0);
const springX = useSpring(x, { stiffness: 300, damping: 30 });

// useAnimation — programmatic control
function AnimatedButton() {
  const controls = useAnimation();
  
  const handleClick = async () => {
    await controls.start({ scale: 0.95, transition: { duration: 0.1 } });
    await controls.start({ scale: 1.05, transition: { duration: 0.15 } });
    await controls.start({ scale: 1,    transition: { type: "spring" } });
  };
  
  return (
    <motion.button animate={controls} onClick={handleClick}>
      Click me
    </motion.button>
  );
}
```

## SVG Animations

```jsx
// Path drawing animation
<motion.path
  d="M 0 0 L 100 100"
  stroke="#6366f1"
  strokeWidth={2}
  fill="none"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
/>

// SVG icon animation
<motion.svg viewBox="0 0 24 24" initial="hidden" animate="visible">
  <motion.path
    variants={{
      hidden: { pathLength: 0, opacity: 0 },
      visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
    }}
    d="M5 12h14M12 5l7 7-7 7"
    stroke="currentColor" fill="none" strokeLinecap="round"
  />
</motion.svg>
```

## Layout Animations (Automatic FLIP)

```jsx
// Add layout prop — Framer handles FLIP automatically!
<motion.div layout>
  {/* When this element changes size/position, it animates smoothly */}
</motion.div>

// Shared layout (animate between routes)
<motion.div layoutId="hero-card">
  <motion.h2 layoutId="hero-title">Title</motion.h2>
</motion.div>
// On another route/state with same layoutId — animates between them!

// Layout group
<LayoutGroup>
  {items.map(item => (
    <motion.li key={item.id} layout>{item.name}</motion.li>
  ))}
</LayoutGroup>
```

## Common Patterns

### Modal with AnimatePresence
```jsx
function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Staggered Card Grid
```jsx
const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};
const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,
             transition: { type: "spring", stiffness: 260, damping: 20 } }
};

<motion.div className="grid" variants={grid} initial="hidden" animate="visible">
  {items.map(i => <motion.div key={i} variants={card} className="card" />)}
</motion.div>
```

### Accordion
```jsx
function Accordion({ isOpen, children }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
```
