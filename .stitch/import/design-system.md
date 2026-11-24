---
name: Industrial Editorial Prepress
colors:
  surface: '#f7f9fe'
  surface-dim: '#d7dade'
  surface-bright: '#f7f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f8'
  surface-container: '#ebeef2'
  surface-container-high: '#e5e8ec'
  surface-container-highest: '#e0e3e7'
  on-surface: '#181c1f'
  on-surface-variant: '#3e484e'
  inverse-surface: '#2d3134'
  inverse-on-surface: '#eef1f5'
  outline: '#6e797e'
  outline-variant: '#bdc8ce'
  surface-tint: '#006684'
  primary: '#006480'
  on-primary: '#ffffff'
  primary-container: '#007ea1'
  on-primary-container: '#fbfdff'
  inverse-primary: '#6bd3fd'
  secondary: '#b0274e'
  on-secondary: '#ffffff'
  secondary-container: '#fe6386'
  on-secondary-container: '#670025'
  tertiary: '#6f5d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c7aa00'
  on-tertiary-container: '#4b3f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bde9ff'
  primary-fixed-dim: '#6bd3fd'
  on-primary-fixed: '#001f2a'
  on-primary-fixed-variant: '#004d64'
  secondary-fixed: '#ffd9de'
  secondary-fixed-dim: '#ffb2bd'
  on-secondary-fixed: '#400014'
  on-secondary-fixed-variant: '#8f0638'
  tertiary-fixed: '#ffe262'
  tertiary-fixed-dim: '#e7c500'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#534600'
  background: '#f7f9fe'
  on-background: '#181c1f'
  surface-variant: '#e0e3e7'
typography:
  display-lg:
    fontFamily: Times New Roman
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Times New Roman
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Times New Roman
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Times New Roman
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Times New Roman
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Times New Roman
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Times New Roman
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Times New Roman
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Times New Roman
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Times New Roman
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Times New Roman
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-tech:
    fontFamily: Times New Roman
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system blends heavy industrial printing machinery with authoritative editorial dignity. It is tailored for high-volume enterprise print brokerages, industrial press houses, and automated fulfillment networks. The atmosphere is that of an exacting, high-throughput operating system: clean, structured, calibrated, and rigorously functional.

The aesthetic fuses classic typography with technical prepress documentation. It treats every digital interface like an ultra-dense, precisely bounded imposition sheet ready for plate generation. Key motifs include:
- **Registration Crosshairs & Micro Marks:** Scaled 4-color CMYK registration strips, optical corner tick marks, and density targets integrated into panels, headers, and modals.
- **Dimensional Metric Annotations:** Explicit real-world units (`mm`, `GSM`, `dpi`, `pt`, `bleed: 3mm`) alongside standard UI metadata.
- **Double-Stroke Framing:** Fine engineering-grade double outlines evoking physical drafting tables and precision paper cutters.
- **Quiet Authority:** Times New Roman applied comprehensively across all typographic roles, transforming standard enterprise UI into a bespoke, literary-grade technical ledger.

## Colors

The palette is rooted in industrial prepress reality: a true subtractive print model (Cyan, Magenta, Yellow, Key/Black) mapped purposefully into an interactive digital workflow.

### Light Mode (Default Canvas)
- **Primary Canvas (`#FFFFFF` & `#F5F5F2`):** Base workspace and neutral background reminiscent of uncoated, high-brightness stock paper.
- **Card / Surface (`#FFFFFF`):** Crisp pure white containers bounded by mechanical borders.
- **Primary Text (`#191D20`):** Carbon black ink tone with extreme contrast and legibility.
- **Secondary / Supporting Text (`#686D70`):** Balanced graphite gray for metadata, unit tags, and field labels.
- **Structural Borders (`#D5D7D6`):** Machine-drawn hairline strokes for compartmentalization without visual clutter.

### Dark Mode (Pressroom Console)
- **Primary Canvas (`#111719`):** Deep charcoal slate engineered for low-light pressrooms and multi-screen control booths.
- **Card / Surface Tier 1 (`#191F22`) & Tier 2 (`#20272A`):** Layered sheet containers providing elevation without shadow bloat.
- **Primary Text (`#F5F5F2`):** Bleached ivory paper white.
- **Secondary Text (`#A7AFB1`):** Calibrated muted aluminum gray.
- **Structural Borders (`#3A4448`):** Restrained, low-contrast structural rules.

