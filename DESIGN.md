---
name: Lumenfold
description: A calm continuous-learning workspace with a bold, honest introduction.
---

<!-- TOKENS: captured from the alpha implementation on 2026-07-22. Keep this file in sync with src/styles.css. -->

# Design System: Lumenfold

## Overview

**Creative North Star: "The Quiet Learning Instrument"**

Lumenfold should feel like a precise personal instrument that becomes familiar through use. The workspace follows Obsidian Nord's balance of compact information, soft surfaces, friendly color, and quiet interaction. It practices silent competence: essential objects and actions remain visible, while the interface avoids narration, celebration, and interruption.

The introduction uses the same visual language at a different intensity. It is cleaner, bolder, and more composed, drawing from Braun and Dieter Rams through honest product presentation, disciplined geometry, decisive spacing, and mostly neutral surfaces. A large real workspace carries the first viewport, and the philosophy section gives the longer vision room to breathe before one concrete inquiry demonstrates the path from source to cited answer, accepted note, review, and connection.

The deadline MVP targets a desktop Chromium walkthrough on a normal PC. The current CSS includes a responsive foundation for later work, but cross-device compatibility and mobile validation are outside this submission's acceptance criteria. Introduction motion may choreograph one source-to-note sequence; product motion communicates state only. Reduced-motion presentation must preserve the full narrative without animation.

**Key Characteristics:**

- Quiet, capable, and friendly inside the product.
- Clean, bold, and inspiring on the introduction page.
- Dark by default, with an equally intentional light theme.
- Information-dense without visual pressure.
- Real product behavior instead of abstract decoration.
- Familiar controls, restrained geometry, and durable visual hierarchy.

## Colors

The workspace palette is implemented in OKLCH and follows the requested two-atmosphere model: a softened Nord-like dark canvas and a readable Rosé Pine Dawn / AnuPpuccin-inspired light canvas. Theme switching changes the relationship between surface and accent; it is not simply a brightness slider. The values below are the current source of truth in `src/styles.css`.

### Dark workspace: Nord-derived

- **Polar Night** `oklch(0.27 0.009 255)`: softened default canvas, close to Nord's `#2e3440` without a strong blue cast.
- **Surface** `oklch(0.32 0.011 255)`: pane and reading surface, close to Nord's `#3b4252`.
- **Raised surface** `oklch(0.36 0.013 255)`: selected controls and proposal surfaces.
- **Soft surface** `oklch(0.41 0.015 255)`: hover and skeleton fills, close to Nord's `#4c566a`.
- **Snow ink** `oklch(0.95 0.006 255)`: near-neutral primary reading text, close to Nord's `#eceff4`.
- **Learning Coral** `oklch(0.63 0.14 20)`: primary action and brand mark.
- **Warm accent** `oklch(0.68 0.13 20)` with soft variant `oklch(0.76 0.10 35)`: the dark workspace interface highlight for navigation, focus, citations, actions, and selection.
- **Frost Blue** `oklch(0.76 0.10 210)`: selection, focus, navigation, and citations.
- **Recall Gold** `oklch(0.83 0.13 90)`: review emphasis and H2.
- **Connection Moss** `oklch(0.76 0.10 125)`: accepted state and H3.
- **Reflective Plum** `oklch(0.68 0.09 330)`: links and H4.
- **Quiet Teal** `oklch(0.75 0.08 180)`: supportive states and H5.

### Light workspace: Rosé Pine Dawn-derived

- **Dawn Canvas** `oklch(0.965 0.025 70)`: a soft tinted base inspired by Rosé Pine Dawn `#faf4ed`.
- **Dawn Surface** `oklch(0.985 0.020 70)`: source, note, and instrument reading surfaces.
- **Raised surface** `oklch(0.925 0.035 70)`: pane separation and selected controls.
- **Soft surface** `oklch(0.89 0.035 70)`: hover and skeleton fills.
- **Quiet Ink** `oklch(0.38 0.060 300)`: Rose Pine-inspired purple ink, darkened for sustained reading contrast.
- **Nord Blue** `oklch(0.43 0.075 255)` with soft variant `oklch(0.52 0.065 255)`: the light workspace highlight, flipping the dark workspace's blue-gray atmosphere into the active foreground role.
- **Learning Coral** `oklch(0.58 0.14 10)`, **Frost Blue** `oklch(0.52 0.10 245)`, **Recall Gold** `oklch(0.70 0.15 75)`, **Connection Moss** `oklch(0.53 0.10 160)`, **Reflective Plum** `oklch(0.57 0.11 305)`, and **Quiet Teal** `oklch(0.60 0.09 190)`: darkened semantic counterparts that preserve the same heading and state roles.

### Introduction palette

The introduction is intentionally separate from the workspace palette. It uses a near-neutral Braun/Rams-like canvas so the story can be clean and bold without making the product itself feel cold or theatrical. It uses the same warm accent sparingly; the multi-color heading spectrum does not appear as website decoration.

- Dark introduction: canvas `oklch(0.20 0.004 30)`, surface `oklch(0.245 0.004 30)`, ink `oklch(0.84 0.004 55)`, muted ink `oklch(0.73 0.004 55)`, metadata `oklch(0.63 0.004 55)`.
- Light introduction: canvas `oklch(0.965 0.004 60)`, surface `oklch(0.935 0.004 60)`, ink `oklch(0.26 0.004 40)`, muted ink `oklch(0.40 0.004 40)`.
- Introduction accent: one restrained brick tone only, `oklch(0.66 0.07 24)` dark / `oklch(0.48 0.075 24)` light. Product heading colors and semantic state colors do not decorate the introduction.
- The light values are applied before the first paint with a layout effect, avoiding a dark-text-on-dark-canvas flash when a light theme is persisted.

