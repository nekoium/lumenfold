---
name: Lumenfold
description: A calm continuous-learning workspace with a bold, honest introduction.
---

<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Lumenfold

## Overview

**Creative North Star: "The Quiet Learning Instrument"**

Lumenfold should feel like a precise personal instrument that becomes familiar through use. The workspace follows Obsidian Nord's balance of compact information, soft surfaces, friendly color, and quiet interaction. It practices silent competence: essential objects and actions remain visible, while the interface avoids narration, celebration, and interruption.

The introduction uses the same visual language at a different intensity. It is cleaner, bolder, and more composed, drawing from Braun and Dieter Rams through honest product presentation, disciplined geometry, decisive spacing, and purposeful color. A large real workspace carries the first viewport, and one concrete inquiry demonstrates the continuing path from source to cited answer, accepted note, review, and connection.

The MVP is desktop-first and responsive. Its three working regions collapse structurally on smaller screens rather than shrinking typography. Introduction motion may choreograph one source-to-note sequence; product motion communicates state only. Reduced-motion presentation must preserve the full narrative without animation.

**Key Characteristics:**

- Quiet, capable, and friendly inside the product.
- Clean, bold, and inspiring on the introduction page.
- Dark by default, with an equally intentional light theme.
- Information-dense without visual pressure.
- Real product behavior instead of abstract decoration.
- Familiar controls, restrained geometry, and durable visual hierarchy.

## Colors

The palette combines Obsidian Nord dark's softened blue-gray atmosphere with Rosé Pine Dawn's gentler light surfaces. Exact OKLCH tokens will be resolved and contrast-tested during implementation.

### Primary

- **Polar Night** ([to be resolved during implementation]): the default dark canvas and the dominant field in the introduction hero.
- **Learning Coral** ([to be resolved during implementation]): the brand anchor and primary command color, descended from Nord's warm red and orange family.

### Secondary

- **Frost Blue** ([to be resolved during implementation]): selection, focus, navigation, citations, and grounded-source relationships.
- **Quiet Teal** ([to be resolved during implementation]): supportive learning states and lower-rank Markdown hierarchy.

### Tertiary

- **Recall Gold** ([to be resolved during implementation]): review timing, emphasis, and the second Markdown heading rank.
- **Connection Moss** ([to be resolved during implementation]): accepted notes, successful persistence, and the third Markdown heading rank.
- **Reflective Plum** ([to be resolved during implementation]): note links and the fourth Markdown heading rank.

### Neutral

- **Snow Reading Surface** ([to be resolved during implementation]): the highest-clarity dark-theme text and document tone.
- **Dawn Canvas** ([to be resolved during implementation]): the Rosé Pine-inspired light workspace background, soft without becoming cream or cold white.
- **Dawn Surface** ([to be resolved during implementation]): light-theme source and note reading surfaces.
- **Quiet Ink** ([to be resolved during implementation]): primary light-theme text with strong reading contrast.
- **Structural Divider** ([to be resolved during implementation]): low-contrast boundaries between rails, panes, toolbars, and files.

### Named Rules

**The Two Atmospheres Rule.** Dark mode originates in Obsidian Nord; light mode originates in Rosé Pine Dawn. Layout, spacing, components, and semantic roles never change between them.

**The Consistent Spectrum Rule.** Markdown headings keep one semantic hue sequence across both themes: H1 coral, H2 ochre, H3 moss, H4 plum, H5 teal, and H6 blue. Light-mode tones must be darkened as needed to reach at least 4.5:1 contrast on the reading surface; literal RGB matching is forbidden when it harms readability.

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

- **Do** let the introduction be cleaner and bolder than the product while preserving the same palette, typography, icons, and semantic hierarchy.
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
