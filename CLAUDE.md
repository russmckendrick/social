# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal website for Russ McKendrick deployed at https://www.russ.social/. The site uses the "lynx" theme as a Git submodule and serves as a social landing page with links to various profiles and projects.

## Architecture

### Hugo Static Site Generator
- **Config**: `hugo.yaml` - Main configuration with site parameters, author info, and social links
- **Theme**: Uses the "lynx" theme installed as a Git submodule in `themes/lynx/`
- **Layout**: Custom main template at `layouts/index.html` overrides the theme's default layout
- **Assets**: Custom CSS at `assets/css/custom.css` provides link styling with gradient backgrounds and animations
- **Icons**: Custom SVG icons in `assets/icons/` for social platforms (blog, records, discogs, packt, apple-music)
- **Static Files**: Favicon and web app manifest files in `static/`

### Key Components
- **Author Profile**: Configured in `hugo.yaml` with name, headline, image, and social links
- **Social Links**: Extensive list of social media and professional profiles with custom styling
- **Custom Styling**: Gradient backgrounds and animations for different link types (Medium, Discogs, Apple Music, etc.)

## Common Development Commands

### Local Development
```bash
hugo server -D --bind=0.0.0.0 --baseURL=http://localhost
```

### Build Site
```bash
hugo --minify
```

### Theme Management
```bash
# Update theme submodule
git submodule update --remote themes/lynx

# Initialize submodules (for fresh clones)
git submodule update --init --recursive
```

## File Structure Notes

- Hugo follows standard conventions with `layouts/`, `assets/`, `static/`, and `archetypes/` directories
- The site overrides the theme's main layout with a custom `layouts/index.html`
- Custom CSS in `assets/css/custom.css` extends theme styling with branded link appearances
- All social platform icons are stored as SVGs in `assets/icons/`
- The site configuration in `hugo.yaml` drives the entire social links structure

## Development Workflow

1. Make changes to layouts, assets, or configuration
2. Test locally with `hugo server`
3. Build production version with `hugo --minify`
4. Deploy the generated `public/` directory to hosting platform