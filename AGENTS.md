<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Full-bleed black sections

- Follow the homepage Benefits section in `components/benefits/benefits.module.css` when a section needs the established black-background treatment.
- Apply the near-black background (`#0b0b0a`) and off-white foreground (`#f4f3ee`) to the full-width section element so the background reaches both viewport edges. Keep the content aligned using inner padding or a constrained inner wrapper; do not place a centered black rectangle behind an otherwise page-width section.
- Keep accents such as squares, icons, and active details blue (`#0759c9`). Use translucent off-white for rules and dividers on the dark surface.
- Preserve the existing subtle monochrome grain treatment where appropriate.
- On the Partnership page, the "Work with us in ways that fit your goals" section should use this full-bleed treatment when it is presented as a black section.

# Noise / film-grain treatment

- The homepage grain is a repeated raster texture, not generated CSS noise: reuse `public/textures/noise.webp` via `url("/textures/noise.webp")`.
- Follow `components/benefits/benefits.module.css` or `components/homeCta.module.css`: make the section `position: relative`, `isolation: isolate`, and `overflow: hidden`, then place the grain in an absolutely positioned pseudo-element or decorative child with `inset: -50%`, `pointer-events: none`, and no semantic content (`aria-hidden="true"` for a child element).
- Use `background-repeat: repeat`, `background-size: 160px 160px`, `filter: contrast(175%)`, and `opacity: 0.055`. Preserve these values as the default site-wide treatment unless the underlying image requires a deliberately documented adjustment.
- Animate the oversized overlay, not its background position, with the existing `grain-shift` / `noise-shift` transform keyframes: move between roughly `-3%` and `3%` on each axis over `240ms steps(2, jump-none) infinite`, and add `will-change: transform`.
- Keep the grain visually subtle and behind interactive content. Disable its animation under `@media (prefers-reduced-motion: reduce)`; the static texture may remain visible.

# Visual style and typography

- Keep the visual language editorial, high-contrast, and restrained: off-white `#f4f3ee`, near-black `#0b0b0a`, and blue `#0759c9` are the core palette.
- Use no more than two typefaces in a section. Display headings use `Arial, Helvetica, sans-serif`; supporting copy and labels use the configured IBM Plex Mono or body-mono CSS variable with a `monospace` fallback.
- Primary section headings follow the “The benefits of Unsigned Pathway.” treatment: uppercase Arial/Helvetica, `font-weight: 800`, `font-size: clamp(3.8rem, 4.55vw, 5.6rem)`, `letter-spacing: -0.065em`, and `line-height: 0.91`.
- For those section headings, use `clamp(3.4rem, 12vw, 6rem)` at widths up to `900px`, and `clamp(3rem, 14.5vw, 4.8rem)` at widths up to `600px`.
- Standard descriptive copy follows the pathway-description treatment: IBM Plex Mono via the relevant configured CSS variable, `font-weight: 400`, `font-size: clamp(0.74rem, 0.85vw, 0.95rem)`, `letter-spacing: -0.02em`, and `line-height: 1.45`; use `0.82rem` at widths up to `600px`.
- Preserve generous whitespace, crisp one-pixel rules, square blue accents, minimal decoration, and subtle monochrome grain where it already appears.
- Use CSS Modules for component-scoped styles and reuse established treatments before introducing new typography or colour values.
- Primary CTA links and buttons use the Access page's "Enquire about access" treatment: square corners, a transparent/off-white background, a crisp `1px` near-black border, near-black uppercase mono text, and a northeast arrow (`↗`) aligned at the far edge. On hover and keyboard focus, invert to blue with off-white text and move the arrow slightly up and right; keep a clearly visible focus treatment and disable movement when reduced motion is requested.
