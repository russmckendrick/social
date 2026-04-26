# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Modern React-based social landing page for Russ McKendrick deployed at https://www.russ.social/. The site displays a bento grid layout with social links, blog posts, books, and vinyl records - all configuration-driven with dynamic content fetching.

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with custom CSS
- **Icons**: React Icons (Simple Icons, Lucide, FontAwesome)
- **Deployment**: Cloudflare Pages via GitHub Actions

### Bento Grid System
The layout uses CSS Grid with responsive columns:
- **Mobile**: 2 columns
- **Tablet (md)**: 4 columns
- **Desktop (lg)**: 6 columns
- **Large (xl)**: 8 columns

Grid uses `grid-flow-dense` for optimal item packing.

### Key Components

| Component | Purpose |
|-----------|---------|
| `BentoGrid.tsx` | Main grid layout, calculates header spans, renders all cards |
| `ProfileCard.tsx` | 2x2 profile card with random avatar selection |
| `LinkCard.tsx` | Social link cards with accent colors and borders |
| `PostCard.tsx` | Blog posts displaying OG images |
| `BookCard.tsx` | Book covers with hover effects |
| `RecordCard.tsx` | Vinyl record artwork |
| `HeaderCard.tsx` | Section headers with inverted accent colors |

### Data Flow

1. `useMixedContent.ts` hook fetches external data (RSS feed, JSON)
2. Combines with static config data (links, books)
3. Orders sections based on `siteConfig.sectionOrder`
4. Inserts headers between sections to fill row remainders
5. `BentoGrid.tsx` calculates responsive spans and renders

## Common Development Commands

```bash
# Local Development
pnpm run dev

# Production Build
pnpm run build

# Type Checking
pnpm run lint

# Preview Build
pnpm run preview
```

## Configuration System

### src/config.ts Structure

```typescript
interface SiteConfig {
  title: string;
  sectionOrder: SectionType[];  // ['links', 'blog', 'books', 'records']
  footer: { text, showSource, sourceUrl };
  author: { name, headline, image, links[] };
  blogFeed: { feedUrl, postCount, itemSize, header };
  bookShelf: { books[], itemSize, header };
  recordWall: { collectionUrl, recordCount, itemSize, header };
}
```

### Section Order
Change `sectionOrder` array to reorder sections. Headers automatically appear after each section to introduce the next.

### Header Configuration
Each section has a `header` config:
```typescript
header: {
  enabled: boolean;
  text: string;
  size: CardSize;      // Usually '2x1'
  color?: AccentColor; // 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'gray'
}
```

### Accent Colors
Used for links and headers:
- Links: Light background, dark text/border
- Headers: Dark background, light text (inverted)

## Header Span Calculation

Headers fill remaining row space. The algorithm in `BentoGrid.tsx`:

1. Track slot-units as items are added (1x1=1, 2x1=2, 2x2=4)
2. When header encountered, calculate: `cols - (slotUnits % cols)`
3. Apply responsive spans via CSS custom properties
4. CSS in `index.css` handles breakpoint-specific spans

Example at 8 columns:
- Profile (2x2) + 16 links = 20 slots
- 20 % 8 = 4, so header spans 4 cols

## Avatar System

`ProfileCard.tsx` randomly selects from `/public/avatars/` on mount:
- 50+ SVG avatar variations
- Selected via `Math.random()` in useEffect
- Add new SVGs to expand selection

## File Structure

```
src/
├── components/
│   ├── BentoGrid.tsx      # Grid layout + header span logic
│   ├── ProfileCard.tsx    # Random avatar selection
│   ├── LinkCard.tsx       # Accent colors + borders
│   ├── PostCard.tsx       # OG image display
│   ├── BookCard.tsx       # Book covers
│   ├── RecordCard.tsx     # Record artwork
│   ├── HeaderCard.tsx     # Inverted color headers
│   └── index.ts
├── hooks/
│   └── useMixedContent.ts # Data fetching + section ordering
├── types/
│   └── collection.ts
├── config.ts              # All site configuration
├── App.tsx
├── index.css              # Tailwind + header-cell CSS
└── main.tsx

public/avatars/            # 50+ avatar SVGs
```

## Styling Notes

### Design System
Read `DESIGN.md` before making visual or UX changes. It captures the current design system tokens and rationale for colors, typography, spacing, shapes, elevation, and component patterns.

When changing the site's visual language, update `DESIGN.md` in the same change so future agents have the current source of truth.

### Tailwind CSS v4
Uses `@import "tailwindcss"` syntax. Custom styles in `index.css`.

### Header Cell CSS
Custom CSS handles responsive header spans:
```css
.header-cell {
  grid-column: span var(--span-sm, 2);
}
@media (min-width: 768px) {
  .header-cell { grid-column: span var(--span-md, 4); }
}
/* etc for lg, xl */
```

### Card Styling Patterns
- Links: `bg-{color}-50 border border-{color}-600 text-{color}-600`
- Headers: `bg-{color}-600 text-{color}-50` (inverted)

## External Data Sources

| Source | URL | Used For |
|--------|-----|----------|
| Blog RSS | `russ.cloud/rss.xml` | Latest blog posts |
| Records JSON | `russ.fm/collection.json` | Vinyl collection |
| OG Images | `{post-url}-og.png` | Blog post thumbnails |

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggered on push to `main`
2. Installs dependencies with pnpm
3. Builds with Vite
4. Deploys to Cloudflare Pages

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Development Tips

### Adding a New Section
1. Add type to `SectionType` in config.ts
2. Add config interface and data
3. Create card component
4. Update `useMixedContent.ts` with data fetching
5. Add to `sectionOrder`

### Changing Section Order
Just reorder the `sectionOrder` array - headers automatically adjust.

### Modifying Grid Breakpoints
Update `gridCols` object in `BentoGrid.tsx` and corresponding Tailwind classes.

### Adding New Avatars
Drop SVG files in `/public/avatars/` and add filename to array in `ProfileCard.tsx`.
