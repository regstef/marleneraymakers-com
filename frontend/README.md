# Marlene Raymakers - Frontend

Luxury e-commerce platform for sustainable made-to-measure fashion and digital art.

## 🚀 Tech Stack

- **Framework**: SvelteKit 5 with TypeScript
- **Styling**: Open Props (CSS Custom Properties)
- **UI Components**: Bits UI (headless components)
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint, Prettier, Husky
- **Package Manager**: pnpm

## 📦 Setup Instructions

### Prerequisites

- Node.js 20+
- pnpm 10.12.1 (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/marleneraymakers.com.git
cd marleneraymakers.com/frontend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 🛠️ Development Commands

```bash
# Development
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Build for production
pnpm preview      # Preview production build

# Testing
pnpm test         # Run tests in watch mode
pnpm test:unit    # Run tests once

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm check        # Type check with svelte-check

# Utilities
pnpm validate     # Run all checks (format, lint, type, test)
pnpm clean        # Clean build artifacts
```

## 🏗️ Architecture Overview

```
src/
├── routes/              # SvelteKit file-based routing
│   └── (public)/
│       └── [[lang]]/   # i18n with language parameter
├── lib/
│   ├── components/     # Reusable UI components
│   │   └── ui/        # Bits UI component wrappers
│   ├── features/      # Feature-based modules
│   │   ├── cart/      # Shopping cart logic
│   │   ├── products/  # Product utilities
│   │   └── leads/     # Lead generation for exclusives
│   ├── i18n/          # Internationalization
│   │   └── locales/   # Translation JSON files
│   ├── server/        # Server-only code
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions
├── app.html           # HTML template
├── app.css            # Global styles with Open Props
└── app.d.ts           # TypeScript ambient types
```

## 🌍 Internationalization

The project uses a built-in i18n pattern with:

- Route-based language switching (`/en/`, `/de/`)
- Type-safe translation keys
- Automatic language detection
- Pluralization support

## 🎨 Design System

- **Colors**: Only 3 - Black (#000), White (#FFF), Gray (#808080)
- **Typography**: Playfair Display (headings), Source Sans 3 (body)
- **Spacing**: Open Props scales
- **Components**: Minimalist luxury aesthetic

## 🔐 Environment Variables

See `.env.example` for all required variables. Key ones:

- `PUBLIC_STRAPI_URL`: Backend CMS URL
- `PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe payment key
- `PUBLIC_CLOUDINARY_CLOUD_NAME`: Image CDN

## ✅ Git Workflow

This project uses conventional commits:

```bash
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Test changes
chore: Maintenance tasks
```

Pre-commit hooks ensure:

- Code is formatted (Prettier)
- No linting errors (ESLint)
- Commit messages follow convention

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Set environment variables
3. Deploy with default settings

### Manual Build

```bash
pnpm build
# Output in ./build directory
```

## 📊 Performance Goals

- Lighthouse Score: >95 all categories
- Core Web Vitals: All green
- Bundle size: <150KB initial JS
- Time to Interactive: <3s on 3G

## 🧪 Testing Strategy

- **Unit Tests**: Business logic and utilities
- **Component Tests**: UI component behavior
- **E2E Tests**: Critical user journeys (coming soon)

Run tests with:

```bash
pnpm test:unit
```

## 📝 License

Proprietary - All rights reserved © Marlene Raymakers
