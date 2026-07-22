<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

---
name: "AI Amazon Listing Generator"
description: "极速生成高质量亚马逊 Listing 的 AI SaaS 工具"
colors:
  primary: "#2b53f0"
  primary-hover: "#1e3fcc"
  accent: "#e64d03"
  ink: "#1a1c24"
  muted: "#676b7c"
  border: "#dddfe3"
  bg: "#ffffff"
  surface: "#f4f5f7"
  success: "#119d3e"
  warning: "#ce6c02"
  error: "#d11a1f"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  input-default:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: AI Amazon Listing Generator

## 1. Overview

**Creative North Star: "The Precision Instrument"**

This design system serves a professional AI SaaS tool for Amazon sellers — a precision instrument for a high-stakes task. Every visual decision supports speed, clarity, and trust. The interface should feel like a well-made tool: nothing extraneous, everything intentional.

The system is restrained by design. A bright blue primary anchors the brand identity, appearing on buttons, links, and key interactive elements — never more than 10% of any screen. A warm coral accent provides a single complementary counterpoint for status badges, highlights, and secondary calls-to-action. The rest is pure white space, clean typography, and subtle borders.

This system explicitly rejects decorative flourish: no gradient text, no glassmorphism, no oversized border-radius cards, no dark sci-fi aesthetics. It draws from Jasper.ai's clean SaaS clarity and Linear's precision-tool sensibility. The feel is professional, efficient, and trustworthy — like a well-organized workshop, not a marketing billboard.

**Key Characteristics:**
- Restrained color: one primary accent at ≤10% surface coverage, one complementary accent for status
- Pure white background with subtle cool-neutral panels
- Clean sans-serif typography with tight hierarchy
- Flat-by-default elevation with minimal, purposeful shadows
- Sharp but not aggressive: gentle radius, precise spacing

## 2. Colors

The palette is built around a bright blue primary and a warm coral accent, grounded by pure white and near-black ink. Every color has a specific functional role; nothing is decorative.