### CMYK Functional Anchors
- **Cyan (`#219BC3`):** Primary action state, active selection ribbons, verified proof markers, focused input outlines, and interactive links.
- **Magenta (`#D9476B`):** Secondary accents, production alerts, batch cut-offs, system notifications, and dynamic tag callouts.
- **Yellow (`#F5D21B`):** Warning indicators, queue pauses, drying/pending cycles, and inspection holds. Must always use dark carbon text (`#191D20`) for contrast.
- **Key Black (`#1B2427`):** Solid structural ground, dark badges, high-contrast print commands, and active tabs.

## Typography

The design system enforces `Times New Roman` systematically across every interface tier. Rather than relying on modern monospaced or sans-serif standards, it uses the precision of classical serif proportions to evoke the heritage of mechanical publishing, broadsides, and legal imprint registries.

### Typographic Implementation Rules
- **Tabular Data & Numbers:** Use `font-variant-numeric: tabular-nums lining-nums` for all financial metrics, batch counters, and run sizes to maintain strict vertical alignment across tables.
- **Labels & Micro-Annotations:** The `label-md` and `label-tech` levels should be rendered in uppercase with positive letter spacing (`0.06em` to `0.08em`) to mimic printed press sheet margins and technical documentation.
- **Text Density:** Never allow loose, floaty line heights. Keep leading tight (`1.2` to `1.4`) to sustain high visual density without sacrificing legibility.

## Layout & Spacing

The layout philosophy mirrors physical paper sheets, imposition layouts, and plate locks. Interfaces are anchored to a 12-column responsive fluid grid with precise, consistent gutters and margins.

### Breakpoint Adaptation
- **Mobile (< 768px):** 4-column structure, `margin: 1rem`, `gutter: 1rem`. Overflows collapse vertically; technical registration bars scale to horizontal 2-bar or 4-dot formats.
- **Tablet (768px - 1199px):** 8-column layout, `margin-md: 1.5rem`, `gutter: 1rem`. Sidebars collapse to icon/dock status.
- **Desktop (ΓëÑ 1200px):** 12-column layout, `margin-lg: 2.5rem`, `gutter-lg: 1.5rem`. Max-width content boundaries pinned to 1600px with symmetric outer gutter framing.

### Structural Rhythms & Boundaries
- Avoid floating elements with ambiguous boundaries. Every content group must reside within explicit mechanical borders.
- Technical measurement lines and bleed lines are indicated by `1px` dashed borders, framing the active content area like a print artboard.

## Elevation & Depth

This system avoids soft, blurred, or diffuse drop shadows. Depth is communicated strictly through surface layering, crisp mechanical borders, and hairline offsets reminiscent of physical paper stocks stacked on a cutting table.

### Depth Mechanics
- **Level 0 (Artboard / Sheet Base):** Flat background surface (`#F5F5F2` light / `#111719` dark).
- **Level 1 (Panels & Cards):** Flat container (`#FFFFFF` light / `#191F22` dark) enclosed by a `1px` border (`#D5D7D6` light / `#3A4448` dark).
- **Level 2 (Active Sheets & Focus Containers):** Dual-stroke visual border. Constructed using a `1.5px` outer border in Cyan (`#219BC3`) accompanied by an inner `1px` offset ring (`box-shadow: 0 0 0 1px #FFFFFF, 0 0 0 2.5px #219BC3` in light mode).
- **Level 3 (Modals, Overlays, Floating Proofs):** Hard-edged 2px offset physical drop shadow (`box-shadow: 3px 3px 0px rgba(25, 29, 32, 0.15)` in light mode; `box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.5)` in dark mode) paired with an opaque hairline outline.

## Shapes

The shape vocabulary emphasizes the machined accuracy of hydraulic guillotines and die-cutters. Elements are distinctly architectural and rectangular.

