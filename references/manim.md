# Manim Python Animation Reference

## Installation

```bash
# Full installation
pip install manim

# System dependencies (Windows)
# Install MiKTeX: https://miktex.org/download
# Install ffmpeg: https://ffmpeg.org/download.html

# Render commands
manim -pql scene.py SceneName   # preview, low quality (480p15)
manim -pqm scene.py SceneName   # preview, medium quality (720p30)
manim -pqh scene.py SceneName   # preview, high quality (1080p60)
manim -pqk scene.py SceneName   # 4K quality
manim -s   scene.py SceneName   # save last frame only (PNG)
manim --format gif scene.py SceneName  # output as GIF
```

## Scene Structure

```python
from manim import *

class MyScene(Scene):
    def construct(self):
        # All animation code goes here
        # self.play()  — plays animations
        # self.wait()  — pause
        # self.add()   — add without animating
        # self.remove() — remove without animating
        pass
```

## Mobjects (Math Objects)

### Geometric Shapes
```python
# Basic shapes
circle = Circle(radius=1.5, color=BLUE, fill_opacity=0.3, stroke_width=2)
square = Square(side_length=2, color=RED)
rect   = Rectangle(width=3, height=2, color=GREEN)
tri    = Triangle(color=YELLOW, fill_opacity=0.5)
ellip  = Ellipse(width=4, height=2, color=PURPLE)
poly   = RegularPolygon(n=6, radius=1.5, color=ORANGE)  # hexagon
star   = Star(n=5, outer_radius=1.5, color=GOLD)
dot    = Dot(point=ORIGIN, radius=0.1, color=WHITE)
line   = Line(LEFT * 2, RIGHT * 2, color=WHITE, stroke_width=2)
arrow  = Arrow(LEFT, RIGHT, color=YELLOW, buff=0.1)
arc    = Arc(radius=1, angle=PI, color=TEAL)
ann    = Annulus(inner_radius=0.5, outer_radius=1, color=BLUE)

# 3D shapes (use ThreeDScene)
sphere = Sphere(radius=1.5, color=BLUE)
cube   = Cube(side_length=2, fill_color=RED, fill_opacity=0.5)
cone   = Cone(base_radius=1, height=2, color=GREEN)
cyl    = Cylinder(radius=1, height=3, color=PURPLE)
torus  = Torus(major_radius=2, minor_radius=0.5, color=ORANGE)
```

### Text & Math
```python
# Regular text
text   = Text("Hello, World!", font_size=72, color=WHITE)
# Font options
text   = Text("Code", font="Courier New", weight=BOLD, slant=ITALIC)
# Gradient text
text   = Text("Rainbow", gradient=(RED, YELLOW, GREEN, BLUE))

# Markup text (HTML-like)
mtext  = MarkupText('<b>Bold</b> and <i>italic</i> and <span color="red">red</span>')

# LaTeX math
eq     = MathTex(r"E = mc^2", font_size=96, color=YELLOW)
# Multi-part LaTeX (each part can be colored separately)
eq     = MathTex(r"\int_0^\infty", r"e^{-x^2}", r"\, dx = \frac{\sqrt{\pi}}{2}")
eq[0].set_color(RED)   # first part
eq[1].set_color(BLUE)  # second part
eq[2].set_color(GREEN) # third part

# Full LaTeX block
tex    = Tex(r"This is \textbf{LaTeX} text with $x^2$")

# Code block
code   = Code("example.py", language="Python", font_size=24)
```

## Positioning & Layout

