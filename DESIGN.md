---
version: "beta"
name: "Russ Social Bento"
description: "A bold, colour-blocked bento design system for Russ McKendrick's social landing page, with light and dark themes."
colors:
  light:
    bg: "#E7E8EB"
    tile: "#FFFFFF"
    tile-sunken: "#F4F5F7"
    tile-hover: "#EAEBEE"
    fg: "#121316"
    muted: "#5C6068"
    link-hover: "#2E46E6"
    invert: "#121316"
    invert-fg: "#FFFFFF"
    invert-muted: "#B5B8BF"
  dark:
    bg: "#0C0D10"
    tile: "#17181C"
    tile-sunken: "#1F2126"
    tile-hover: "#26282E"
    tile-border: "rgba(255, 255, 255, 0.06)"
    fg: "#ECEDEF"
    muted: "#9A9EA7"
    link-hover: "#A3AEF7"
    invert: "#ECEDEF"
    invert-fg: "#121316"
    invert-muted: "#4A4E56"
  shared:
    accent: "#2E46E6"
    accent-fg: "#FFFFFF"
    accent-muted: "#D7DCFF"
    lime: "#D5F05A"
    lime-fg: "#121316"
    lime-muted: "#2A2D1A"
  heatmap:
    light: ["#ECEDF0", "#C9D0FB", "#8E9CF4", "#5468EC", "#2E46E6"]
    dark: ["#24262C", "#26337A", "#3446B8", "#5468EC", "#A3AEF7"]
typography:
  display-xl:
    fontFamily: "Bricolage Grotesque"
    fontSize: 76px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.035em
  stat:
    fontFamily: "Bricolage Grotesque"
    fontSize: 64px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.04em
  display-md:
    fontFamily: "Bricolage Grotesque"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.02em
  tile-title:
    fontFamily: "Bricolage Grotesque"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  body-lg:
    fontFamily: "Geist"
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.45
  body-md:
    fontFamily: "Geist"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Geist"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.35
  meta:
    fontFamily: "Geist"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  tile: 28px
  cover: 14px
  chip: 16px
  icon: 10px
  full: 999px
spacing:
  gap: 16px
  tile-padding-x: 28px
  tile-padding-y: 24px
  page-max: 1280px
---

# Russ Social Design System

## Overview

Russ Social is a bento board: a grid of rounded tiles, a few of them painted in solid colour, the rest quiet so the content carries them. It should feel confident and a little playful (big type, a lime profile tile, one chunky number per stat) while staying useful. Everything a visitor wants is on the first screen or one scroll away, and nothing scrolls inside a box.

The expressive layer is real content: the illustrated sticker, blog cover art, album sleeves and book covers. The UI around it is flat, with no shadows, glass or window chrome.

## Colors

Colours are CSS custom properties in `src/index.css`. `:root` holds light values, and a `prefers-color-scheme: dark` media query overrides them, so components only reference `var(--token)` and never branch on the theme.

- **Ground `--bg`:** Cool grey in light mode, near-black in dark. Tiles sit on it with no border in light mode and a 6% white hairline in dark.
- **Tile `--tile`, `--tile-sunken`, `--tile-hover`:** White, light grey and hover grey in light mode, stepping up from the ground in dark. Use sunken for chips, repo rows and image placeholders inside a tile.
- **Lime `--lime`:** The signature colour, used only for the profile tile. It stays the same in both themes, as do its ink (`--lime-fg`) and muted copy (`--lime-muted`).
- **Cobalt `--accent`:** The brand blue. Used for the books stat tile, the "New post" badge, focus rings and the contribution heatmap. White text on it passes AA.
- **Invert `--invert`:** A tile that flips against the theme: ink with white text in light mode, near-white with ink text in dark. Used for the records stat tile.
- **Text `--fg`, `--muted`:** Primary and secondary copy. Muted passes 4.5:1 on every tile surface in both themes.
- **Link hover `--link-hover`:** Cobalt in light mode, a lighter periwinkle in dark so it stays readable.
- **Social brand colours** come from `siteConfig.author.links[].iconColor` and fill each link's icon square. Dark brand colours (GitHub, Medium, Discogs) get a faint ring in dark mode via `--icon-ring`.

Use at most two painted tiles per row. Lime, cobalt and invert should never sit next to each other in a way that makes the row feel like a flag.

## Typography

