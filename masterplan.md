# MASTERPLAN — Karan Dugad Portfolio
### Codename: SYSTEM ONLINE

## 1. Vision

A single-page, 3D, scroll-driven developer portfolio for **Karan Dugad**. The site is framed
as booting into a living machine: Karan's personal dev system coming online. You scroll
down a circuit trace that runs the length of the page, lighting up one module at a time —
Hero, About, Stack, Projects, Experience, Contact — like components powering up on a
motherboard. It should read as unmistakably "tech," feel expensive and precise rather than
noisy, and center one bold 3D signature moment instead of scattering effects everywhere.

This document is the architecture. `design.md` is the visual language. `content.txt` is the
copy. `prompt.txt` is what you paste into Antigravity to build it.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, minimal config, ideal for a single-page build |
| Styling | Tailwind CSS 3 | Utility-first, pairs cleanly with a token-based design system |
| 3D | `@react-three/fiber` + `@react-three/drei` | Declarative Three.js, the only sane way to do R3F inside React |
| 3D glow/bloom | `@react-three/postprocessing` | Bloom pass for the trace-glow / copper-ember look |
| Scroll animation | GSAP + `ScrollTrigger` | Industry-standard scroll-linked timelines, pinning, scrubbing |
| Smooth scroll | `lenis` (Studio Freight) | Buttery inertia scroll that GSAP ScrollTrigger syncs to |
| Micro-interactions | Framer Motion (`motion/react`) | Hover/tap states, card tilt, page-load stagger — lighter than GSAP for small UI bits |
| Icons/illustration | Custom SVG icon set (see `design.md`) | Generic icon packs undercut the "insanely illustrative" ask |
| Contact form | Formspree or EmailJS (client-side only, no backend) | Single-page site, no server needed |
| Deployment | Vercel or Netlify | Zero-config static hosting for a Vite build |

Do not introduce a state manager (Redux/Zustand) — this is a single page with no shared
app state beyond scroll position and a couple of UI toggles, which `useState`/`useRef`
handle fine.

---

## 3. Site Map (single page, anchor-linked sections)

The nav and section IDs use a "module log" numbering because the site is *literally*
framed as a running system — each section is a module coming online. This is meaningful,
not decorative.

| # | Section ID | Purpose |
|---|---|---|
| 00 | `#boot` | Preloader / boot sequence. Not a scroll section — plays once on load, then dismisses. |
| 01 | `#root` | Hero. Name, role, tagline, the 3D circuit-board centerpiece, primary CTAs. |
| 02 | `#process` | About. Who Karan is, how he works, quick facts/stats. |
| 03 | `#modules` | Stack. Skills shown as components mounted on the board, grouped by category. |
| 04 | `#deployed` | Projects. Featured work as tactile, tilting "expansion cards." |
| 05 | `#runtime` | Experience / timeline (optional — include if Karan has roles to show; otherwise fold into About). |
| 06 | `#uplink` | Contact. Direct contact + social links + resume download. |
| 07 | footer | Sign-off line, socials repeated, back-to-top. |

Sticky nav pins top-right (or top-left), shows the current module number and a live
scroll-progress trace that fills in as you move through sections.

---

## 4. Core Features

- **Boot sequence preloader** — terminal-style typed lines ("mounting filesystem...",
  "establishing uplink...") before the hero reveals. Skippable on click/keypress.
- **3D circuit-board hero** — the signature element. Procedurally built in R3F (see §5),
  slow idle rotation, subtle parallax on cursor move, traces ignite in sequence as the
  user first scrolls past the hero.
- **Scroll-linked trace line** — an SVG/3D line that runs through the whole page and
  draws itself (stroke-dashoffset or shader progress) tied to scroll position, visually
  connecting every section.
- **Section reveal choreography** — each module "boots" into view with a distinct GSAP
  ScrollTrigger timeline (not just fade-up — see `design.md` motion section).
- **Tilting project cards** — 3D-tilt on hover (CSS transform + Framer Motion, not a
  separate R3F scene per card — see §5 for why).
- **Custom cursor** — a small "solder point" dot that expands and glows near interactive
  elements. Falls back to the native cursor on touch devices.
- **Magnetic buttons** — primary CTAs pull slightly toward the cursor on hover.
- **Live status readouts** — small mono-font HUD details (local time, "SYSTEM: ONLINE",
  scroll %) that reinforce the tech framing without adding real complexity.
- **Reduced-motion & accessibility fallback** — every scroll/3D effect has a static or
  simplified equivalent (see §7).

Resist the urge to add more signature 3D moments beyond the hero — one bold thing, done
exceptionally well, beats five mediocre ones. See `design.md §Restraint`.

---

## 5. 3D Strategy

**Do not require an external `.glb`/`.gltf` model file.** Karan is prompting an agent, not
sourcing 3D assets — the board should be built procedurally from primitives so Antigravity
can generate it with code alone:

- Board substrate: a flat `BoxGeometry` panel with a dark, faintly reflective
  `MeshStandardMaterial`.
- Traces: `THREE.CatmullRomCurve3` paths extruded as thin `TubeGeometry`, or drawn as
  emissive `Line2` segments — these are what "light up" on scroll.
