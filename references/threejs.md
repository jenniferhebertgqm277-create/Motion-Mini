# Three.js Complete Reference

## Setup Options

### CDN (ES Modules)
```html
<!DOCTYPE html>
<html>
<head><style>* { margin: 0; } canvas { display: block; }</style></head>
<body>
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.169/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.169/examples/jsm/"
  }
}
</script>
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Your code here
</script>
</body>
</html>
```

### NPM
```bash
npm install three
```
```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

## Scene Setup Template

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Core
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Renderer config
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;    // smooth inertia
controls.dampingFactor = 0.05;

// Camera position
camera.position.set(0, 2, 5);
controls.target.set(0, 0, 0);

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  const delta   = clock.getDelta();
  
  controls.update();
  renderer.render(scene, camera);
}
animate();
```

## Cameras

```javascript
// Perspective (most common — FOV, aspect, near, far)
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

// Orthographic (no perspective distortion — good for 2D/flat)
const camera = new THREE.OrthographicCamera(
  -innerWidth/2, innerWidth/2,  // left, right
  innerHeight/2, -innerHeight/2, // top, bottom
  0.1, 1000
);

// Camera movement
camera.position.set(x, y, z);
camera.lookAt(0, 0, 0);
camera.lookAt(mesh.position);

// Animate camera on a path
camera.position.lerpVectors(startPos, endPos, t); // linear interpolate
```

## Geometries

```javascript
// Primitives
new THREE.BoxGeometry(w, h, d, wSegs, hSegs, dSegs)
new THREE.SphereGeometry(r, widthSegs, heightSegs)  // 32,16 for smooth
new THREE.PlaneGeometry(w, h, wSegs, hSegs)
new THREE.CylinderGeometry(rTop, rBottom, h, radialSegs)
new THREE.TorusGeometry(r, tube, radialSegs, tubularSegs)
new THREE.TorusKnotGeometry(r, tube, tubularSegs, radialSegs, p, q)
new THREE.ConeGeometry(r, h, radialSegs)
new THREE.IcosahedronGeometry(r, detail)  // geodesic sphere
new THREE.TetrahedronGeometry(r)
new THREE.OctahedronGeometry(r)
new THREE.RingGeometry(innerR, outerR, thetaSegs)

// Custom BufferGeometry
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0,   // vertex 1
  1, 0, 0,   // vertex 2
  0, 1, 0    // vertex 3
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.computeVertexNormals();
```

## Materials

```javascript
// MeshBasicMaterial — no lighting needed
new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: false })

// MeshStandardMaterial — PBR (physically based) — most used
new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  roughness: 0.4,       // 0 = mirror, 1 = matte
  metalness: 0.8,       // 0 = plastic, 1 = metal
  map: texture,         // albedo texture
  normalMap: normalTex, // surface detail
  roughnessMap: roughTex,
  metalnessMap: metalTex,
  emissive: 0xff0000,   // self-illumination
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
  envMap: envTexture,   // reflection
  envMapIntensity: 1
})

// MeshPhysicalMaterial — extends Standard with more PBR
new THREE.MeshPhysicalMaterial({
  ...standardProps,
  clearcoat: 1,           // car paint clear coat
  clearcoatRoughness: 0.1,
  transmission: 1,        // glass transparency
  ior: 1.5,               // index of refraction
  thickness: 0.5,         // glass thickness
  iridescence: 1,         // soap bubble effect
  iridescenceIOR: 1.3
})

// MeshToonMaterial — cartoon/cel shading
new THREE.MeshToonMaterial({ color: 0x6366f1 })

// ShaderMaterial — custom GLSL
new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x6366f1) } },
  vertexShader: `...GLSL...`,
  fragmentShader: `...GLSL...`,
})

// PointsMaterial — for particle systems
new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, sizeAttenuation: true })
```

## Lighting

```javascript
// Ambient — uniform light from everywhere
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Directional — parallel rays like the sun
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width  = 2048; // shadow quality
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

// Point — omnidirectional like a bulb
const pointLight = new THREE.PointLight(0xff6600, 2, 100);
pointLight.position.set(2, 3, 2);
scene.add(pointLight);

// Spot — cone of light
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.2;   // soft edge
spotLight.castShadow = true;
scene.add(spotLight);

// RectAreaLight — area light (soft shadows)
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
const rectLight = new THREE.RectAreaLight(0xff0040, 2, 4, 2);
rectLight.position.set(0, 2, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
```