- **Display:** Bricolage Grotesque, weight 700–800, tight negative tracking. Use it for the name, stats, the featured post title and tile titles.
- **Body:** Geist, regular or medium. Use it for headlines, summaries, labels and metadata.
- **No all-caps tracked labels.** Metadata is sentence case at 13–14px in `--muted`.
- Titles clamp to two lines in lists and three in the featured post. Summaries clamp to three.

## Layout

- The page is a single grid, max 1280px wide, with 16px gaps and rows at least 200px tall.
- The grid has 1 column on phones, 2 from `sm` (640px) and 4 from `lg` (1024px).
- At `lg` the tile order is: profile (2×2), featured post (2×2) / records stat, books stat, new records (2×1) / Listened to This Week (4×1) / links (2×2), more posts (2×1), GitHub (2×1) / books (4×1).
- Tiles never scroll internally. Show a fixed slice (six records, three posts, two repos) and link out for the rest.
- The GitHub heatmap shows as many recent weeks as fit its tile, measured with a ResizeObserver, so it never scrolls sideways.

## Shapes & Depth

- Tiles use 28px corners. Covers and album art use 12–14px, link chips 16px, icon squares 10px. Badges and site buttons are fully rounded pills.
- There are no shadows. Depth comes from colour: a sunken surface inside a tile, a painted tile among white ones.
- Linked tiles lift 3px on hover, and images inside them scale 3–5%. Both effects are switched off under `prefers-reduced-motion`.

## Components

- **ProfileTile:** The lime 2×2 tile. The sticker sits top-left, cropped into an ink circle so its flat-bottomed bust never shows a hard edge. The name, headline and matching ink pill buttons (each site's own favicon plus host) for the `site` group links anchor the bottom. The favicons are vendored in `public/site-icons/` and must read on ink, so the russ.tools copy pins its stroke to the light colour. A site link without a `favicon` falls back to its icon in lime.
- **FeaturedPostTile:** The latest blog post, with a 2:1 cover, a cobalt "New post" badge, date and read time, display title and summary.
- **StatTile:** A single large number with a label and caption. Use the `invert` and `accent` tones.
- **RecordsTile:** The six newest records as square sleeves, plus a "Latest:" line naming the newest.
- **LinksTile:** The non-site links, grouped as Social and Code in one column and Listening and Writing in the other (a single column below 420px). Each row has a brand-coloured icon square, the service name and the handle, plus an arrow that shows on hover. A sunken "Prefer email? / Say hello" bar (the mailto from the RSS `managingEditor`) is pinned to the bottom, so the tile fills its 2-row slot without a dead gap.
- **TunesTile:** Full width. On the left (7fr) is the latest "Listened to This Week" post: a 21:9 cover, a cobalt "Week N" badge, the date with an "AI" note, the title and the description. On the right (5fr) is that week's album art as a 4×2 grid, then three previous weeks as rows. It stacks on phones.
- **PostsTile:** Three more posts, each with a thumbnail, title and date.
- **GitHubTile:** A cobalt contribution heatmap, the public repo count, and two repos (most-starred and most recently pushed).
- **BooksTile:** All books, newest first, as covers with titles, 7 per row at `lg`.
- **TileHeader:** A display title on the left and a muted "host ↗" link on the right.

## Theming

- The site always follows the visitor's OS light/dark setting, and there is no toggle.
- Light tokens live on `:root`. Dark overrides sit in `@media (prefers-color-scheme: dark)`, so switching the OS updates the page live with no JavaScript and no flash.
- `index.html` declares `color-scheme: light dark` and a `theme-color` meta for each scheme.
- Tailwind's `dark:` variant uses its default media query.
- The few components that need the scheme in JS (the GitHub heatmap) read it from `useColorScheme()`.
- Older versions saved a `theme` value in `localStorage`. Nothing reads it any more, so a stale value can't pin a visitor to one mode.

## Do's and Don'ts

- Do let content imagery and the three painted colours carry the personality.
- Do keep every interactive target at least 44px tall, and use real `<a>` and `<button>` elements.
- Do add new colours as tokens with both light and dark values, never as hard-coded hexes in components. The exceptions are the fixed white and ink site buttons on the lime tile.
- Don't reintroduce glass panels, drop shadows, macOS window chrome or tracked uppercase labels.
- Don't add scroll-inside-a-box lanes or carousel arrows. Link out instead.
- Don't paint more than two tiles in one row, or use lime anywhere but the profile tile.
- Don't place un-cropped bust or sticker art where its flat edge floats in the middle of a tile. Crop it into a shape or anchor it to an edge.
- Don't let a row-spanning tile end in empty space. Pin a footer action to the bottom, or rebalance the content.