- Components: small `BoxGeometry`/`CylinderGeometry` clusters (resistors, a chip, a
  crystal oscillator) scattered on the board with slight height variance, catching light.
- The "CPU" at the center is the single brightest, largest element — a visual stand-in
  for Karan himself. Everything else defers to it.
- Lighting: one key light + emissive materials on the traces themselves (cheaper than
  many lights) + bloom post-processing for the glow.
- Camera: fixed, slow idle orbit (`useFrame` + a sine drift), plus a small parallax offset
  driven by pointer position. No user-controlled `OrbitControls` — this is a set piece,
  not a toy.

**Performance guardrails:**
- Cap pixel ratio at `Math.min(devicePixelRatio, 2)`.
- Lazy-load the whole 3D canvas with `React.lazy` + `Suspense`, and don't block the
  boot sequence or LCP on it.
- On mobile / low-end devices (`matchMedia('(max-width: 768px)')` or a rough GPU check),
  swap the live 3D canvas for a pre-rendered still image or a much simpler CSS/SVG
  version of the board. Do not render the full R3F scene on small screens.
- Respect `prefers-reduced-motion`: idle rotation and camera drift stop; trace ignition
  becomes an instant state change instead of an animated one.

---

## 6. Animation Strategy

- **Lenis** drives smooth scroll globally; GSAP's `ScrollTrigger` is told to use Lenis's
  scroll position (via `ScrollTrigger.scrollerProxy` or the official Lenis+GSAP recipe)
  so both stay in sync.
- **Page load:** boot sequence → hero content stagger-in (Framer Motion) → 3D canvas
  fades in last, once fonts and layout are stable.
- **Per-section reveals:** each module has its own GSAP timeline triggered by
  `ScrollTrigger`, `start: 'top 75%'`, generally `scrub: false` for content reveals and
  `scrub: true` only for the trace-line drawing and any pinned moments.
- **One pinned moment is allowed:** consider pinning the hero briefly so the 3D board's
  trace-ignition sequence gets to breathe before the page continues scrolling. Don't pin
  more than once — pinning is the most disruptive scroll technique and loses impact if
  overused.
- **Micro-interactions** (button hover, card tilt, cursor) run on Framer Motion, kept
  separate from the GSAP scroll timelines to avoid fighting over the same properties.

---

## 7. Performance, Responsiveness, Accessibility

- Target Lighthouse Performance ≥ 85 on desktop, ≥ 70 on mobile (3D pages pay a real
  cost — this is a realistic bar, not 100).
- Fonts: self-host via `@font-face` with `font-display: swap`; preload the display face.
- Images: served as WebP/AVIF, lazy-loaded below the fold.
- Every animated element must degrade gracefully with `prefers-reduced-motion: reduce`.
- Keyboard navigation must reach every interactive element in a sensible order; visible
  focus rings (styled to match the theme, not removed).
- Color contrast: body text against the void background must clear WCAG AA.
- Test breakpoints: 375px, 768px, 1024px, 1440px, 1920px.

---

## 8. Folder Structure

```
src/
  assets/
    fonts/
    icons/            # custom SVG icon set
  components/
    layout/           # Nav, Footer, CustomCursor, ScrollProgress
    sections/
      Boot.jsx
      Hero.jsx
      About.jsx
      Stack.jsx
      Projects.jsx
      Experience.jsx
      Contact.jsx
    three/
      CircuitBoard.jsx     # the R3F scene
      TraceLine.jsx
      BoardComponent.jsx
    ui/                # Button, MagneticButton, ProjectCard, Chip
  hooks/
    useLenis.js
    useReducedMotion.js
    useBreakpoint.js
  lib/
    gsapConfig.js
  content/
    content.js         # copy imported from content.txt, structured as JS objects
  App.jsx
  main.jsx
  index.css            # Tailwind base + custom properties for the token system
```

---

## 9. Build Phases

Matches the phase breakdown in `prompt.txt` — build in this order, verifying each phase
before moving to the next rather than attempting the whole site in one shot.

1. **Setup** — scaffold Vite + React + Tailwind, install dependencies, set up folder
   structure and font loading.
2. **Skeleton** — all sections in place with real layout and placeholder content, fully
   responsive, no animation yet.
3. **Design system** — Tailwind config wired to the token system in `design.md`, all
   typography/spacing/color correct.
4. **3D signature element** — the circuit-board hero, procedurally built, idle animation
   working, performance guardrails in place.
5. **Scroll choreography** — Lenis + ScrollTrigger wired up, trace-line draws on scroll,
   each section's reveal timeline built.
6. **Content integration** — real copy from `content.txt` dropped in, project cards,
   contact form wired to Formspree/EmailJS.
7. **Polish pass** — accessibility sweep, reduced-motion fallback, mobile 3D fallback,
   cross-browser check, performance audit.

---

## 10. Deployment

Push to GitHub, connect the repo to Vercel (recommended for Vite defaults) or Netlify.
No environment variables needed unless EmailJS is used, in which case store the service/
template/public keys as Vercel environment variables rather than hardcoding them.