## Textures

```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load('/path/to/texture.jpg', (tex) => {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
});

// Procedural texture with Canvas
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 512;
const ctx = canvas.getContext('2d');
// ... draw on ctx ...
const texture = new THREE.CanvasTexture(canvas);

// Environment map (reflections/IBL)
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
new RGBELoader().load('env.hdr', (hdr) => {
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdr;  // global IBL
  scene.background  = hdr;  // show as background
});
```

## Loading 3D Models

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('/model.glb', (gltf) => {
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(model);
  
  // Animations
  const mixer = new THREE.AnimationMixer(model);
  gltf.animations.forEach(clip => mixer.clipAction(clip).play());
  
  // Update in loop
  function animate() {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  }
  animate();
});
```

## Custom GLSL Shaders

```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(innerWidth, innerHeight) },
    uMouse:      { value: new THREE.Vector2() },
    uColor:      { value: new THREE.Color(0x6366f1) },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Wave displacement
      vec3 pos = position;
      pos.z += sin(pos.x * 3.0 + uTime) * 0.1;
      pos.z += sin(pos.y * 2.0 + uTime * 0.8) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      // Fresnel effect (rim lighting)
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
      
      vec3 color = mix(uColor, vec3(1.0), fresnel * 0.5);
      
      // Gradient
      color = mix(uColor, vec3(1.0, 0.5, 0.0), vUv.y);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

// Update time uniform in loop
mesh.material.uniforms.uTime.value = clock.getElapsedTime();
```

## Particle System

```javascript
const count = 10000;
const positions = new Float32Array(count * 3);
const colors    = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  // Random sphere distribution
  const r = Math.random() * 5;
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  
  positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
  positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i*3+2] = r * Math.cos(phi);
  
  colors[i*3]   = Math.random();
  colors[i*3+1] = Math.random();
  colors[i*3+2] = Math.random();
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.05,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  alphaMap: particleTexture,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate — rotate particles
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y = clock.getElapsedTime() * 0.05;
  renderer.render(scene, camera);
}
```

## Post-Processing Effects

```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }     from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { GlitchPass }     from 'three/addons/postprocessing/GlitchPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom (glow effect)
const bloom = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  1.5,  // strength
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloom);

// Glitch
composer.addPass(new GlitchPass());

// Use composer instead of renderer in loop
composer.render(); // instead of renderer.render(scene, camera)
```

## Animation Tips

```javascript
// Animate with clock.getElapsedTime()
function animate() {
  const t = clock.getElapsedTime();
  
  // Oscillation
  mesh.position.y = Math.sin(t) * 0.5;
  mesh.rotation.y = t * 0.5;
  
  // Figure-8 path
  mesh.position.x = Math.sin(t) * 2;
  mesh.position.z = Math.sin(t * 2) * 1;
  
  // Pulsing scale
  const s = 1 + Math.sin(t * 2) * 0.1;
  mesh.scale.set(s, s, s);
  
  // Color cycle
  const hue = (t * 0.1) % 1;
  mesh.material.color.setHSL(hue, 0.8, 0.5);
}

// Smooth camera follow
camera.position.lerp(targetPosition, 0.05); // 5% each frame = smooth
camera.lookAt(mesh.position);

// GSAP with Three.js
import gsap from 'gsap';
gsap.to(mesh.rotation, { y: Math.PI * 2, duration: 2, ease: "power2.inOut" });
gsap.to(mesh.position, { y: 2, duration: 1, ease: "bounce.out" });
gsap.to(camera.position, { z: 3, duration: 1.5, ease: "expo.inOut" });
```

---

## 🎬 Making a VIDEO instead of an interactive scene?
Use the config-driven engine: `examples/3d-video-template.html` and read `references/video-3d-pipeline.md`
(storyboard, camera splines, 3-point lighting, deterministic `renderAt(t)`, MP4/GIF export).
