# MarleneRaymakers.com E-commerce Platform

A luxury e-commerce platform for made-to-measure fashion and art. This repository contains the SvelteKit-based frontend and server application.

![Build Status](https://github.com/marleneraymakers-com/marleneraymakers-com/actions/workflows/validate.yml/badge.svg) <!-- Placeholder -->
![License](https://img.shields.io/badge/license-Proprietary-blue)

---

## 🚀 Project Overview

This project is the technical foundation for the [marleneraymakers.com](https://marleneraymakers.com) e-commerce experience. It's in the early stages of development, focusing on establishing a robust, scalable, and maintainable technical architecture.

**Key Goals:**
- Provide a premium, performant user experience
- Support internationalization (i18n) for German (DE) and English (EN) markets
- Build a flexible foundation that can accommodate custom-made products and unique artist collaborations

## 🛠️ Tech Stack & Architectural Decisions

We've chosen a modern, component-driven stack. Understanding the *why* behind these choices is key to contributing effectively.

| Technology      | Role                       | Rationale                                                                                                                                                             |
| --------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SvelteKit 5** | Full-stack Framework       | Chosen for its outstanding performance, exceptional developer experience, and integrated frontend/backend capabilities which are ideal for a tightly-coupled platform    |
| **TypeScript**  | Language                   | For type safety and long-term maintainability. We enforce `strict` mode to catch errors early                                                                        |
| **PNPM**        | Package Manager            | Ensures efficient, deterministic, and strict dependency management. **Always use `pnpm`**, not `npm` or `yarn`, to interact with the project                            |
| **Bits UI**     | Headless UI Components     | Provides unstyled, accessible, and composable component primitives. This gives us full control over the luxury look-and-feel without fighting a pre-existing style system |
| **Open Props**  | CSS Variables / Design Tokens | A system for design tokens that promotes consistency and simplifies theming. It pairs perfectly with a headless UI approach                                            |
| **Paraglide.js**| Internationalization (i18n)| A modern, typesafe i18n library with first-class SvelteKit integration. It ensures only the necessary translations are loaded (tree-shakable), which is critical for performance |

## 🏁 Getting Started

### Prerequisites

1. **Node.js**: Version `20.x` or later. We enforce this using `.nvmrc`
2. **PNPM**: Install with `npm install -g pnpm`

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:marleneraymakers-com/marleneraymakers-com.git
   cd marleneraymakers-com
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   - Copy the example environment file
   ```bash
   cp .env.example .env
   ```
   - Fill in the required variables in `.env` (initially empty, but establishes the pattern)

4. **Run the development server:**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:5173`

## 📂 Project Structure

A high-level overview of the most important directories:

```
marleneraymakers-com/
├── frontend/               # SvelteKit application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/     # Reusable Svelte components (Bits UI powered)
│   │   │   │   ├── ui/         # Generic, unstyled primitives (Button, Input, etc.)
│   │   │   │   └── core/       # Application-wide components (Layout, Header, etc.)
│   │   │   ├── features/       # Business logic organized by domain
│   │   │   ├── i18n/           # Paraglide.js messages and configuration
│   │   │   ├── stores/         # Global Svelte stores
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   └── utils/          # Utility functions
│   │   ├── routes/             # SvelteKit file-based routing
│   │   │   └── [lang]/         # Language-specific routes
│   │   └── app.html            # Main HTML shell
│   └── static/                 # Static assets (favicons, images, fonts)
├── tasks/                      # PRD and task management
├── docs/                       # Project documentation
└── .env.example                # Template for environment variables
```

## 📜 Available Scripts

### Frontend Scripts
- `pnpm dev` - Starts the development server
- `pnpm build` - Creates a production-ready build
- `pnpm preview` - Serves the production build locally for testing
- `pnpm check` - Runs `svelte-check` to validate types and component logic
- `pnpm test` - Runs Vitest tests
- `pnpm lint` - Lints the codebase with ESLint
- `pnpm format` - Formats the codebase with Prettier

## 🤝 Contributing

We follow a standard GitHub Flow process.

1. **Branching**: Create a new branch from `main` for each new feature or bugfix
   - Feature: `feature/product-display-page`
   - Fix: `fix/header-alignment`

2. **Commits**: Write clear, concise commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
   - `feat: add product grid component`
   - `fix: correct header alignment on mobile`

3. **Pull Requests (PRs)**:
   - Push your branch and open a PR against `main`
   - Ensure all CI checks (linting, testing, building) are passing
   - A PR requires at least one approving review before merging

4. **Code Style**: 
   - Run `pnpm format` and `pnpm lint` before committing
   - Follow the existing patterns in the codebase
   - Use TypeScript strict mode

## 📝 Documentation

- [Executive Summary](docs/EXECUTIVE-SUMMARY.md) - Business overview and product types
- [Project Roadmap](docs/PROJECT-ROADMAP.md) - Development phases and milestones
- [Setup Guide](docs/SVELTEKIT-PROJECT-SETUP-GUIDE.md) - Detailed technical setup instructions
- [CLAUDE.md](CLAUDE.md) - AI assistant instructions for working with this codebase

## 🔒 Security

- Never commit sensitive data (API keys, passwords, etc.)
- Always use environment variables for configuration
- Report security vulnerabilities to [security@marleneraymakers.com](mailto:security@marleneraymakers.com)

## 📄 License

This project is proprietary software. All rights reserved.

---

For questions or support, please contact the development team.