```python
# Absolute position
obj.move_to(ORIGIN)          # center
obj.move_to(UP * 2 + LEFT)  # 2 units up, 1 unit left
obj.move_to([1, 2, 0])      # x=1, y=2, z=0

# Relative to edges/directions
obj.to_edge(UP)              # top edge with margin
obj.to_edge(DOWN, buff=0.5)  # bottom with extra buffer
obj.to_corner(UL)            # upper left corner

# Relative to other objects
obj.next_to(other, RIGHT, buff=0.3)   # to the right of 'other'
obj.next_to(other, DOWN, buff=0.5)
obj.align_to(other, LEFT)   # align left edges

# Direction constants
ORIGIN = [0, 0, 0]
UP = [0, 1, 0];   DOWN = [0, -1, 0]
LEFT = [-1, 0, 0]; RIGHT = [1, 0, 0]
UL = UP + LEFT;    UR = UP + RIGHT
DL = DOWN + LEFT;  DR = DOWN + RIGHT

# Groups and VGroups
group = VGroup(circle, square, text)
group.arrange(RIGHT, buff=0.5)   # arrange side by side
group.arrange(DOWN, buff=0.3, aligned_edge=LEFT)
group.move_to(ORIGIN)
```

## Animation Methods

### Create/Build Animations
```python
self.play(Create(circle))          # draw outline then fill
self.play(Write(text))             # write text stroke by stroke
self.play(DrawBorderThenFill(sq))  # border first, then fill
self.play(FadeIn(obj))             # fade in
self.play(FadeIn(obj, shift=UP))   # fade in from bottom
self.play(GrowFromCenter(circle))  # grow from center point
self.play(GrowFromPoint(sq, point=LEFT * 3))
self.play(GrowArrow(arrow))
self.play(SpinInFromNothing(obj))
self.play(SpiralIn(group))
```

### Transform Animations
```python
self.play(Transform(circle, square))         # morph circle → square (keeps circle ref)
self.play(ReplacementTransform(a, b))        # transforms a into b (removes a)
self.play(TransformFromCopy(a, b))           # copy of a transforms to b (a stays)
self.play(ClockwiseTransform(a, b))          # rotates clockwise while transforming
self.play(CounterclockwiseTransform(a, b))

# Animate properties
self.play(circle.animate.set_color(RED))
self.play(circle.animate.scale(2))
self.play(circle.animate.shift(RIGHT * 2))
self.play(circle.animate.rotate(PI / 4))
self.play(circle.animate.set_fill(BLUE, opacity=0.5))
self.play(circle.animate.move_to(LEFT * 3).scale(0.5).set_color(YELLOW))
```

### Remove Animations
```python
self.play(FadeOut(obj))
self.play(FadeOut(obj, shift=DOWN))
self.play(Unwrite(text))
self.play(Uncreate(shape))
self.play(ShrinkToCenter(shape))
```

## Timing & Sequencing

```python
# Single animation with timing
self.play(Create(circle), run_time=2.0)

# Multiple simultaneous animations
self.play(
    Create(circle),
    Write(text),
    run_time=1.5
)

# Sequential with overlap (LaggedStart)
self.play(LaggedStart(
    FadeIn(a), FadeIn(b), FadeIn(c),
    lag_ratio=0.3,  # each starts 30% into the previous
    run_time=2
))

# Stagger a group
self.play(LaggedStart(*[FadeIn(item) for item in group], lag_ratio=0.15))

# Wait
self.wait(1.5)      # pause 1.5 seconds
self.wait()         # default 1 second

# Rate functions (easing)
from manim import rate_functions
self.play(Create(circle), rate_func=rate_functions.ease_in_out_cubic)
# Options: smooth, rush_into, rush_from, slow_into, there_and_back,
#          there_and_back_with_pause, running_start, overshoot,
#          wiggle, ease_in_out_cubic, linear
```

## Camera & Scene

```python
# Zoom / pan (default Scene)
self.camera.frame.animate.scale(0.5)                    # zoom in
self.camera.frame.animate.move_to(some_object.get_center())  # pan to object
self.camera.frame.animate.scale(2).move_to(ORIGIN)     # zoom out and center

# 3D Scene
class My3DScene(ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=70 * DEGREES, theta=-45 * DEGREES)
        
        axes = ThreeDAxes()
        self.add(axes)
        
        # Rotate camera
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(5)
        self.stop_ambient_camera_rotation()
        
        # Move camera
        self.move_camera(phi=90 * DEGREES, theta=0, run_time=2)
```