- **Standard Elements (Buttons, Inputs, Badges):** 6px corner radius (`roundedness: 1`, with custom boundary clamp at 6px).
- **Major Containers (Cards, Modals, Canvas Drawers):** Strict 8px to 10px corner radius.
- **Micro Chips & Registration Ticks:** Crisp 2px to 4px radius. 
- Circular forms are reserved exclusively for:
  - CMYK registration targets and crosshairs (`Γèò`).
  - Radio button centers.
  - Optical color calibration dots.

## Components

### 1. The CMYK Micro Calibration Strip
Every primary container, modal, and system header includes an integrated 4-color prepress calibration strip at its top or bottom edge:
- A horizontal sequence of four adjacent squares or pill-dots (each 8px ├ù 8px, 4px margin):
  - `Cyan (#219BC3)`
  - `Magenta (#D9476B)`
  - `Yellow (#F5D21B)`
  - `Key Black (#1B2427)`
- In modals, the calibration strip sits adjacent to an engineering registration mark: a 12px circular crosshair icon (`Γîû`).

### 2. Buttons
- **Primary Action (Cyan Direct):** Outlined or solid fill with high typographic punch. Solid style uses `#219BC3` background with pure white `#FFFFFF` Times New Roman bold text. Outlined variant uses a `1.5px` solid border (`#219BC3`), transparent background, `#219BC3` text, and a double-stroke focus ring on hover.
- **Secondary (Magenta Accent / Proof Approval):** Hairline outline `1.5px` `#D9476B`, text `#D9476B`. Hover state fills with 8% opacity tint.
- **Tertiary / Neutral (Structural Outlined):** Hairline border `1px` (`#D5D7D6` light / `#3A4448` dark), background transparent, text `#191D20` (light) / `#F5F5F2` (dark).
- **Physical Padding:** `0.5rem 1rem` for standard; `0.25rem 0.625rem` for compact data-grid buttons.

### 3. Cards & Paper Containers
- Constructed with `#FFFFFF` (light) or `#20272A` (dark) canvas.
- Framed with `1px` solid `#D5D7D6` (light) or `#3A4448` (dark).
- Cards include a technical header containing:
  - Serif section title (`title-md`).
  - Right-aligned dimensional tag (e.g., `[ 210 ├ù 297 mm ΓÇö 300 GSM ]`) set in `label-tech` tracking.
  - A subtle `1px` divider line separating card header from content body.

### 4. Input Fields & Select Pickers
- **Resting:** `1px` border `#D5D7D6` (light) / `#3A4448` (dark), background `#FFFFFF` (light) / `#191F22` (dark), text in Times New Roman `14px`.
- **Focus:** `1.5px` border `#219BC3` with a zero-blur crisp outline offset of `2px`.
- **Labels:** Positioned outside/above the field in `label-md` uppercase with a trailing dot or registration mark (e.g., `PAPER FINISH ΓÇó`).
- **Units Append:** Fixed right-side micro-tags (e.g., `GSM`, `mm`, `LPI`, `copies`) styled in `label-tech` using `#686D70`.

### 5. Chips, Status Badges & Print Runs
- Rectangular with 4px corner radius and `1px` crisp bounding stroke.
- **Proof Approved:** Border `#219BC3`, subtle cyan background (5% opacity), Cyan text.
- **Press Hold / Drying:** Border `#F5D21B`, background `#F5D21B` (10% opacity), text `#191D20` (light) / `#F5D21B` (dark).
- **Plate Error / Bleed Warning:** Border `#D9476B`, background `#D9476B` (8% opacity), text `#D9476B`.

### 6. QR Code Tracking Cards
Specialized component for online print ordering:
- Central QR graphic framed with four corner crop marks (L-shaped bracket marks at each corner denoting physical cut lines).
- Metadata block directly underneath specifying: UUID, Batch Sequence, Order Timestamp, and Target Press Line.
- All numbers rendered in tabular lining Times New Roman.

### 7. Data Tables & Imposition Sheets
- Compact vertical padding (`space-sm` / `8px`).
- Column headers styled with `label-md` uppercase, bordered by a double-rule at the bottom (`border-bottom: 3px double #D5D7D6`).
- Alternating rows employ subtle zebra striping (`#F5F5F2` at 40% opacity in light mode) with high-contrast text.