### Structural roles

- **Structural divider** `oklch(0.41 0.012 255)` dark / `oklch(0.84 0.030 70)` light: low-contrast boundaries between rails, panes, toolbars, and files.
- **Selection** uses a low-opacity mix of the warm accent in both themes; labels and focus rings carry meaning as well.

### Named Rules

**The Two Atmospheres Rule.** Dark mode originates in Obsidian Nord's quiet field with a warm Aurora accent; light mode originates in Rosé Pine Dawn with the accent darkened against a light field. Theme switching changes both background and highlight roles together.

**The Consistent Spectrum Rule.** The multi-color sequence belongs to Markdown heading ranks and durable note reading only: H1 coral, H2 ochre, H3 moss, H4 plum, H5 teal, and H6 blue. It must not become a rainbow of website controls. Light-mode tones must be darkened as needed to reach at least 4.5:1 contrast on the reading surface.

**The Single Interface Accent Rule.** Website navigation, focus, active states, citations, actions, and empty states use one accent per theme: warm in the dark workspace and Nord blue in the light workspace. Moss and coral appear only for success and error; document rank colors stay inside document content.

**The Purposeful Color Rule.** Product color communicates hierarchy, selection, relationship, or state. Decorative color belongs to the introduction and must still reinforce the learning journey.

## Assistant & Approval

The assistant belongs in the workspace as a quiet, useful instrument rather than a commanding persona. Keep the current source, question, citations, and proposed action visible in one working context. Assistant output should be readable on its own, with provenance close to each citation and no theatrical status language.

Durable actions use an explicit approval surface:

- **Answer:** show the response and its source excerpts without implying that anything was saved.
- **Proposal:** show the operation, destination, references, and a human-readable preview or diff before writing.
- **Approval:** make the learner's confirm and cancel actions equally discoverable; report the resulting file and revision after confirmation.
- **Failure:** preserve the draft and explain what could not be completed; never silently retry a write or hide a provider fallback.

Use color and icons as supporting signals only; labels, changed lines, and focus states must carry the meaning. Never display raw provider credentials in the interface, place them in vault exports, or treat browser-side encryption as a security boundary. Connection settings may identify an endpoint and format, while the secret remains owned by the deployment or local credential store.

## Typography

**Display Font:** [single sans family to be chosen at implementation]

**Body Font:** [same sans family or platform-system equivalent to be chosen at implementation]

**Label/Mono Font:** [monospace limited to source metadata, paths, and code; family to be chosen at implementation]

**Character:** Familiar, highly readable, and modest in the workspace. The introduction gains confidence through scale and spacing rather than an ornamental display face. The implementation should preserve Obsidian Nord's compact typographic rhythm and avoid an editorial serif-plus-mono costume.

### Hierarchy

- **Display:** Used only for the Lumenfold name and major introduction statements; bold, spacious, and never larger than 6rem.
- **Headline:** Used for introduction sections and primary workspace titles; balanced wrapping and clear separation from body copy.
- **Title:** Used for panes, documents, dialogs, learning activities, and proposal previews.
- **Body:** Comfortable for sustained source and Markdown reading, with prose constrained to 65-75 characters per line.
- **Label:** Compact and direct for controls, metadata, tabs, and navigation; sentence case with zero letter spacing.

### Named Rules

**The One Voice Rule.** Use one sans-led typographic voice across brand and product. The introduction becomes bold through composition; the workspace remains quiet through scale.

**The Reading First Rule.** Source and note text determine the comfortable base size and line height. Chrome becomes denser around the document, never at its expense.

## Elevation

Lumenfold is flat by default. Depth comes from tonal surface changes, dividers, selection fills, and spatial hierarchy rather than ambient shadows. Menus, popovers, and dialogs may use one compact structural shadow when they must sit above the workspace; cards and page sections may not use shadow as decoration.

### Named Rules

**The Tonal Layering Rule.** A pane earns separation through surface and boundary contrast before it earns shadow.

**The Honest Surface Rule.** The introduction presents the actual workspace full-bleed. It must not disguise the product inside a glossy device mockup, floating glass panel, or ornamental card.

## Do's and Don'ts

### Do:

- **Do** let the introduction be cleaner and bolder than the product while preserving compatible typography, icons, and semantic hierarchy. Its quiet neutral palette may remain separate from the workspace themes.
- **Do** use Braun and Dieter Rams as a discipline: honest function, strong composition, minimal controls, and color with a job.
- **Do** show one real source moving through question, citation, approved note, review, and connection.
- **Do** keep the product calm, compact, predictable, and visibly capable.
- **Do** use familiar icon controls with tooltips and visible focus states.
- **Do** keep both themes structurally identical and verify text and heading contrast independently in each.
- **Do** collapse rails and panes structurally for smaller screens rather than scaling type with viewport width.

### Don't:

- **Don't** add forced tours, disposable onboarding checklists, motivational nags, celebratory interruptions, or chatty controls.
- **Don't** hide essential functions or add one-time UI that becomes clutter after first use.
- **Don't** turn the workspace into a marketing surface or narrate Lumenfold's philosophy while the learner is working.
- **Don't** use warm cream backgrounds, stark monochrome, gradients, glassmorphism, decorative grid backgrounds, or floating color blobs.
- **Don't** use identical card grids, nested cards, oversized rounded containers, or border-plus-wide-shadow ghost cards.
- **Don't** use decorative motion in the product or repeated fade-on-scroll entrances in the introduction.
- **Don't** use color as the only carrier of meaning, even when heading ranks and learning states have stable hues.
