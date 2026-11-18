# DESIGN SYSTEM — SYSTEM ONLINE
### Visual language for Karan Dugad's portfolio

## Design Thesis

Karan's site isn't a resume with a hero image bolted on — it's a machine you're watching
boot up. The page is a circuit board; scrolling is current moving through it; each section
is a component lighting up as power reaches it. Everything visual — color, type, motion,
iconography — is pulled from that one idea, not decorated on top of it. The signature
moment is a 3D circuit board in the hero. Everything else stays quiet so that moment lands.

Deliberately avoided: the cream-background/terracotta-accent look and the flat
black-background/acid-green "hacker" look — both are the current AI-generated defaults.
Instead: a near-black *blue-charcoal* base (not pure black) paired with **copper** and
**violet**, evoking solder and circuit glow without reading as a stock "matrix" theme.

---

## Token System

### Color

| Name | Hex | Use |
|---|---|---|
| Void | `#0A0D12` | Page background |
| Panel | `#12171F` | Card/panel surfaces, raised sections |
| Panel Line | `#232A35` | Hairline borders, dividers, the resting (unlit) trace color |
| Bone | `#EDEAE2` | Primary text — warm off-white, never pure `#FFFFFF` |
| Signal Slate | `#8A90A0` | Secondary/muted text, labels, captions |
| Ember Copper | `#E2864B` | Primary accent — CTAs, active trace glow, key highlights |
| Ion Violet | `#8B7CF6` | Secondary accent — hover states, gradients, secondary highlights |

Copper and violet never fight for the same job: copper means "active / primary action,"
violet means "hover / secondary emphasis." Don't use both on one element at once except
in the hero's trace-glow gradient, which is the one place gradient blending is allowed.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | **Cabinet Grotesk** (Fontshare, free) | Bold geometric grotesk with a technical edge. Used for H1/H2 only, and used with restraint — not every heading needs to shout. |
| Mono / Label | **JetBrains Mono** (Google Fonts) | Eyebrows, nav labels, section numbers, HUD readouts, code-flavored details. This is what makes the page feel like a developer's, not a generic agency's. |
| Body | **General Sans** (Fontshare, free) or Inter as fallback | Paragraph copy, project descriptions. Chosen for a slightly warmer, more humane feel than Inter alone, so the page doesn't read as cold as its dark palette might suggest. |

Type scale (rem, desktop):

```
Display XL   6.5rem / 1.0   — hero name only
Display L    3.25rem / 1.05 — section headings
Display M    2rem / 1.15    — sub-headings, project titles
Body L       1.25rem / 1.6  — hero subtitle, intro paragraphs
Body M       1rem / 1.6     — standard body copy
Mono S       0.8125rem / 1.4, letter-spacing 0.08em, uppercase — eyebrows/labels
```

Scale down Display XL to ~3rem and Display L to ~2rem at mobile widths — don't just
shrink proportionally, re-set each breakpoint intentionally.

### Spacing, Radius, Elevation

- Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px. Section vertical padding
  defaults to 128px desktop, 64px mobile.
- Radius: **6px** everywhere small (buttons, chips, inputs), **16px** on large panels
  (project cards). No fully-rounded (pill) buttons — it undercuts the technical feel.
- Elevation is not a drop shadow — it's a **glow**. Interactive/active elements get a
  soft `box-shadow` in Ember Copper at low opacity (e.g. `0 0 40px -10px rgba(226,134,75,0.35)`)
  instead of a conventional dark shadow. Reserve stronger glow for hover/active states only.
- Borders: 1px solid `Panel Line`, brightening to Ember Copper on hover/focus.

### Layout Concept

Single column, max content width 1200px, generous side gutters. A vertical trace line
runs down the page (left-aligned on desktop, hidden or simplified on mobile) connecting
every section — this is the literal circuit the page is named after, drawn as SVG,
scroll-scrubbed to "power on" as the user descends.

```
┌─────────────────────────────────────────┐
│  [NAV — logo/mono-wordmark]   [00–06 ●]  │  <- sticky, slim
├─────────────────────────────────────────┤
│ ●                                        │
│ │      HERO                              │
│ │      KARAN DUGAD          [ 3D BOARD ] │
│ │      web developer.                    │
│ │      [ CTA ]  [ CTA ]                  │
│ ●───┐                                    │
│     │  ABOUT                             │
│     │  short bio + 3 quick-fact stats    │
│ ●───┘                                    │
│ │      STACK — components on the board   │
│ │      [chip][chip][chip][chip]          │
│ ●                                        │
│ │      PROJECTS                          │
│ │      [ tilting card ][ tilting card ]  │
│ ●                                        │
│ │      CONTACT / UPLINK                  │
│ │      email · resume · socials          │
│ ●                                        │
├─────────────────────────────────────────┤
│  FOOTER — sign-off, socials, back to top │
└─────────────────────────────────────────┘
```

