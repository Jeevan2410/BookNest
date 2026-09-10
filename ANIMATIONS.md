# BookNest - Aardvark Book Club Animations Implementation

## Overview
This document details all the signature animations from Aardvark Book Club that have been implemented in BookNest.

## 1. Page Transition Animation
**Location**: `src/components/ui/PageTransition.tsx`

**Animation Sequence**:
- SVG path draws itself using stroke-dasharray/stroke-dashoffset
- Logo rotates in from 64deg at scale(0,0) with back easing
- Entire transition fades out after 1.5s

**Implementation**:
- Uses GSAP timeline for precise sequencing
- SVG path: `M66.858-19C57.597 196.452...` (signature Aardvark path)
- Logo: Custom BookNest mascot (aardvark-inspired)
- Duration: ~2s total

## 2. Hero Section Animations

### 2.1 Word Split Animation
**Element**: Hero title "Unbox stories worth talking about"

**Animation**:
- Each word wrapped in `.split-word` span with overflow hidden
- Words animate from `y: 110%` to `y: 0%`
- Stagger: 0.08s per word
- Duration: 0.9s per word
- Easing: `power3.out`
- Delay: 1.8s (after page transition)

### 2.2 Paragraph Fade In
**Element**: Hero paragraph text

**Animation**:
- Translates from `y: 1em` to `y: 0em`
- Fades from opacity 0 to 1
- Duration: 0.8s
- Delay: 2.3s
- Easing: `power3.out`

### 2.3 Button Animation
**Element**: "Log-in / Sign-up now" button

**Animation**:
- Translates from `y: 1em` to `y: 0em`
- Fades from opacity 0 to 1
- Duration: 0.8s
- Delay: 2.5s
- Easing: `power3.out`

### 2.4 Handwritten Text (Character-by-Character)
**Element**: "Shipping to the USA & Canada"

**Animation**:
- Each character wrapped in `.split-char` span
- Characters animate from:
  - `x: -0.25em, y: 0.5em, rotation: 22deg, opacity: 0`
  - To: `x: 0em, y: 0em, rotation: 0, opacity: 1`
- Stagger: 0.015s per character
- Duration: 0.4s per character
- Delay: 2.7s
- Easing: `power2.out`

### 2.5 Hero Visual Entrance
**Element**: Box illustration with -21deg rotation

**Animation**:
- Rotates from -21deg (maintains final rotation)
- Translates from `y: 50px` to `y: 0`
- Scales from 0.8 to 1
- Fades from opacity 0 to 1
- Duration: 1.2s
- Delay: 2s
- Easing: `power3.out`

### 2.6 Hero Background Clip-Path
**Element**: Yellow wave background

**Animation**:
- Clip-path animates from `ellipse(0% 0% at 100% 100%)`
- To: `ellipse(150% 130% at 100% 100%)`
- Duration: 1.5s
- Delay: 1.6s
- Easing: `power3.inOut`

## 3. Books Section Animations

### 3.1 Handwritten Text on Scroll
**Element**: "Discover hidden gems and buzzy new releases"

**Animation**:
- Same character-by-character animation as hero
- Triggered on scroll (ScrollTrigger)
- Start: `top 85%`
- Toggle: `play none none reverse`

### 3.2 Book Slider Entrance
**Element**: Book cards in horizontal slider

**Animation**:
- Cards animate from `y: 30%` to `y: 0%`
- Fade from opacity 0 to 1
- Stagger: 0.1s per card
- Duration: 0.8s per card
- Triggered on scroll
- Each card has unique rotation: `[2, -2.2, 2.2, -2.6, 2.8, -1.9]` degrees

### 3.3 Book Slider Drag
**Element**: Horizontal book slider

**Features**:
- Mouse drag to scroll (cursor changes to 'grab'/'grabbing')
- Smooth scroll with arrow buttons
- Hide scrollbar for clean look
- Cards maintain rotation during scroll

### 3.4 Book Card Hover Effects
**Element**: Individual book cards

**Animation**:
- Shadow increases on hover
- "Read more" CTA fades in (opacity 0 to 1)
- Smooth transition: 0.3s

## 4. How It Works Section

### 4.1 Cards Slide Up
**Element**: 4 step cards

**Animation**:
- Cards animate from `y: 150%` to `y: 0%`
- Maintain `rotation: 3.45deg` throughout
- Fade from opacity 0 to 1
- Stagger: 0.15s per card
- Duration: 1s per card
- Triggered on scroll
- Easing: `power3.out`

### 4.2 Handwritten Text on Scroll
**Element**: "Consider us your professional book curator"

**Animation**:
- Character-by-character with rotation
- Same animation as hero handwritten text
- Triggered on scroll

