# p5.js Creative Coding Reference

## Setup

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.0/p5.min.js"></script>
```

```javascript
// Global mode — setup() and draw() are global functions
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Runs once
}

function draw() {
  // Runs at ~60fps
  background(0); // clear each frame
}

// Responsive canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## Color Modes

```javascript
// RGB (default) — 0-255
colorMode(RGB, 255);
fill(255, 100, 50, 200); // r,g,b,alpha

// HSB (Hue-Saturation-Brightness) — great for animations
colorMode(HSB, 360, 100, 100, 1);
fill(220, 80, 100, 0.8); // h,s,b,alpha

// HSL
colorMode(HSL, 360, 100, 100, 1);
```

## Drawing Functions

```javascript
// Background
background(0);            // black
background(255);          // white
background(0, 0, 10, 0.05); // semi-transparent (trails effect!)

// No stroke / fill
noFill();
noStroke();

// Shapes
ellipse(x, y, w, h);     // circle when w==h
circle(x, y, d);
rect(x, y, w, h, r);     // r = corner radius
square(x, y, s, r);
triangle(x1,y1, x2,y2, x3,y3);
line(x1, y1, x2, y2);
point(x, y);
quad(x1,y1, x2,y2, x3,y3, x4,y4);
arc(x, y, w, h, start, stop, mode); // PIE | CHORD | OPEN

// Custom shapes
beginShape();
vertex(x, y);
curveVertex(x, y);        // smooth curve through points
bezierVertex(cp1x,cp1y, cp2x,cp2y, x,y); // bezier control points
endShape(CLOSE);
```

## Math & Noise

```javascript
// Built-in math
sin(angle);  cos(angle);  tan(angle);
atan2(y, x);              // angle from origin to point
dist(x1,y1, x2,y2);      // distance between points
lerp(a, b, t);            // linear interpolate: 0=a, 1=b, 0.5=midpoint
map(val, inMin, inMax, outMin, outMax);  // remap value to new range
constrain(val, min, max); // clamp
abs(n); floor(n); ceil(n); round(n); sqrt(n); pow(n, e);

// Noise (Perlin noise — smooth random)
// range 0-1, coherent (neighboring values similar)
noise(x);           // 1D noise
noise(x, y);        // 2D noise (great for textures)
noise(x, y, z);     // 3D noise (animate z to evolve 2D field)
noiseSeed(seed);    // reproducible noise
noiseDetail(octaves, falloff); // octaves=4-8, falloff=0.5 default

// Random
random(max);        // 0 to max
random(min, max);   // min to max
random([arr]);      // random element from array
randomSeed(seed);   // reproducible random

// Angle constants
PI; TWO_PI; HALF_PI; QUARTER_PI; TAU; // TAU = TWO_PI
```

## Transformations

```javascript
// Always use push/pop to scope transforms!
push();
  translate(x, y);    // move origin
  rotate(angle);      // rotate (radians)
  scale(sx, sy);      // scale
  // draw here — transforms apply
pop();

// Angle mode
angleMode(RADIANS); // default
angleMode(DEGREES); // use degrees for rotate(), etc.
```

## Animation Patterns

### Time-Based Animation
```javascript
let t = 0;

function draw() {
  t += 0.02; // control speed here
  
  const x = width/2  + cos(t) * 200;
  const y = height/2 + sin(t) * 200;
  
  ellipse(x, y, 20, 20);
}

// Smoother: use millis() / 1000 as time
const t = millis() / 1000;
```

### Trails Effect
```javascript
function draw() {
  // Semi-transparent background = trails
  background(0, 20); // black with alpha 20/255
  // OR in HSB mode:
  background(0, 0, 0, 0.05);
  
  // Draw your thing...
}
```

### Particle System
```javascript
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0.1); // gravity
    this.life = 255;
    this.size = random(5, 15);
    this.hue  = random(360);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life -= 3;
  }
  
  draw() {
    colorMode(HSB);
    noStroke();
    fill(this.hue, 80, 100, this.life / 255);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  isDead() { return this.life <= 0; }
}

let particles = [];

function draw() {
  background(0, 10);
  
  // Spawn
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
  
  // Update + draw + remove dead
  particles = particles.filter(p => !p.isDead());
  particles.forEach(p => { p.update(); p.draw(); });
}
```

### Flow Field (Vector Field)
```javascript
let field = [];
const scale = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  
  // Build flow field from noise
  for (let x = 0; x < width; x += scale) {
    for (let y = 0; y < height; y += scale) {
      const angle = noise(x * 0.003, y * 0.003) * TWO_PI * 2;
      field.push({ x, y, angle });
    }
  }
}

function draw() {
  // Draw flow field particles following vectors
  for (const f of field) {
    push();
    translate(f.x, f.y);
    rotate(f.angle);
    stroke(map(f.angle, 0, TWO_PI*2, 0, 360), 80, 100, 0.5);
    strokeWeight(1.5);
    line(0, 0, scale * 0.8, 0);
    pop();
  }
}
```

### Lissajous Curves
```javascript
function draw() {
  background(10, 10);
  stroke(220, 80, 100, 0.8);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let i = 0; i <= 360; i++) {
    const a = radians(i);
    const t = millis() / 2000;
    const x = width/2  + cos(3 * a + t) * 200;
    const y = height/2 + sin(2 * a)     * 200;
    vertex(x, y);
  }
  endShape();
}
```

### Metaballs
```javascript
let blobs = [];

function setup() {
  createCanvas(400, 400);
  blobs = Array.from({ length: 5 }, () => ({
    x: random(width), y: random(height),
    vx: random(-2, 2), vy: random(-2, 2),
    r: random(50, 100)
  }));
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (const b of blobs) {
        const d = dist(x, y, b.x, b.y);
        sum += b.r * b.r / (d * d + 0.01);
      }
      const c = sum > 100 ? 255 : 0;
      const i = (x + y * width) * 4;
      pixels[i] = c * 0.4;      // R
      pixels[i+1] = c * 0.6;    // G
      pixels[i+2] = c;           // B
      pixels[i+3] = 255;         // A
    }
  }
  updatePixels();
  
  // Move blobs
  for (const b of blobs) {
    b.x += b.vx; b.y += b.vy;
    if (b.x < 0 || b.x > width)  b.vx *= -1;
    if (b.y < 0 || b.y > height) b.vy *= -1;
  }
}
```

## Mouse & Keyboard Interaction

```javascript
// Mouse state
mouseX; mouseY;         // current position
pmouseX; pmouseY;       // previous position (for velocity)
mouseIsPressed;         // boolean
mouseButton;            // LEFT | RIGHT | CENTER

// Mouse events
function mousePressed()  { /* on click */ }
function mouseReleased() { /* on release */ }
function mouseMoved()    { /* on move */ }
function mouseDragged()  { /* on drag */ }

// Keyboard
keyIsDown(65);          // is 'A' held?
keyIsDown(LEFT_ARROW);  // arrow keys
key;                    // last pressed key char
keyCode;                // last key code

function keyPressed()   { if (key === ' ') { /* space */ } }
```

## 3D (WEBGL Mode)

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // In WEBGL: origin is center of canvas
}

function draw() {
  background(0);
  
  // Lighting
  ambientLight(50);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  pointLight(255, 100, 0, 0, -100, 100);
  
  // Materials
  ambientMaterial(100, 100, 255);
  specularMaterial(255);
  shininess(50);
  noFill(); stroke(255); // wireframe
  
  // 3D Shapes
  box(w, h, d);
  sphere(r, detail);
  cylinder(r, h);
  cone(r, h);
  torus(r, tubeR);
  
  // 3D transform
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
}
```