At mobile widths, collapse to a single centered column; the trace line becomes a thin
static gradient rule rather than a scroll-scrubbed path (performance + clarity).

### Signature Element

**The 3D circuit board in the hero.** A dark PCB panel floating slightly off-axis, built
from primitives (see `masterplan.md §5`), with a bright central "CPU" standing in for
Karan and thin emissive traces branching outward. On first scroll past the hero, the
traces ignite outward from the CPU in sequence (150–250ms stagger per branch), then settle
into a slow idle glow. This is the one place the design spends its boldness — every other
section stays comparatively quiet so this moment is unmistakably the centerpiece.

---

## Motion Principles

- **Easing:** default `cubic-bezier(0.16, 1, 0.3, 1)` (a confident "expo-out") for reveals;
  linear only for scroll-scrubbed properties (trace draw, progress indicators).
- **Durations:** micro-interactions 150–250ms, section reveals 500–800ms, the hero boot/
  ignite sequence up to 1.8s total (it's a one-time moment, allowed to take its time).
- **What animates on scroll:** section content reveals (translateY 24px → 0 + opacity),
  the trace line's stroke-dashoffset, and the project cards' entrance. What does **not**
  animate on every scroll tick: body paragraph text (reveal it as a block, not word-by-word
  or character-by-character — that reads as gimmicky at paragraph length).
- **Hover/interaction motion:** magnetic pull on primary buttons (max 8px offset), 3D tilt
  on project cards (max 6° rotation, mouse-position-driven), custom cursor scale-up near
  links. Keep all of these subtle — a design this graphic doesn't need loud hover states too.
- **One orchestrated moment > many scattered ones.** The boot sequence and the hero trace-
  ignition are the two moments allowed to feel like an "event." Every other transition
  should feel efficient, not performative.

---

## Illustration Style Guide

A **single custom SVG icon set**, not a stock icon pack — this is where "insanely
illustrative" lives without adding visual noise elsewhere:

- Single-weight (2px) stroke, rounded joints matching the 6px corner radius used
  elsewhere, with a small filled "solder dot" at each line endpoint — the same motif as
  the page's trace line, applied at icon scale.
- Icons for the Stack section are drawn as little "components": a browser window drawn
  like a chip, a database as a stacked-cylinder component, a terminal as a small display
  module, Git branching drawn literally as a circuit fork.
- Default state: `Panel Line` gray. Hover/active state: stroke and solder-dots switch to
  Ember Copper with a soft glow — identical treatment to the trace line itself, so icons
  read as "part of the board," not generic clip art dropped on top of it.
- No gradients inside icons, no drop shadows on icons — glow only, consistent with the
  elevation rule above.

---

## Cursor & Micro-interaction Spec

- Custom cursor: a 6px "solder point" dot. Over any interactive element it expands to
  32px with a soft copper ring and reduced opacity fill. Disabled entirely on touch
  devices (`(hover: none)` media query) — never fake a cursor on mobile.
- Buttons: filled (Ember Copper) for primary actions, outlined (Panel Line, brightening
  to Copper on hover) for secondary. Both get the magnetic-pull hover behavior.
- Links inside body copy: Signal Slate underline that fills to Ember Copper on hover,
  no color change on the text itself (keeps paragraphs calm).

---

## Responsive Rules

- Breakpoints: 375 / 768 / 1024 / 1440 / 1920.
- Below 768px: the live R3F hero scene is replaced with a static, pre-composed image or a
  simplified CSS/SVG rendering of the same board (see `masterplan.md §5`). Never ship the
  full WebGL scene to a phone by default.
- Below 768px: vertical trace line simplifies to a static gradient rule; scroll-scrubbed
  ignition becomes a single fade-in per section instead of a staggered branch sequence.
- Touch targets minimum 44×44px regardless of visual size.

---

## Accessibility & Restraint

- All motion respects `prefers-reduced-motion: reduce` — see `masterplan.md §7` for the
  fallback behavior of each animated system.
- Focus states are visible and on-theme: a 2px Ember Copper outline with 2px offset,
  never `outline: none` without a styled replacement.
- Text contrast (Bone on Void, Signal Slate on Void) must clear WCAG AA at body sizes.
- **Self-critique:** the biggest risk in this direction is over-animating because the
  theme "invites" it. Before adding any new motion, ask whether it serves the boot/circuit
  metaphor or is just decoration — if it's the latter, cut it. One bold 3D moment, one
  quiet connective trace line, and clean typography are enough to make this feel premium;
  resist stacking more on top.
