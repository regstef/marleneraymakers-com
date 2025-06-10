# Task List for PRD-001: Project Setup & Development Environment

## Relevant Files

### Configuration Files
- `frontend/package.json` - Package configuration with scripts and dependencies
- `frontend/.npmrc` - PNPM configuration (engine-strict, package manager enforcement)
- `frontend/svelte.config.js` - SvelteKit configuration with path aliases
- `frontend/tsconfig.json` - TypeScript configuration with strict mode and paths
- `frontend/vite.config.js` - Vite bundler configuration
- `frontend/postcss.config.js` - PostCSS configuration for Open Props optimization

### Core Application Files
- `frontend/src/app.html` - HTML template for the application
- `frontend/src/app.css` - Global styles with Open Props imports
- `frontend/src/app.d.ts` - TypeScript ambient declarations
- `frontend/src/hooks.server.ts` - Server hooks for i18n language detection

### Project Structure
- `frontend/src/lib/components/ui/button/button.svelte` - Example Bits UI wrapper component
- `frontend/src/lib/components/ui/button/button.test.ts` - Component test example
- `frontend/src/lib/utils/currency.ts` - Example utility function
- `frontend/src/lib/utils/currency.test.ts` - Unit test example
- `frontend/src/routes/[lang]/+page.svelte` - Homepage with i18n support
- `frontend/src/routes/[lang]/+layout.svelte` - Root layout with language handling

### Testing & Quality
- `frontend/.eslintrc.cjs` - ESLint configuration
- `frontend/.prettierrc` - Prettier configuration
- `frontend/lint-staged.config.js` - Pre-commit hook configuration
- `frontend/vitest.config.js` - Vitest test runner configuration

