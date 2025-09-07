# Russ Social

Modern React-based social landing page for Russ McKendrick, deployed at [https://www.russ.social/](https://www.russ.social/).

## Features

- **Modern Stack**: React 18 with TypeScript and Vite
- **Framer Motion**: Smooth, professional animations and transitions
- **Dynamic Icons**: Supports FontAwesome 6, Simple Icons, Tabler, Remix, and Material Design icons
- **Configuration-Driven**: All social links, colors, and icons managed through `src/config.ts`
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **PWA Ready**: Web manifest and proper favicon setup
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **Performance**: Lazy-loaded icons and optimized animations

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern features
- **Animations**: Framer Motion
- **Icons**: React Icons (multiple libraries)
- **Deployment**: Cloudflare Pages

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## Configuration

### Adding Social Links

All social links are configured in `src/config.ts`. Each link requires:

```typescript
{
  type: "platform-name",
  href: "https://example.com/profile",
  text: "Display Name",
  icon: "IconName", // Any React Icon (Fa*, Si*, Tb*, Ri*, Md*)
  colors: {
    primary: "#color1",   // Gradient start
    secondary: "#color2", // Gradient middle  
    tertiary: "#color3"   // Gradient end
  }
}
```

### Supported Icon Libraries

The dynamic icon loader supports:
- **FontAwesome 6**: `Fa*` (e.g., `FaGithub`, `FaLinkedin`)
- **Simple Icons**: `Si*` (e.g., `SiApplemusic`, `SiDiscogs`)
- **Tabler Icons**: `Tb*` (e.g., `TbTools`, `TbMail`)
- **Remix Icons**: `Ri*` (e.g., `RiMacFill`, `RiTwitterFill`)
- **Material Design**: `Md*` (e.g., `MdEmail`, `MdPhone`)

### Animation System

Built with Framer Motion for:
- **Page Load**: Fade-in with staggered content reveals
- **Social Links**: Individual animations with 100ms delays
- **Hover Effects**: Scale, shadow, and icon rotation
- **Profile Section**: Spring-based avatar and text animations

## Deployment

### Cloudflare Pages

The site is optimized for Cloudflare Pages deployment:

- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18+

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure your domain to point to the deployment

## File Structure

```
src/
├── components/
│   ├── SocialIcon.tsx    # Dynamic icon loader component
│   ├── SocialLink.tsx    # Individual social link with animations
│   └── index.ts          # Component exports
├── utils/
│   └── iconLoader.ts     # Dynamic icon loading system
├── config.ts             # Site configuration and social links
├── App.tsx               # Main application component
├── index.css             # Custom CSS styles
└── main.tsx              # Application entry point

public/
├── favicon.ico           # Site favicon
├── apple-touch-icon.png  # iOS home screen icon
├── site.webmanifest      # PWA manifest
└── sticker-clear.svg     # Profile avatar
```

## Customization

### Profile Information

Update your profile in `src/config.ts`:

```typescript
export const siteConfig = {
  title: "Your Name",
  author: {
    name: "Your Name",
    headline: "Your tagline or description",
    image: "/your-avatar.svg",
    links: [...]
  }
}
```

### Styling

- **Colors**: Update gradient backgrounds in `src/config.ts`
- **Animations**: Customize Framer Motion settings in components
- **Layout**: Modify CSS in `src/index.css`
- **Theme**: Update PWA theme colors in `public/site.webmanifest`

## Performance

- **Bundle Size**: ~202KB production build (65KB gzipped)
- **Icons**: Lazy-loaded on demand to reduce initial bundle
- **Animations**: Hardware-accelerated with Framer Motion
- **Images**: Optimized favicon and avatar loading