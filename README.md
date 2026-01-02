# Russ Social

Modern React-based social landing page for Russ McKendrick, deployed at [https://www.russ.social/](https://www.russ.social/).

## Features

- **Bento Grid Layout**: Dynamic responsive grid (2/4/6/8 columns) with configurable sections
- **Modern Stack**: React 18 with TypeScript, Vite, and Tailwind CSS v4
- **Dynamic Content**: Fetches latest blog posts (RSS) and record collection (JSON)
- **Random Avatars**: 50+ custom avatar variations displayed randomly
- **Configuration-Driven**: All content, sections, and styling managed through `src/config.ts`
- **Responsive Design**: Mobile-first with smooth transitions between breakpoints
- **Section Headers**: Smart headers that fill remaining row space with accent colors

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons (Simple Icons, Lucide, FontAwesome)
- **Deployment**: Cloudflare Pages

## Bento Grid Sections

The page displays content in a configurable bento grid layout:

| Section | Description | Size |
|---------|-------------|------|
| **Profile** | Name, headline, random avatar | 2x2 |
| **Links** | Social media and platform links | 1x1 each |
| **Blog** | Latest posts with OG images | 2x1 each |
| **Books** | Published books with covers | 1x1 each |
| **Records** | Recent vinyl additions | 1x1 each |

Section order is configurable via `sectionOrder` in config.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run lint
```

## Configuration

### Site Config Structure

All content is managed through `src/config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  title: "Your Name",
  sectionOrder: ['links', 'blog', 'books', 'records'],
  footer: {
    text: "Your footer text",
    showSource: true,
    sourceUrl: "https://github.com/..."
  },
  author: {
    name: "Your Name",
    headline: "Your tagline",
    image: "/avatar.svg",
    links: [...]
  },
  blogFeed: { ... },
  bookShelf: { ... },
  recordWall: { ... }
}
```

### Social Links

Each link supports:
- `type`: Unique identifier
- `href`: Target URL
- `text`: Display text
- `icon`: `{ name, library }` - supports 'simple', 'lucide', 'fa'
- `iconColor`: Hex color for the icon
- `size`: Card size ('1x1', '2x1', '2x2')
- `accent`: Color theme ('blue', 'pink', 'green', 'purple', 'orange', 'gray')

### Section Headers

Headers appear after each section to introduce the next:
- Automatically fill remaining columns in the row
- Configurable accent colors (inverted - dark bg, light text)
- Can be enabled/disabled per section

### Avatars

Random avatars are selected from `/public/avatars/` on each page load. Add SVG files to this directory to expand the selection.

## File Structure

```
src/
├── components/
│   ├── BentoGrid.tsx     # Main grid layout with responsive spans
│   ├── ProfileCard.tsx   # Profile with random avatar
│   ├── LinkCard.tsx      # Social link cards with borders
│   ├── PostCard.tsx      # Blog posts with OG images
│   ├── BookCard.tsx      # Book covers
│   ├── RecordCard.tsx    # Vinyl records
│   ├── HeaderCard.tsx    # Section headers with colors
│   └── index.ts
├── hooks/
│   └── useMixedContent.ts # Data fetching and section ordering
├── types/
│   └── collection.ts      # Type definitions
├── config.ts              # Central configuration
├── App.tsx                # Root component
├── index.css              # Tailwind + custom CSS
└── main.tsx               # Entry point

public/
├── avatars/               # 50+ avatar SVG variations
├── favicon.ico
├── apple-touch-icon.png
└── site.webmanifest
```

## Deployment

### Cloudflare Pages (Automated)

Deployments are automated via GitHub Actions on push to `main`:

1. Push changes to the `main` branch
2. GitHub Actions builds and deploys automatically
3. Site updates at https://www.russ.social/

### Manual Deployment

```bash
pnpm run build
# Upload dist/ to Cloudflare Pages
```

## Customization

### Adding New Sections

1. Create a new card component in `src/components/`
2. Add section config to `SiteConfig` interface
3. Update `useMixedContent.ts` to include the section
4. Add to `sectionOrder` in config

### Styling

- **Colors**: Update accent colors in config or `HeaderCard.tsx`
- **Grid**: Modify breakpoints in `BentoGrid.tsx`
- **Cards**: Each card component has its own styling

## Performance

- **Bundle**: ~22KB CSS, ~18KB JS (gzipped)
- **Icons**: Tree-shaken, only used icons included
- **Images**: OG images loaded directly without overlay processing
- **Grid**: CSS Grid with `grid-flow-dense` for optimal packing