### Primary
- **Bright Blue** (oklch(0.53 0.230 255) / #2b53f0): The brand's single saturated voice. Used on primary buttons, active navigation states, key interactive elements, and the primary CTA. Always paired with white text. Appears on ≤10% of any screen — its restraint is the point.

### Accent
- **Warm Coral** (oklch(0.57 0.200 50) / #e64d03): A warm counterpoint to the cool blue. Used for status badges, notification indicators, secondary highlights, and pricing-tier accents. Saturated enough to read as intentional, warm enough to feel approachable. White text on filled badges.

### Neutral
- **Pure White** (oklch(1.00 0.000 0) / #ffffff): The background. No hidden warmth, no tint. The brand personality lives in blue and coral, not in the surface.
- **Cool Panel** (oklch(0.97 0.003 255) / #f4f5f7): Card backgrounds, sidebar panels, section dividers. Barely perceptible coolness pulled toward the brand hue.
- **Ink** (oklch(0.15 0.006 255) / #1a1c24): Body text. Near-black with the faintest blue undertone. Contrast ≥12:1 against pure white.
- **Muted** (oklch(0.52 0.004 255) / #676b7c): Secondary text, placeholders, captions. Contrast ≥4.5:1 against pure white.
- **Border** (oklch(0.88 0.003 255) / #dddfe3): Divider lines, input borders, card strokes. Light enough to recede, present enough to define edges.

### Semantic
- **Success Green** (oklch(0.55 0.180 150) / #119d3e): Listing published, generation complete, positive status.
- **Warning Amber** (oklch(0.61 0.205 70) / #ce6c02): Listing needs review, quota warning.
- **Error Red** (oklch(0.47 0.205 25) / #d11a1f): Generation failed, validation errors, destructive actions.

### Named Rules
**The One Voice Rule.** The bright blue primary is used on ≤10% of any given screen. Its rarity is the point. If more than one in ten interactive elements carries the primary color, the palette has lost its restraint.

**The Pure Surface Rule.** The background is pure white (oklch(1.00 0 0)), exactly. No cream, no sand, no "warm white." The brand's warmth lives in blue and coral, not in the surface. A tinted background makes a SaaS tool feel like a lifestyle blog.

**The White-Text-on-Color Rule.** Any text placed on a saturated color fill (primary buttons, accent badges, semantic pills) must be white or near-white. Dark text on a saturated mid-tone fill reads as muddy, regardless of what WCAG contrast numbers say.

## 3. Typography

**Font Family:** Inter (system fallback: system-ui, -apple-system, sans-serif)

**Character:** Inter is a pragmatic workhorse — highly readable at small sizes, confident at display sizes, with a neutral personality that gets out of the way. A single family across all roles keeps the tool feeling cohesive and fast. No serif pairing, no display font; this is a precision instrument, not a magazine.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.15): Hero headings on the landing page. Used once per page, if at all. Letter-spacing: -0.02em. Always `text-wrap: balance`.
- **Headline** (600, clamp(1.5rem, 3vw, 2rem), 1.25): Section titles, page headings. `text-wrap: balance`.
- **Title** (600, 1.125rem, 1.4): Card titles, panel headers, modal titles.
- **Body** (400, 1rem, 1.6): All running text. Max line length 65-75ch. For long-form descriptions, `text-wrap: pretty`.
- **Label** (500, 0.8125rem, 1.4, letter-spacing 0.01em): Form labels, input placeholders, navigation items, metadata.

### Named Rules
**The Single Voice Rule.** One type family, one voice. Inter carries every role from hero to footnote. No pairing, no mixing. Consistency is clarity.

**The Balance Rule.** All h1-h3 headings use `text-wrap: balance` for even line distribution. Long prose blocks use `text-wrap: pretty` to reduce orphans.

## 4. Elevation

This system is **flat by default**. Surfaces at rest carry no shadow. Depth is conveyed through tonal layering: the pure white background with cool-tinted panels (cards, sidebars) creates a subtle foreground-background relationship without the visual weight of shadows.

**The Flat-by-Default Rule.** Surfaces are flat at rest. Elevation (a single subtle shadow, `0 2px 8px rgba(0,0,0,0.08)`) appears only as a response to interaction — dropdown menus, modals, tooltips. If an element isn't floating above the page content, it doesn't cast a shadow.

### Shadow Vocabulary
- **Dropdown** (`box-shadow: 0 4px 16px rgba(0,0,0,0.10)`): Select menus, autocomplete panels, popovers. Elevates content above the page.
- **Modal backdrop** (backdrop with `rgba(0,0,0,0.40)`): Behind dialogs and modal sheets.
- **Modal** (`box-shadow: 0 8px 32px rgba(0,0,0,0.12)`): Dialog surfaces themselves.
- **Tooltip** (`box-shadow: 0 2px 8px rgba(0,0,0,0.10)`): Small floating hints.

## 5. Components

Since the project is pre-implementation, component specifications below are proposed defaults consistent with the visual system. They will be refined once real components are built.

### Buttons
- **Shape:** Rounded corners at 8px (`rounded.md`). Subtle curve — not sharp, not pill-shaped.
- **Primary:** Bright blue background, white text, 12px vertical / 24px horizontal padding. Font: 500 weight, 0.875rem. Hover shifts to darker blue with a 150ms ease-out transition. Focus-visible: 2px blue ring with 2px offset.
- **Ghost:** Transparent background, ink text, same padding. Hover: cool panel background. Used for secondary actions alongside primary buttons.
- **Size variants:** Default (12px/24px), large (14px/32px for hero CTAs), small (8px/16px for inline actions).

### Inputs
- **Style:** 1px border stroke, pure white background, 8px radius. 10px vertical / 14px horizontal padding. Font: body size.
- **Focus:** Border shifts to bright blue, with a 2px blue ring at 2px offset. Transition: 150ms ease-out.
- **Placeholder:** Muted text color. Must meet ≥4.5:1 contrast against white.
- **Error:** Border shifts to error red. Error message in error red, 0.8125rem, below the input.
- **Disabled:** Reduced opacity (0.50), cursor not-allowed.

### Cards
- **Style:** Cool panel background, 12px radius, no border, no shadow at rest. 24px internal padding.
- **Interactive cards** (clickable): Hover adds a subtle border in blue at 20% opacity. Cursor pointer. No shadow — elevation change alone is enough.

### Navigation
- **Top nav:** Pure white background, 1px bottom border. Items in label size (0.8125rem, 500 weight). Active item in bright blue. Hover: shift to ink with 150ms transition.
- **Sidebar (if used):** Cool panel background, 1px right border. Same typography as top nav.
- **Mobile:** Collapses to hamburger with slide-out drawer.

### Chips / Badges
- **Status badges:** Small rounded pills (full radius). Semantic colors with white text for filled variants; semantic background at 10% opacity with semantic text for outlined variants. Font: 0.75rem, 500 weight.

### Tooltips
- **Style:** Ink background, white text, 6px radius, 8px/12px padding. Font: 0.75rem. Arrow pointing to trigger element.

## 6. Do's and Don'ts

### Do:
- **Do** use pure white (oklch(1.00 0 0)) as the page background. No tints, no "warm white."
- **Do** keep the bright blue primary on ≤10% of any screen. Let white space do the work.
- **Do** use white text on any saturated color fill (buttons, badges, pills).
- **Do** use `text-wrap: balance` on all h1-h3 headings.
- **Do** keep body text within 65-75ch max line length.
- **Do** use tonal layering (white bg + cool panels) instead of shadows for depth at rest.
- **Do** respect the flat-by-default rule: shadows only for floating elements (dropdowns, modals, tooltips).
- **Do** ensure all text meets WCAG 2.1 AA contrast: ≥4.5:1 for body, ≥3:1 for large text.

### Don't:
- **Don't** use gradient text, glassmorphism, or any purely decorative visual effects. These violate the "anti-花哨/过度装饰" principle from PRODUCT.md.
- **Don't** use dark mode or dark-themed interfaces with neon accents or terminal aesthetics. This product is not a developer tool or a sci-fi dashboard.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards or list items.
- **Don't** pair `border: 1px solid` with `box-shadow` blur ≥16px on the same element — the ghost-card pattern. Pick one.
- **Don't** use border-radius larger than 16px on cards or sections. 12px is the ceiling.
- **Don't** use identical card grids with icon + heading + text repeated endlessly. Vary the layout rhythm.
- **Don't** put a tiny uppercase tracked eyebrow ("ABOUT" / "FEATURES" / "PRICING") above every section. One named kicker as a deliberate brand system is voice; an eyebrow on every section is a cliché.
- **Don't** use cream, sand, beige, or any warm-tinted surface as the page background. The surface is pure white.
- **Don't** animate CSS layout properties (width, height, top, left). Use `transform` and `opacity` only.
- **Don't** ship animations without a `@media (prefers-reduced-motion: reduce)` fallback.
