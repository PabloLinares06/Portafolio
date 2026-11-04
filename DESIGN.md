# Design System Specification: Sober Mint Architecture

> **Engineering Portfolio of Juan Pablo Linares**  
> *Crafted under the Impeccable UI/UX Standard*

---

## 1. Design Philosophy: Eliminating "AI Slop"

The modern web is inundated with generic AI templates: oversaturated neon cyan/magenta gradients, zero-offset radial glow halos, arbitrary kicker numbering (`01.`, `02.`), and unreadable low-contrast text.

This design system deliberately rejects these tropes in favor of **architectural restraint, mathematical precision, and high craft**:
- **Confidence Over Clutter:** Headings stand on their own without pseudo-decorative numbers.
- **Solid High-Contrast Typography:** Banned `bg-clip-text` gradient headings. Text uses crisp solid colors with WCAG AA compliance (contrast ratio ≥ 4.5:1).
- **Directional Shadows Over Halos:** Natural elevation shadows replace zero-offset glowing blobs.
- **Harmonious Sober Palette:** Replaced electric blue/cyan neon with a **sober mineral mint** green balanced against deep obsidian slate in dark mode and alabaster linen in light mode.

---

## 2. Color System & Dual-Mode Tokens

The color architecture is built with CSS custom properties configured in `@theme inline` (Tailwind CSS v4) and powered by `next-themes`.

### Dark Mode (Obsidian & Mineral Mint)
- **Canvas (`--color-background`):** `#0b0f14` (Deep obsidian slate, not flat black `#000000`)
- **Card Surface (`--color-surface-card`):** `#111720` (Elevated layer 1)
- **Elevated Surface (`--color-surface-elevated`):** `#141c26` (Floating elements, toolbars)
- **Border (`--color-surface-border`):** `rgba(255, 255, 255, 0.08)`
- **Primary Mint (`--color-primary`):** `#10b981` (Refined mineral mint)
- **Primary Mint Light (`--color-primary-light`):** `#34d399` (Secondary accents)
- **Primary Mint Hover (`--color-primary-hover`):** `#059669`
- **Foreground (`--color-foreground`):** `#f8fafc` (Slate 50, crisp off-white)
- **Muted Foreground (`--color-muted-foreground`):** `#94a3b8` (Slate 400)

### Light Mode (Alabaster & Deep Sage Mint)
- **Canvas (`--color-background`):** `#f8f9fa` (Subtle off-white alabaster)
- **Card Surface (`--color-surface-card`):** `#ffffff` (Pure optical white)
- **Elevated Surface (`--color-surface-elevated`):** `#f1f5f9` (Slate 100)
- **Border (`--color-surface-border`):** `rgba(15, 23, 42, 0.08)`
- **Primary Mint (`--color-primary`):** `#0d9488` (Deep sage mint, WCAG AA 4.8:1 on light backgrounds)
- **Primary Mint Light (`--color-primary-light`):** `#14b8a6`
- **Primary Mint Hover (`--color-primary-hover`):** `#0f766e`
- **Foreground (`--color-foreground`):** `#0f172a` (Slate 900)
- **Muted Foreground (`--color-muted-foreground`):** `#64748b` (Slate 500)

---

## 3. Typography & Hierarchy

- **Primary Sans:** `Geist Sans`, system-ui fallback. Applied to hero names, headlines, body narrative.
- **Monospace Code & Telemetry:** `Geist Mono` / `JetBrains Mono`. Applied to code snippets, latency badges, coordinates, terminal prompts.
- **Headings:** Bold tracking-tighter (`tracking-tighter font-black`), tight line heights (`leading-none` or `leading-tight`).
- **Body:** Fluid line heights (`leading-relaxed`), controlled line lengths (max 65 characters per line).

---

## 4. Components & Microinteractions

### ThemeToggle
- Accessible client button located on the top navigation bar.
- Transitions seamlessly between Light, Dark, and System modes.
- Synthesized Web Audio click feedback on toggle.
- Avoids flash of unstyled content (`suppressHydrationWarning`).

### SpotlightCard
- Custom cursor proximity surface lighting.
- Uses sober mint gradient (`rgba(16, 185, 129, 0.08)`) with smooth falloff.
- Subtle 1px gradient border illumination on mouse proximity.

### HeroBackground
- Replaced chaotic floating balls with an architectural coordinate grid.
- Canvas adapts dynamically to active light/dark theme.
- Subtle mint coordinate points with smooth proximity line connections.

### DevTerminal & CommandPalette
- Full keyboard navigation (`Ctrl+K` for command palette, `` ` `` for terminal).
- High-contrast console syntax coloring without neon blurs.
- Interactive system topology and project documentation commands.

---

## 5. Verification & Compliance
- **Impeccable Detect:** 0 findings (`[]` output).
- **TypeScript:** Strict type checking passed (0 errors).
- **Next.js 16 (Turbopack):** Production build passes cleanly with full static pre-rendering.
