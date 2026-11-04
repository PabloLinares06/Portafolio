# Script & Scene Timing Spec: Juan Pablo Linares (12.0s Commercial)

## Audio Track Pacing
- **Soundtrack:** Custom 132 BPM Cyber Synthesizer & Cinematic Sub-Impacts.
- **Duration:** 12.0 seconds exact.
- **Audio Cues:**
  - `0.0s`: Deep 38Hz sub-bass impact hit.
  - `1.8s - 2.2s`: Exponential noise sweep / whoosh riser into portal.
  - `2.2s`: Heavy kick & downbeat bass arrival.
  - `3.1s`: High-frequency laser cursor click.
  - `4.2s`: Sonic whoosh as NaTec V2 crosses higher Z plane.
  - `5.0s`: Terminal impact drop.
  - `5.7s, 6.0s, 6.3s`: Triple diagnostic snap transients with sub-pops.
  - `7.6s`: Cascading bento drop downbeat.
  - `8.35s`: Harmonic milestone shimmer.
  - `9.4s - 9.8s`: Pitch riser leading to whip pull-back.
  - `9.8s`: Massive sub-drop and radar ping.
  - `11.4s - 12.0s`: Smooth master fadeout tail.

---

## Scene by Scene Script & Visual Actions

### Beat 1: The Explosive Hook (0.0s - 2.2s)
- **Time:** `0.000s - 2.200s` (Frames 0 - 132)
- **On-Screen Copy:**
  - `AVAILABLE FOR WORK • 2026`
  - `JUAN PABLO LINARES`
  - `DISTRIBUTED SYSTEMS & NEXT-GEN INTERFACES`
- **Visual Action:**
  - `0.00s`: Glowing pill drops with `back.out(2.2)`.
  - `0.15s`: Giant chrome typography (92% width) reveals letter-by-letter (`power4.out`).
  - `0.50s`: Tracking expands smoothly from `0px` to `3px`.
  - `1.80s`: Camera accelerates aggressively to `translateZ: 1300, rotateX: 20, rotateY: -18`, passing through the letters.

### Beat 2: Macro 3D Component Showcase (2.2s - 5.0s)
- **Time:** `2.200s - 5.000s` (Frames 132 - 300)
- **On-Screen Copy:**
  - `FUELIX`
  - `Industrial IoT Telemetry Hub`
  - `RS-485 MODBUS • RASPBERRY PI 5 • 94.2% TANK 01`
  - `NATEC V2 — HIGH-FREQUENCY E-COMMERCE`
- **Visual Action:**
  - `2.20s`: Camera brakes at `translateZ: -80, rotateX: 26, rotateY: -16, rotateZ: 5`.
  - Fuelix mockup at `scale: 1.65` bleeds off bottom and right canvas borders.
  - Telemetry bar is elevated at `translateZ: 80px`.
  - `2.50s`: Neon cyber cursor sweeps across to telemetry card.
  - `3.10s`: Cursor clicks (`scale: 0.82`), card rebounds (`scale: 1.65`), data pulses vivid emerald `#10B981`.
  - `4.20s`: NaTec V2 layer crosses at `translateZ: 140px, rotateY: -28deg`.

### Beat 3: Edge Terminal & Diagnostic Execution (5.0s - 7.6s)
- **Time:** `5.000s - 7.600s` (Frames 300 - 456)
- **On-Screen Copy:**
  - `$ pablo-cli --diagnose-architecture`
  - `✔ Edge Telemetry: CONNECTED (RS-485 Modbus, 0ms drift)`
  - `✔ Next.js 15 App Router: Turbopack compile in 3.6s`
  - `✔ GSAP Kinetic Engine: 60 FPS Deterministic Timeline`
- **Visual Action:**
  - `5.00s`: Camera spins & pushes to `translateZ: 550, rotateY: 28, rotateX: -12`. Terminal entered at `scale: 1.3, rotateX: 14, rotateY: 10`.
  - `5.30s - 5.60s`: Supersonic command typing.
  - `5.70s, 6.00s, 6.30s`: Checkmark strikes with micro 3px screen shakes.
  - Glowing JSON telemetry node floating behind with ambient drift.

### Beat 4: Cascading Bento Grid Metrics (7.6s - 9.8s)
- **Time:** `7.600s - 9.800s` (Frames 456 - 588)
- **On-Screen Copy:**
  - `99.9%` — UPTIME INDUSTRIAL
  - `33+` — PANTALLAS EN VIVO
  - `100/100` — LIGHTHOUSE SCORE
  - `<8ms` — TELEMETRY LATENCY
- **Visual Action:**
  - `7.60s`: Fast vertical pan to `translateY: -750, rotateX: -18, rotateY: 6, translateZ: 50`.
  - 4 glass cards staggered across Z space (`0px, 45px, 90px, 130px`) with animated conic border glow.
  - Supersonic odometer counters surge from 0 in 0.75s (`power3.out`).

### Beat 5: Whip Pull-Back & Outro CTA (9.8s - 12.0s)
- **Time:** `9.800s - 12.000s` (Frames 588 - 720)
- **On-Screen Copy:**
  - `LET'S BUILD SOMETHING EXTRAORDINARY`
  - `pablolinares.tech`
  - `DISPONIBLE PARA PROYECTOS ->`
- **Visual Action:**
  - `9.80s`: Camera violently pulls back to `translateZ: -1300`.
  - Project ecosystem recedes into background with depth-of-field blur (`blur(14px)`, `opacity: 0.3`).
  - Foreground plane surges at `translateZ: 220px`.
  - Neon domain `pablolinares.tech` shines with metallic sweep.
  - CTA button pulses with continuous radar ripple waves.