### CI/CD
- `.github/workflows/validate.yml` - GitHub Actions CI pipeline
- `frontend/.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns
- `README.md` - Project documentation

### Notes

- Start with minimal configuration and add complexity incrementally
- Each phase should result in a working, testable state
- Use `pnpm` instead of `npm` for all package installations
- Test files should be colocated with their source files
- Run tests with `pnpm test` or `pnpm test [path/to/test]`

## Tasks

- [ ] 1.0 Repository Setup & "Hello World" SvelteKit
  - [x] 1.1 Create new GitHub repository `marleneraymakers-com` with initial README
  - [x] 1.2 Clone repository locally and create `.gitignore` for Node.js, SvelteKit, and IDEs
  - [x] 1.3 Install PNPM globally (`npm install -g pnpm`) and enable Corepack (`corepack enable`)
  - [x] 1.4 Create `.npmrc` with `engine-strict=true` and `auto-install-peers=true`
  - [x] 1.5 Initialize SvelteKit project: `pnpx sv create frontend` (select TypeScript, ESLint, Prettier, Vitest)
  - [x] 1.6 Navigate to frontend folder and install dependencies: `pnpm install`
  - [x] 1.7 Add package manager enforcement to `package.json`: `"packageManager": "pnpm@8.15.0"` and preinstall script
  - [x] 1.8 Start development server (`pnpm dev`) and verify it runs on http://localhost:5173
  - [ ] 1.9 Commit initial SvelteKit setup with meaningful commit message

- [ ] 2.0 Project Architecture & TypeScript Configuration  
  - [ ] 2.1 Create the feature-based folder structure in `src/lib/`:
    - `components/ui/` for Bits UI wrappers
    - `features/product/`, `features/cart/`, `features/checkout/` for business logic
    - `i18n/` for translations
    - `server/` for server-only code
    - `stores/` for global state
    - `types/` for TypeScript definitions
    - `utils/` for helper functions
  - [ ] 2.2 Update `svelte.config.js` with path aliases:
    ```js
    alias: {
      '$components': 'src/lib/components',
      '$features': 'src/lib/features',
      '$utils': 'src/lib/utils',
      '$i18n': 'src/lib/i18n',
      '$types': 'src/lib/types'
    }
    ```
  - [ ] 2.3 Update `tsconfig.json` to match path aliases and enable strict mode:
    - Set `"strict": true`
    - Set `"allowJs": false`
    - Add matching path mappings
  - [ ] 2.4 Create routing structure in `src/routes/`:
    - `[lang]/` folder for i18n
    - `[lang]/(index)/+page.svelte` for homepage
    - `[lang]/artwork/[slug]/`, `[lang]/exclusives/[slug]/`, `[lang]/basics/[slug]/` folders
    - `api/` folder for future API routes
  - [ ] 2.5 Create a simple homepage in `[lang]/(index)/+page.svelte` that displays "Welcome to Marlene Raymakers"
  - [ ] 2.6 Create basic type definitions in `src/lib/types/`:
    - `product.ts` with ProductType enum and Product interface
    - `cart.ts` with CartItem interface
  - [ ] 2.7 Verify path aliases work by importing a type in the homepage
  - [ ] 2.8 Run `pnpm check` to ensure no TypeScript errors

- [ ] 3.0 Styling Foundation & Component Library
  - [ ] 3.1 Install Open Props and PostCSS JIT Props: `pnpm add open-props` and `pnpm add -D postcss-jit-props`
  - [ ] 3.2 Create `postcss.config.js` with JIT Props configuration:
    ```js
    import jitProps from 'postcss-jit-props';
    import OpenProps from 'open-props';
    
    export default {
      plugins: [jitProps(OpenProps)]
    };
    ```
  - [ ] 3.3 Update `src/app.css` with Open Props imports and brand colors:
    - Import Open Props style and normalize
    - Define brand colors (--color-ink, --color-canvas, --color-accent)
    - Add font family variables
  - [ ] 3.4 Install Bits UI: `pnpm add bits-ui@latest`
  - [ ] 3.5 Create Button wrapper component at `src/lib/components/ui/button/button.svelte`:
    - Import Button primitive from bits-ui
    - Add proper TypeScript types
    - Include slot for content
  - [ ] 3.6 Add basic styling to Button using Open Props variables
  - [ ] 3.7 Create `index.ts` barrel export in button folder
  - [ ] 3.8 Use the Button component on homepage to verify it works
  - [ ] 3.9 Create a simple utility function in `src/lib/utils/currency.ts` for formatting prices

- [ ] 4.0 Developer Experience & Code Quality
  - [ ] 4.1 Install additional ESLint plugins: `pnpm add -D eslint-config-prettier eslint-plugin-svelte`
  - [ ] 4.2 Configure ESLint in `.eslintrc.cjs` to work with Prettier and TypeScript
  - [ ] 4.3 Create `.prettierrc` with project-specific formatting rules:
    ```json
    {
      "useTabs": false,
      "singleQuote": true,
      "trailingComma": "es5",
      "printWidth": 100
    }
    ```
  - [ ] 4.4 Add lint and format scripts to `package.json`:
    - `"lint": "eslint . --ext .js,.ts,.svelte"`
    - `"format": "prettier --write ."`
  - [ ] 4.5 Install and initialize Husky: `pnpm add -D husky && pnpm exec husky init`
  - [ ] 4.6 Install lint-staged: `pnpm add -D lint-staged`
  - [ ] 4.7 Create `lint-staged.config.js` with file pattern rules
  - [ ] 4.8 Configure pre-commit hook in `.husky/pre-commit` to run lint-staged
  - [ ] 4.9 Test the pre-commit hook by making a commit with poorly formatted code
  - [ ] 4.10 Create GitHub Actions workflow at `.github/workflows/validate.yml`:
    - Setup Node.js and PNPM
    - Install dependencies with frozen lockfile
    - Run lint, type check, and tests

- [ ] 5.0 Testing, i18n & Production Readiness
  - [ ] 5.1 Configure Vitest in `vitest.config.js` for SvelteKit
  - [ ] 5.2 Install Svelte Testing Library: `pnpm add -D @testing-library/svelte @testing-library/jest-dom`
  - [ ] 5.3 Create unit test for currency utility at `src/lib/utils/currency.test.ts`
  - [ ] 5.4 Create component test for Button at `src/lib/components/ui/button/button.test.ts`
  - [ ] 5.5 Add test script to package.json and run tests: `pnpm test`
  - [ ] 5.6 Install Paraglide.js for i18n: `pnpm add -D @inlang/paraglide-js-adapter-sveltekit`
  - [ ] 5.7 Configure Paraglide with DE and EN languages in `project.inlang/settings.json`
  - [ ] 5.8 Create `src/hooks.server.ts` for language detection:
    - Parse Accept-Language header
    - Set language cookie
    - Redirect to appropriate language route
  - [ ] 5.9 Add example translations in `src/lib/i18n/` for homepage welcome message
  - [ ] 5.10 Create `.env.example` with documented environment variables
  - [ ] 5.11 Add environment variable type definitions in `src/app.d.ts`
  - [ ] 5.12 Create performance utility placeholder at `src/lib/utils/image.ts`
  - [ ] 5.13 Update README.md with:
    - Project description
    - Setup instructions
    - Development commands
    - Architecture overview
  - [ ] 5.14 Configure branch protection rules on GitHub for main branch
  - [ ] 5.15 Run full validation: lint, type check, tests, and build
  - [ ] 5.16 Verify Lighthouse score >90 for the basic setup