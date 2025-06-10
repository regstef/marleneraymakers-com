# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a luxury e-commerce platform for marleneraymakers.com, featuring sustainable made-to-measure fashion and art. The architecture uses SvelteKit for the frontend and Strapi as the backend CMS.

## Key Architecture Decisions

- **Frontend**: SvelteKit 5 with SSR/SSG
- **UI Library**: Bits UI (headless components)
- **Styling**: Open Props (CSS Custom Properties)
- **Forms**: Superforms with Zod validation
- **State Management**: Svelte Stores
- **Backend**: Strapi v5 (Headless CMS)
- **Payments**: Stripe
- **Email**: Brevo
- **Media**: Cloudinary
- **i18n**: Built-in pattern with [[lang]] routes
- **Analytics**: Plausible
- **Deployment**: Frontend on Vercel, Strapi on Railway/Render
- **Package Manager**: pnpm

## Product Types

The platform handles three distinct product types:
1. **Artwork**: Digital art pieces, one-time purchase, direct checkout
2. **Exclusives**: Custom outfits requiring consultation, no direct checkout
3. **Basics**: Made-to-measure clothing, standardized designs, direct checkout

## Development Commands

### Initial Setup (When starting from scratch)
```bash
# Create SvelteKit project
pnpm create svelte@latest frontend
cd frontend

# Install core dependencies
pnpm install

# Install Open Props and Bits UI
pnpm install open-props
pnpm install bits-ui

# Install additional dependencies
pnpm install sveltekit-superforms zod
pnpm install -D @sveltejs/adapter-vercel
```

### Daily Development
```bash
# Frontend development
cd frontend
pnpm dev        # Start dev server (http://localhost:5173 or 5174)
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm test       # Run Vitest tests
pnpm lint       # Run ESLint
pnpm check      # Run svelte-check for type checking
```

### Strapi Backend (when implemented)
```bash
cd backend
pnpm develop    # Start Strapi in development mode
pnpm build      # Build Strapi admin panel
pnpm start      # Start Strapi in production mode
```

## Project Structure

```
marleneraymakers.com/
├── docs/                # Project documentation
│   ├── EXECUTIVE-SUMMARY.md
│   ├── PROJECT-ROADMAP.md
│   └── SVELTEKIT-PROJECT-SETUP-GUIDE.md
├── frontend/            # SvelteKit application (to be created)
│   ├── src/
│   │   ├── routes/          # SvelteKit file-based routing
│   │   │   ├── [[lang]]/    # Optional language parameter
│   │   │   └── api/         # Server routes for Stripe/Brevo
│   │   ├── lib/
│   │   │   ├── components/  # Reusable Svelte components
│   │   │   ├── stores/      # Svelte stores for state
│   │   │   ├── i18n/        # Translation files
│   │   │   ├── utils/       # Helper functions
│   │   │   └── types/       # TypeScript definitions
│   │   ├── app.html         # HTML template
│   │   ├── app.css          # Global styles with Open Props
│   │   └── app.d.ts         # TypeScript declarations
│   └── static/              # Static assets
├── backend/             # Strapi CMS (to be created)
│   ├── src/
│   │   ├── api/             # Content types & controllers
│   │   ├── components/      # Shared components
│   │   └── plugins/         # Custom plugins
│   └── config/              # Strapi configuration
└── CLAUDE.md            # This file
```

## Design System

The project uses a minimalist luxury aesthetic with:
- **Fonts**: "Playfair Display" (headings), "Source Sans 3" (body)
- **Colors**: Only 3 - Black (#000), White (#FFF), Gray (#808080)
- **Container**: 1440px max-width
- **Components**: Bits UI (headless components)
- **Styling**: Open Props for consistent spacing, typography, animations

## Critical Implementation Notes

### Product Type Logic (MOST IMPORTANT)
The platform has THREE distinct product types with different business logic:

1. **Artwork**: Digital art, direct purchase, stock management
   - Can be added to cart
   - Stock decrements on purchase
   - Shows "Sold Out" when stock = 0

2. **Exclusives**: Custom outfits, NO direct purchase
   - CANNOT be added to cart
   - Redirects to lead funnel form
   - Requires consultation booking
   - Lead capture system with Strapi

3. **Basics**: Made-to-measure clothing, direct purchase
   - Can be added to cart
   - No stock tracking
   - Requires measurements after purchase
   - Choozr integration info provided post-purchase

### Current Project Status
- **Phase**: Initial setup
- **Frontend**: Not yet created (use `pnpm create svelte@latest frontend`)
- **Backend**: Not yet created (Strapi v5 planned)
- **Next Steps**: Follow PROJECT-ROADMAP.md Phase 1

### Configuration Files to Create

When setting up the frontend:

**app.css**:
```css
@import "open-props/style";
@import "open-props/normalize";

/* Custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap');

/* Brand Colors - Only 3! */
:root {
  /* Primary Palette */
  --color-ink: var(--gray-10);     /* Black */
  --color-canvas: var(--gray-0);   /* White */
  --color-accent: var(--gray-5);   /* Gray */
  
  /* Font Families */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Source Sans 3', sans-serif;
  
  /* Container */
  --container-max: 1440px;
}
```

## MCP Tools Available
- **TodoWrite/TodoRead**: Task management
- **Playwright**: Browser automation & testing
- **Brave Search**: Web search
- **Context7**: Library docs
- **Sequential Thinking**: Complex task breakdown
- **GitHub**: Repository management
- **Gemini**: Braindstorming with another LLM
- **mcp__gemini__think_deeper**: Extended thinking for complex problems