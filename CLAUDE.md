# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern React-based social landing page for Russ McKendrick deployed at https://www.russ.social/. The site serves as a centralized hub linking to all social media profiles and professional platforms with beautiful animations and a configuration-driven architecture.

## Architecture

### React + TypeScript + Vite + Framer Motion
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Animations**: Framer Motion for smooth, professional animations
- **Styling**: Custom CSS with modern features (no Tailwind - switched to vanilla CSS)
- **Icons**: Dynamic React Icons system supporting multiple libraries
- **Configuration**: Centralized TypeScript configuration file

### Key Components
- **App.tsx**: Main landing page with Framer Motion animations and profile section
- **SocialLink.tsx**: Individual social link with hover effects, spring animations, and shine effects
- **SocialIcon.tsx**: Dynamic icon loader with Suspense and error handling
- **config.ts**: Central configuration for all social links, colors, icons, and profile data
- **utils/iconLoader.ts**: Smart dynamic icon loading system supporting 5 icon libraries

### Dynamic Icon System
The icon loader automatically detects and loads icons from multiple libraries:
- **FontAwesome 6** (`Fa*`): Most common icons like `FaGithub`, `FaLinkedin`
- **Simple Icons** (`Si*`): Brand icons like `SiApplemusic`, `SiDiscogs`, `SiPackt`
- **Tabler Icons** (`Tb*`): Clean modern icons like `TbTools`, `TbMail`
- **Remix Icons** (`Ri*`): Alternative icons like `RiMacFill`, `RiTwitterFill`
- **Material Design** (`Md*`): Google's material icons like `MdEmail`, `MdPhone`

### Animation System
Built with Framer Motion providing:
- **Page Load**: Smooth fade-in with orchestrated timing
- **Profile Section**: Spring-based avatar bounce and text reveals
- **Social Links**: Staggered animations with 100ms delays
- **Hover Interactions**: Scale, shadow, rotation, and shine effects
- **Performance**: Hardware-accelerated animations with proper cleanup

## Common Development Commands

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Configuration Management

### Social Links Structure
All social links are managed through `src/config.ts` with this structure:

```typescript
{
  type: "platform-name",    // Unique identifier
  href: "https://...",      // Target URL
  text: "Display Name",     // Button text
  icon: "IconName",         // React Icon component name
  colors: {
    primary: "#color1",     // Gradient start
    secondary: "#color2",   // Gradient middle
    tertiary: "#color3"     // Gradient end
  }
}
```

### Adding New Social Platforms
1. Add new entry to `siteConfig.author.links` array
2. Choose appropriate icon from supported libraries
3. Define brand-appropriate gradient colors
4. Icon will load automatically via dynamic import system

### Profile Configuration
- **Name**: Main heading text
- **Headline**: Subtitle/description text  
- **Image**: Avatar/profile image path
- **Links**: Array of social platform configurations

## Styling Architecture

### CSS Organization
- **index.css**: All custom styles with modern CSS features
- **Component-Specific**: Styles are scoped to components
- **Responsive**: Mobile-first design with breakpoints
- **Performance**: Minimal CSS with hardware acceleration

### Color System
- **Dynamic Gradients**: Generated from config colors
- **Theme Colors**: Purple gradient background with dark theme
- **Brand Colors**: Authentic colors for each social platform
- **Accessibility**: High contrast ratios for readability

### Animation Performance
- **Framer Motion**: Optimized spring physics and easing
- **Hardware Acceleration**: transform and opacity changes only
- **Reduced Motion**: Respects user preferences
- **Memory Management**: Proper cleanup of animation timers

## Deployment

### Cloudflare Pages Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18+
- **Environment**: Production optimized

### Build Output
- **Bundle Size**: ~202KB (65KB gzipped)
- **Icon Loading**: Lazy-loaded chunks for optimal performance
- **PWA Assets**: Favicon, manifest, and meta tags included

## File Structure Notes

```
src/
├── components/           # React components
│   ├── SocialIcon.tsx   # Dynamic icon loader with Suspense
│   ├── SocialLink.tsx   # Animated social link component  
│   └── index.ts         # Component barrel exports
├── utils/               # Utility functions
│   └── iconLoader.ts    # Smart icon loading system
├── config.ts            # Central site configuration
├── App.tsx              # Main app with Framer Motion
├── index.css            # Custom CSS styles
└── main.tsx             # Application entry point

public/
├── favicon.ico          # Main favicon
├── favicon-*.png        # PNG favicon variants
├── apple-touch-icon.png # iOS home screen icon
├── android-chrome-*.png # Android PWA icons
├── site.webmanifest     # PWA manifest with theme colors
└── sticker-clear.svg    # Profile avatar image
```

## Development Notes

### Icon System
- Icons are loaded dynamically based on prefix detection
- Fallback system provides `FaLink` for missing icons
- Console warnings help debug missing or incorrect icon names
- Suspense boundaries provide loading states

### Animation Guidelines  
- Use spring animations for natural feel
- Stagger timing prevents overwhelming users
- Hover states provide clear interaction feedback
- Performance optimized with transform and opacity only

### Configuration Updates
- All social platforms configured in single file
- Type safety prevents configuration errors
- Hot reload works for all config changes
- Colors support hex codes and CSS color names

### PWA Features
- Web manifest configured with proper theme colors
- Favicon system supports all device types
- SEO meta tags included for social sharing
- Open Graph and Twitter Card support

## Performance Considerations

### Bundle Optimization
- Icons loaded only when needed via dynamic imports
- Framer Motion tree-shaking enabled
- Production build includes automatic optimizations
- Gzip compression reduces transfer size significantly

### Runtime Performance
- Animations use hardware acceleration
- Component memoization where beneficial  
- Efficient re-render patterns with React 18
- Proper cleanup of animation listeners