## Colors

```python
# Named colors
RED, ORANGE, YELLOW, GREEN, TEAL, BLUE, PURPLE, PINK, WHITE, BLACK, GRAY
# Variants: RED_A (lightest) through RED_E (darkest)
BLUE_A, BLUE_B, BLUE_C, BLUE_D, BLUE_E

# Hex colors
color = ManimColor("#6366f1")

# Color operations
interpolate_color(RED, BLUE, 0.5)   # midpoint color
color_gradient([RED, BLUE, GREEN], 10)  # list of 10 gradient colors

# Apply to objects
obj.set_color(RED)
obj.set_fill(BLUE, opacity=0.5)
obj.set_stroke(GREEN, width=3)
obj.set_color_by_gradient(RED, BLUE)  # gradient across object
```

## Full Example: Mathematical Visualization

```python
from manim import *

class FourierSeries(Scene):
    def construct(self):
        # Title
        title = Text("Fourier Series", font_size=72, gradient=(BLUE, PURPLE))
        self.play(Write(title), run_time=1.5)
        self.play(title.animate.scale(0.5).to_edge(UP))
        
        # Formula
        formula = MathTex(
            r"f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty}",
            r"\left( a_n \cos\frac{n\pi x}{L} + b_n \sin\frac{n\pi x}{L} \right)"
        )
        formula[0].set_color(BLUE)
        formula[1].set_color(TEAL)
        
        self.play(Write(formula), run_time=2.5)
        self.wait()
        
        # Transform to simpler form
        simple = MathTex(r"f(x) = \sum_{n=-\infty}^{\infty} c_n e^{in\pi x/L}", color=YELLOW)
        self.play(TransformMatchingTex(formula, simple), run_time=2)
        self.wait()
        
        # Create axes and plot
        axes = Axes(
            x_range=[-PI, PI, PI/2],
            y_range=[-2, 2, 0.5],
            x_length=8,
            y_length=4,
        ).shift(DOWN * 1.5)
        
        # Approximate with partial sums
        def fourier_approx(x, n_terms=5):
            return sum(
                4 / (PI * (2*k-1)) * np.sin((2*k-1) * x)
                for k in range(1, n_terms+1)
            )
        
        graph = axes.plot(lambda x: fourier_approx(x, 1), color=RED)
        self.play(FadeOut(simple), Create(axes), Create(graph))
        
        for n in [3, 5, 10, 20]:
            new_graph = axes.plot(lambda x: fourier_approx(x, n), color=BLUE)
            self.play(Transform(graph, new_graph), run_time=1)
            self.wait(0.5)
        
        self.wait(2)
```

## Common Patterns

### Animated Proof
```python
# Show equation steps
step1 = MathTex(r"(a+b)^2")
step2 = MathTex(r"(a+b)(a+b)")
step3 = MathTex(r"a^2 + ab + ba + b^2")
step4 = MathTex(r"a^2 + 2ab + b^2")

for step in [step1, step2, step3, step4]:
    step.move_to(ORIGIN)

self.play(Write(step1))
self.play(TransformMatchingTex(step1, step2))
self.play(TransformMatchingTex(step2, step3))
self.play(TransformMatchingTex(step3, step4))
```

### Highlight / Indicate
```python
self.play(Indicate(eq[1], color=RED, scale_factor=1.3))
self.play(Circumscribe(group, color=YELLOW, buff=0.2))
self.play(Flash(dot, color=YELLOW, num_lines=12, flash_radius=0.5))
self.play(ShowPassingFlash(line.copy().set_color(YELLOW), time_width=0.5))
self.play(Wiggle(obj, scale_value=1.2, rotation_angle=0.05*PI))
self.play(ApplyWave(text, amplitude=0.3))
```
