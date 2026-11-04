# Storyboard & Choreography: Juan Pablo Linares (12.0s 3D Commercial)

## Frame Rate: 60 FPS | Canvas: 1080 x 1920 (9:16)

```
0s (f0)        2.2s (f132)      5.0s (f300)      7.6s (f456)      9.8s (f588)      12.0s (f720)
|----------------|----------------|----------------|----------------|----------------|
  BEAT 1: HOOK     BEAT 2: FUELIX   BEAT 3: TERMINAL BEAT 4: BENTO    BEAT 5: OUTRO
  Typo & Portal    Macro 3D Click   CLI Diagnostics  Z-Depth Metrics  Whip Pull-Back
```

---

### Beat 1: The Explosive Hook (Frames 0 - 132 | 0.0s - 2.2s)
- **Camera Rig:**
  - `0.0s`: `translateZ: 0, rotateX: 0, rotateY: 0, translateY: 0`
  - `1.8s - 2.2s`: Rapid whip forward to `translateZ: 1300, rotateX: 20, rotateY: -18` (`ease: 'power3.in'`).
- **Scene Elements:**
  - Status Pill: `y: -100, scale: 0.8` -> `y: 0, scale: 1` (`back.out(2.2)`) at `0.0s - 0.35s`.
  - Name: "JUAN PABLO LINARES" (92% canvas width) revealed letter-by-letter (`power4.out`, stagger 0.03s). Diagonal silver sheen sweep from `xPercent: -150%` to `150%`.
  - Subtitle: "DISTRIBUTED SYSTEMS & NEXT-GEN INTERFACES", tracking expands `0px` to `3px`.
- **Exit:** Rig zooms into the letterforms, blurring edges and dissolving into Beat 2.

---

### Beat 2: Macro 3D Component Showcase (Frames 132 - 300 | 2.2s - 5.0s)
- **Camera Rig:**
  - `2.2s`: Snaps to `translateZ: -80, rotateX: 26, rotateY: -16, rotateZ: 5` (`ease: 'power4.out', duration: 0.5s`).
  - `2.2s - 5.0s`: Continuous subtle drift: `rotateY: '-=4', translateZ: '+=60'`.
- **Scene Elements:**
  - Fuelix Card: Anchored at `translateZ: -250px`, rendered at `scale: 1.65`, cropped off right and bottom canvas borders.
  - Telemetry Pill & Gauge: Elevated on separated plane at `translateZ: 80px`.
  - Cyber Cursor: `2.5s` enters at speed, tracks to telemetry button.
  - Click Event: `3.1s` cursor scales down (`0.82`), card rebounds (`scale: 1.62 -> 1.65`), data pulses bright emerald `#10B981`.
  - Layer Crossing: `4.2s` NaTec V2 card streaks across in foreground (`translateZ: 140px, rotateY: -28deg`).
- **Exit:** Overlapped camera rotation directly into Beat 3.

---

### Beat 3: Edge Terminal & Diagnostic Execution (Frames 300 - 456 | 5.0s - 7.6s)
- **Camera Rig:**
  - `5.0s`: Spatially shifts to `translateZ: 550, rotateY: 28, rotateX: -12` (`ease: 'expo.inOut', duration: 0.38s`).
- **Scene Elements:**
  - Terminal Window: Positioned in 3D (`rotateX: 14deg, rotateY: 10deg, scale: 1.3`), dark glass container with glowing border.
  - Command Line: `$ pablo-cli --diagnose-architecture` types character-by-character (5.3s - 5.6s).
  - Diagnostic Strikes (5.7s, 6.0s, 6.3s):
    - `✔ Edge Telemetry: CONNECTED (RS-485 Modbus, 0ms drift)`
    - `✔ Next.js 15 App Router: Turbopack compile in 3.6s`
    - `✔ GSAP Kinetic Engine: 60 FPS Deterministic Timeline`
    - Micro screen shake (`x: +=3px, y: -=2px`, 0.07s) on each hit.
  - Floating JSON node in background with continuous slow yaw.

---

### Beat 4: Cascading Bento Grid Metrics (Frames 456 - 588 | 7.6s - 9.8s)
- **Camera Rig:**
  - `7.6s`: Fast vertical pan to `translateY: -750, rotateX: -18, rotateY: 6, translateZ: 50` (`ease: 'power4.inOut', duration: 0.42s`).
- **Scene Elements:**
  - Bento Layout: 4 distinct cards distributed across deep Z space:
    - Card 1 (Uptime 99.9%): `translateZ: 0px`
    - Card 2 (Screens 33+): `translateZ: 45px`
    - Card 3 (Lighthouse 100/100): `translateZ: 90px`
    - Card 4 (Latency <8ms): `translateZ: 130px`
  - Conic Border Beam: High-speed rotation of edge glow.
  - Counters: Odometer numbers count up from 0 with `power3.out` in 0.75s.

---

### Beat 5: Whip Pull-Back & Outro CTA (Frames 588 - 720 | 9.8s - 12.0s)
- **Camera Rig:**
  - `9.8s`: Violent whip pull-back: retreats to `translateZ: -1300, rotateX: 0, rotateY: 0, translateY: 0` (`ease: 'expo.out', duration: 0.5s`).
- **Scene Elements:**
  - Background Ecosystem: The prior 3D stages retreat into a tiny glowing cluster at the center back, blurred to `blur(14px)` with `opacity: 0.3`.
  - Foreground Hero Plate (`translateZ: 220px`):
    - Header: `"LET'S BUILD SOMETHING EXTRAORDINARY"` (`scale: 0.9 -> 1.0`, fade in).
    - Domain: `pablolinares.tech` in bright neon cyan/emerald with metallic sheen shimmer.
    - CTA Button: `DISPONIBLE PARA PROYECTOS ->` surrounded by expanding radar pulse concentric rings.