## 5. Genre Interaction Section

### 5.1 Genre List Hover
**Element**: Genre names (Horror, Science Fiction, etc.)

**Animation**:
- On hover: `x: 20px` (slide right)
- Duration: 0.3s
- Easing: `power2.out`
- On leave: returns to `x: 0`

### 5.2 Book Grid Switching
**Element**: Book cover grids (4 different grids)

**Animation**:
- When hovering genre, corresponding grid fades in
- Other grids fade out
- Scale from 0.9 to 1 on active grid
- Duration: 0.4s
- Easing: `power2.out`

## 6. Benefits Section

### 6.1 Labels Scale In with Rotation
**Element**: 5 benefit labels (Range of genres, Free shipping, etc.)

**Animation**:
- Start at `rotation: 16.3956deg, scale: 0, opacity: 0`
- Animate to final rotation: `[5, -3, 4, -5, 3]` degrees
- Scale to 1, opacity to 1
- Stagger: 0.12s per label
- Duration: 0.8s per label
- Easing: `back.out(1.7)` (bouncy effect)
- Triggered on scroll

### 6.2 Momentum Hover (3D Tilt)
**Element**: All benefit labels

**Animation**:
- On mouse move, labels tilt in 3D based on cursor position
- Calculates distance from cursor to each label
- Intensity decreases with distance (max 400px)
- RotateX and RotateY based on cursor position
- Duration: 0.4s
- Easing: `power2.out`
- On mouse leave: elastic return to 0 with `elastic.out(1, 0.5)`
- Transform perspective: 1000px

## 7. Easter Egg Mascot Pop-up

### 7.1 Mascot Button
**Element**: Aardvark-inspired mascot icon (bottom left/right)

**Features**:
- Clickable mascot button
- Hover: scale 1.1
- Smooth transition

### 7.2 Pop-up Overlay
**Element**: Sign-up prompt overlay

**Animation**:
- On click: scales from 0 to 1
- Rotates from -10deg to 0
- Fades from opacity 0 to 1
- Duration: 0.6s
- Easing: `back.out(1.7)`
- Includes mascot ears (SVG)
- On close: reverse animation

## 8. Smooth Scroll (Lenis)

**Implementation**: `src/hooks/useSmoothScroll.tsx`

**Features**:
- Buttery smooth scroll throughout page
- Duration: 1.2s
- Custom easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Touch multiplier: 2 (for mobile)
- Connected to GSAP ScrollTrigger
- Updates ScrollTrigger on scroll

## 9. Custom Button Animation

**Element**: "Join the Club" and other CTA buttons

**Animation**:
- Icon circle scales up on hover (1.1x)
- Smooth transition: 0.3s
- Custom arrow icon (Aardvark style)

## 10. Testimonials Section

**Element**: Testimonial cards

**Animation**:
- Cards have slight rotation: `[1, -1, 1]` degrees
- Static rotation for playful feel
- Shadow for depth

## Technical Implementation

### Libraries Used
- **GSAP**: Core animation library
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **Lenis**: Smooth scrolling library
- **React**: Component architecture
- **TypeScript**: Type safety

### Key Techniques
1. **Text Splitting**: Words and characters wrapped in spans for individual animation
2. **ScrollTrigger**: Animations triggered by scroll position
3. **Momentum Hover**: 3D tilt effect based on cursor position
4. **Stagger Animations**: Sequential animation of multiple elements
5. **Custom Easing**: Back, elastic, and power easing functions
6. **SVG Path Animation**: Stroke-dasharray for drawing effect
7. **Clip-path Animation**: Ellipse expansion for background reveal

### Performance Optimizations
- `will-change` property on animated elements
- Transform-based animations (GPU accelerated)
- Lazy loading for images
- Hide scrollbar for smooth slider
- Efficient event listeners with cleanup

## Color Palette (Aardvark-Inspired)
- Yellow: `#F9A220`
- Pink: `#FF6B9D`
- Periwinkle: `#8B9DC3`
- Olive: `#8B9A46`
- Cyan: `#4ECDC4`
- Orange: `#F26B22`
- Navy: `#00102C`
- Cream: `#FFF8E7`
- Ink: `#1A1A1A`

## Typography
- **Display**: Playfair Display (serif, bold/black weights)
- **Handwritten**: Caveat (cursive)
- **Body**: Inter (sans-serif)

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS transforms and animations
- SVG support
- ES6+ JavaScript

## Mobile Responsiveness
- All animations work on mobile
- Touch events for slider drag
- Reduced motion support via `prefers-reduced-motion`
- Responsive typography with clamp()
- Mobile-first approach

---

**Note**: All animations are designed to match the Aardvark Book Club website's signature style while maintaining original BookNest branding and content.
