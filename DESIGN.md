---
version: "alpha"
name: "Russ Social Dashboard"
description: "A compact, glassy personal dashboard design system for Russ McKendrick's social landing page."
colors:
  primary: "#0969DA"
  primary-soft: "#EAF3FF"
  surface: "#F6F8FA"
  surface-subtle: "#EEF3F8"
  panel: "#FFFFFF"
  on-surface: "#1F2328"
  muted: "#59636E"
  subtle: "#6E7781"
  border: "#D0D7DE"
  control: "#8C959F"
  window-red: "#FF5F57"
  window-yellow: "#FFBD2E"
  window-green: "#28C840"
typography:
  display-sm:
    fontFamily: "Space Grotesk"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0em
  heading-sm:
    fontFamily: "Space Grotesk"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  card-title:
    fontFamily: "Inter"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0em
  body-md:
    fontFamily: "Inter"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  label-sm:
    fontFamily: "Inter"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0em
  label-xs:
    fontFamily: "Inter"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.18em
  mono-xs:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  page-max: 1440px
components:
  app-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  page-container:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    width: "{spacing.page-max}"
    padding: "{spacing.xl}"
  glass-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  section-heading:
    textColor: "{colors.on-surface}"
    typography: "{typography.display-sm}"
  profile-copy:
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  social-link:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  social-link-hover:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  icon-button:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.subtle}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    size: 32px
  icon-button-hover:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    size: 32px
  browser-frame:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.xl}"
    padding: "{spacing.sm}"
  browser-titlebar:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.subtle}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  content-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-surface}"
    typography: "{typography.card-title}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  media-frame:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xs}"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.on-surface}"
    height: 1px
  control-chip:
    backgroundColor: "{colors.control}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-xs}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  window-close:
    backgroundColor: "{colors.window-red}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 10px
  window-minimize:
    backgroundColor: "{colors.window-yellow}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 10px
  window-zoom:
    backgroundColor: "{colors.window-green}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: 10px
  footer-link:
    textColor: "{colors.subtle}"
    typography: "{typography.mono-xs}"
---

# Russ Social Design System

## Overview

Russ Social should feel like a polished personal operating dashboard: compact, calm, technical, and approachable. The interface presents a lot of links and media without feeling heavy, using glass panels, small system-style controls, and crisp typography to make the page feel curated rather than promotional.

The visual personality is influenced by GitHub-style neutrals, macOS window chrome, and a bento dashboard rhythm. Brand color appears as a functional blue for interaction and navigation, while individual social services and media covers bring their own color as content.

## Colors

- **Primary `#0969DA`:** The main interactive blue for hover states, active links, icon controls, and focused actions.
- **Primary soft `#EAF3FF`:** A pale blue tint used for selected or hovered informational chips.
- **Surface `#F6F8FA`:** The page background and browser-frame foundation.
- **Surface subtle `#EEF3F8`:** Secondary panels, image placeholders, scroll containers, and quiet contrast behind media.
- **Panel `#FFFFFF`:** Card interiors and controls. Use with translucent treatment in code where the glass effect is needed.
- **Text neutrals `#1F2328`, `#59636E`, `#6E7781`:** Primary text, body-muted text, and tiny metadata respectively.
- **Border `#D0D7DE`:** One-pixel panel separation, dividers, and compact grid boundaries.
- **Window controls `#FF5F57`, `#FFBD2E`, `#28C840`:** Small decorative browser chrome dots only.

Dynamic social brand colors should come from `siteConfig.author.links[].iconColor`. Treat those as content-level accents, usually expressed as icon color and a 10-14% hover tint, rather than expanding the global palette.

## Typography

- **Display and section headings:** Space Grotesk, semibold, compact line height. Use it for dashboard section titles and the profile name.
- **Body and card copy:** Inter, regular or bold depending on hierarchy. Keep body text small, relaxed, and scannable.
- **Metadata:** Inter or monospace at 10-12px. Uppercase metadata may use positive tracking for host labels, tags, dates, footer links, and browser title text.
- **Line length:** Card text should clamp aggressively; titles usually stay to two lines and summaries to three.

## Layout

The page is a constrained dashboard shell with a maximum width of 1440px, small mobile padding, and denser desktop spacing. Desktop uses a 12-column composition: a narrow profile/social rail and a wider content area for blog posts, records, and books.

Use 16px gaps as the default rhythm, moving to 24px only for desktop section separation. Scrollable lanes are part of the layout language: horizontal for latest posts, vertical for records and books, with visible compact controls instead of large navigation elements.

## Elevation & Depth

Depth comes from glass treatment rather than heavy shadows. The base card pattern is a translucent white panel, 16px backdrop blur, a one-pixel neutral border, and a soft shadow equivalent to `0 18px 40px rgba(31, 35, 40, 0.08)`.

Hover depth should be small and tactile: translate content cards up by roughly 2px and increase the shadow slightly. Do not stack multiple shadow systems in the same component.

## Shapes

Cards and scroll panels use 12px corners. Media inside cards uses 8px corners, while very small framed elements may use 4-6px.

Use fully rounded shapes only for avatars, icon buttons, browser pills, status dots, and compact chips. Avoid oversized pill shapes for regular cards or content containers.

## Components

- **Glass card:** The default container for profile, records, books, and post cards. It should feel light, bordered, and slightly frosted.
- **Social link:** A compact row with a service icon, truncated label, and outbound arrow. Hover states tint the row with the service color, while keeping the layout fixed.
- **Post card:** A glass card with browser chrome, host pill, category chip, 16:9 media, title, summary, and tiny metadata footer.
- **Record card:** A square album image over a compact title/artist block. Let album art carry the color.
- **Book card:** A cover-forward tile with a small title row and outbound arrow. Use subtle lift and image scale on hover.
- **Icon button:** A 32px circular control with a border, white panel fill, and subdued icon color that turns primary blue on hover.
- **Browser chrome:** Small red/yellow/green dots and centered title pills create the site’s operating-system motif. Keep them tiny and precise.

## Do's and Don'ts

- Do keep the first screen dense and useful; this is a working personal dashboard, not a marketing landing page.
- Do use real content imagery, album art, book covers, avatars, and blog images as the expressive layer.
- Do keep card corners, borders, and shadows consistent so the page reads as one system.
- Do use social brand colors sparingly for icons and hover tints, not as large background blocks.
- Don't introduce large hero sections, decorative gradient blobs, or oversized explanatory copy.
- Don't make cards fight the content with heavy chroma, thick borders, or dramatic hover motion.
- Don't use nested card frames unless a browser-chrome treatment is part of the component.
- Don't let dynamic labels resize the grid; truncate, clamp, or scroll instead.
