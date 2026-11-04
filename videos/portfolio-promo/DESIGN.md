# 3D Motion Graphics Design Spec: Juan Pablo Linares (12.0s Cinematic Master)

## 1. Technical Baseline & Architecture
- **Resolution:** 1080x1920 (Vertical 9:16 for TikTok / Reels / Shorts).
- **Framerate:** 60 FPS rock-solid.
- **Duration:** Exactly 12.0 seconds (720 frames @ 60 FPS).
- **Identity:** Juan Pablo Linares — Full Stack & Distributed Systems Architect.
- **Reference URL:** https://pablolinares.tech
- **Architecture:** Persistent 3D Virtual Camera Rig (`#camera-rig`) nested inside `#viewport` (`perspective: 1200px`, `transform-style: preserve-3d`).

---

## 2. Negative Constraints & Quality Guardrails
1. **NO Slideshows:** Zero 2D flat fade-in/fade-out slide switches. All scenes exist in a unified 3D spatial coordinate volume.
2. **NO Contained Full Cards with Padding:** All mockups render at macro scale (`scale: 1.4` to `2.2`), deliberately bleeding off-canvas to simulate cinematic anamorphic camera framing.
3. **NO Flat 2D Planes:** Every structural element is angled in 3D (`rotateX`, `rotateY`, `rotateZ`, `perspective`).
4. **NO Static Frames (0% Resting State):** Constant camera drift (`translateZ`, `rotateY`) and floating motion continuously engage the eye.
5. **NO Slow / Linear Eases:** Exclusive use of aggressive curves: `expo.out`, `power4.out`, `back.out(2.2)`, `power3.in`, `power4.inOut`.

---

## 3. Visual Tokens & Spatial Coordinate System
- **Viewport:** `#viewport` at 1080x1920, `#030508` dark void with continuous ambient mesh gradient (`rgba(16, 185, 129, 0.18)` and `rgba(56, 189, 248, 0.12)` blurred at 90px).
- **Camera Coordinates per Beat:**
  - **Beat 1 (0.0s - 2.2s):** Camera starts at `translateZ: 0, rotateX: 0, rotateY: 0`. At 1.8s, accelerates to `translateZ: 1300, rotateX: 20, rotateY: -18` (whip portal zoom-through).
  - **Beat 2 (2.2s - 5.0s):** Camera lands at `translateZ: -80, rotateX: 26, rotateY: -16, rotateZ: 5`, drifting `rotateY: -=4, translateZ: +=60`. Fuelix scene anchored at `translateZ: -250` with macro scale 1.65. Telemetry decoupled at `translateZ: 80px`. NaTec V2 crosses at `translateZ: 140px, rotateY: -28deg`.
  - **Beat 3 (5.0s - 7.6s):** Camera spins & pushes to `translateZ: 550, rotateY: 28, rotateX: -12`. Terminal entered at `rotateX: 14deg, rotateY: 10deg, scale: 1.3`. Micro screen shakes (3px) on checks.
  - **Beat 4 (7.6s - 9.8s):** Camera pans to `translateY: -750, rotateX: -18, rotateY: 6, translateZ: 50`. 4 Bento cards on staggered Z planes (`0px, 45px, 90px, 130px`) with animated conic gradient borders and supersonic odometer counters.
  - **Beat 5 (9.8s - 12.0s):** Violent whip pull-back: camera retreats to `translateZ: -1300, rotateX: 0, rotateY: 0, translateY: 0`. Background blurs to 14px (`opacity: 0.3`). Foreground surges at `translateZ: 220px` with `pablolinares.tech` chrome shimmer and radar ripple CTA button.

---

## 4. Typography & Glass Tokens
- **Headlines:** Inter ExtraBold / Heavy 900 weight, pure white `#ffffff` with metallic silver sheen mask.
- **Telemetry & Terminal:** JetBrains Mono 500-700, Emerald neon `#10B981` and Cyan `#38BDF8`.
- **Glass Surfaces:** Technical dark glass `rgba(11, 15, 23, 0.75)`, `backdrop-filter: blur(24px)`, 1px iridescent gradient border, multi-tier ambient shadows `0 40px 100px rgba(0,0,0,0.85), 0 0 40px rgba(16,185,129,0.1)`.
