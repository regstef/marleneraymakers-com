# PRD-001: Project Setup & Development Environment

## Introduction/Overview
Dieses PRD definiert das technische Fundament für das marleneraymakers.com E-Commerce-Projekt. Es etabliert die Entwicklungsumgebung, Projektstruktur und Best Practices für ein skalierbares, performance-orientiertes SvelteKit 5 Projekt mit Internationalisierung. Das Setup fokussiert sich ausschließlich auf die technische Infrastruktur ohne UI-Implementierung.

## Goals
1. **Robuste Entwicklungsumgebung**: SvelteKit 5 mit TypeScript, Open Props, Bits UI und allen notwendigen Development Tools
2. **Skalierbare Projektstruktur**: Feature-basierte Architektur, die für Menschen und LLMs optimiert ist
3. **Internationalisierung**: Vollständiges i18n-Setup mit Paraglide.js für DE/EN
4. **Code-Qualität**: Automatisierte Linting, Formatting und Git Hooks
5. **Performance-Grundlagen**: Von Anfang an auf Core Web Vitals optimiert
6. **CI/CD Pipeline**: Automatisierte Validierung für jeden Push

## User Stories
- Als Entwickler möchte ich ein konsistentes, modernes Development-Setup, damit ich effizient und fehlerfrei arbeiten kann
- Als Entwickler möchte ich eine klare Projektstruktur, damit ich schnell Features hinzufügen kann ohne technische Schulden anzuhäufen
- Als LLM möchte ich eine logische Ordnerstruktur mit klaren Path Aliases, damit ich Code-Zusammenhänge verstehen kann
- Als DevOps möchte ich automatisierte Quality Gates, damit nur qualitativ hochwertiger Code deployed wird
- Als Product Owner möchte ich ein Setup, das von Anfang an auf Performance und internationale Märkte ausgerichtet ist

## Functional Requirements

### 1. Repository & Versionskontrolle
1.1. Neues GitHub Repository erstellen: `marleneraymakers-com`  
1.2. Branch Protection Rules für `main` Branch einrichten  
1.3. `.gitignore` für SvelteKit, Node.js und IDE-spezifische Dateien  
1.4. README.md mit initialer Projektbeschreibung

### 2. SvelteKit Projekt-Initialisierung
2.1. Projekt mit `npx sv create frontend` erstellen  
2.2. TypeScript mit strict mode aktivieren  
2.3. ESLint und Prettier während Setup aktivieren  
2.4. Vitest für Unit Tests konfigurieren  
2.5. Playwright für E2E Tests (nur Konfiguration)

### 3. Package Manager Setup (PNPM)
3.1. PNPM als Package Manager konfigurieren  
3.2. `.npmrc` mit `engine-strict=true` erstellen  
3.3. `preinstall` Script hinzufügen: `"preinstall": "npx only-allow pnpm"`  
3.4. `packageManager` Field in package.json definieren  
3.5. Corepack-Nutzung dokumentieren

### 4. Projektstruktur
4.1. Feature-basierte Ordnerstruktur implementieren:
```
frontend/
├── src/
│   ├── lib/
│   │   ├── components/      # Globale UI-Komponenten (Bits UI Wrapper)
│   │   │   └── ui/         # Organisiert nach Komponententyp
│   │   ├── features/       # Business-Logik nach Domäne
│   │   │   ├── product/    # Alles zu Produkten
│   │   │   ├── cart/       # Alles zum Warenkorb
│   │   │   └── checkout/   # Alles zum Checkout
│   │   ├── i18n/          # Paraglide Konfiguration
│   │   ├── server/        # Server-only Code
│   │   ├── stores/        # Globale Svelte Stores
│   │   ├── types/         # Globale TypeScript Types
│   │   └── utils/         # Helper Functions
│   ├── routes/
│   │   ├── [lang]/        # Sprach-Parameter
│   │   │   ├── (index)/   # Homepage
│   │   │   ├── artwork/[slug]/
│   │   │   ├── exclusives/[slug]/
│   │   │   └── basics/[slug]/
│   │   └── api/           # API Routes
│   ├── app.html
│   ├── app.css
│   └── app.d.ts
├── static/
├── tests/
└── [Konfigurationsdateien]
```

4.2. Path Aliases in `svelte.config.js` und `tsconfig.json`:
- `$components` → `src/lib/components`
- `$features` → `src/lib/features`
- `$utils` → `src/lib/utils`
- `$i18n` → `src/lib/i18n`
- `$types` → `src/lib/types`

### 5. Styling Setup (Open Props)
5.1. Open Props installieren: `pnpm add open-props`  
5.2. PostCSS JIT Props installieren: `pnpm add -D postcss-jit-props`  
5.3. PostCSS Konfiguration erstellen  
5.4. Basis `app.css` mit Open Props Imports:
```css
@import "open-props/style";
@import "open-props/normalize";

/* Brand Colors */
:root {
  --color-ink: var(--gray-10);
  --color-canvas: var(--gray-0);
  --color-accent: var(--gray-5);
  
  /* Font Families (für spätere Nutzung) */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Source Sans 3', sans-serif;
  
  /* Container */
  --container-max: 1440px;
}
```

### 6. Component Library Setup (Bits UI)
6.1. Bits UI installieren: `pnpm add bits-ui@latest`  
6.2. Wrapper-Pattern Struktur erstellen  
6.3. Beispiel Button Wrapper als Template:
```svelte
<!-- src/lib/components/ui/button/button.svelte -->
<script lang="ts">
  import { Button as ButtonPrimitive } from "bits-ui";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type $$Props = ButtonPrimitive.Props & HTMLButtonAttributes;
</script>

<ButtonPrimitive.Root {...$$props} on:click>
  <slot />
</ButtonPrimitive.Root>

<style>
  /* Basis-Styling mit Open Props */
</style>
```

### 7. Internationalisierung (i18n)
7.1. Paraglide.js installieren und konfigurieren  
7.2. Sprachen definieren: DE (source) und EN  
7.3. `src/hooks.server.ts` für Spracherkennung:
   - Accept-Language Header auswerten
   - Cookie für Sprachpräferenz setzen
   - Redirect auf passende Sprach-URL  
7.4. Routing-Struktur mit `[lang]` Parameter  
7.5. Platzhalter für übersetzte Slugs in Kommentaren

### 8. TypeScript Konfiguration
8.1. Strict Mode in `tsconfig.json`  
8.2. `allowJs: false` für reines TypeScript  
8.3. Path Aliases synchron mit Svelte Config  
8.4. Basis-Types für Product, Cart, etc. vorbereiten

### 9. Code Qualität & Git Hooks
9.1. ESLint mit `eslint-config-prettier` konfigurieren  
9.2. Prettier Konfiguration anpassen  
9.3. Husky installieren: `pnpm add -D husky`  
9.4. lint-staged konfigurieren:
```javascript
// lint-staged.config.js
export default {
  '*.{js,ts,svelte}': ['eslint --fix', 'prettier --write'],
  '*.{md,json,css}': 'prettier --write',
};
```
9.5. Pre-commit Hook einrichten

### 10. Test Setup
10.1. Vitest für Unit Tests konfigurieren  
10.2. Svelte Testing Library installieren  
10.3. Beispiel Unit Test für eine Utility Function  
10.4. Beispiel Component Test für Button Wrapper  
10.5. Test Scripts in package.json

### 11. Environment Variables
11.1. `.env.example` erstellen mit Struktur:
```env
# Public Variables (Frontend)
PUBLIC_SITE_URL=http://localhost:5173
PUBLIC_DEFAULT_LANGUAGE=en

# Private Variables (Backend/API)
PRIVATE_API_KEY=
DATABASE_URL=

# Future: Strapi, Stripe, Brevo, etc.
```
11.2. Type Definitions für env vars  
11.3. Dokumentation für $env Nutzung

### 12. Performance Grundlagen
12.1. Streaming Pattern in load functions vorbereiten  
12.2. HTTP Caching Headers Template  
12.3. Image Utility Service Platzhalter  
12.4. Web Vitals Monitoring vorbereiten

### 13. CI/CD Pipeline
13.1. GitHub Actions Workflow `.github/workflows/validate.yml`:
   - PNPM Setup
   - Dependencies installieren
   - Linting
   - Type Checking
   - Tests ausführen  
13.2. Branch Protection mit Required Checks

## Non-Goals (Out of Scope)
- UI Komponenten Implementation
- Styling von Komponenten
- Strapi Backend Setup
- Deployment Konfiguration
- Echte Übersetzungen
- Business Logic Implementation
- API Endpoints
- Datenbank-Anbindung

## Design Considerations
- Mobile-first Ansatz von Anfang an
- Keine Dark/Light Mode Unterstützung benötigt
- Performance hat höchste Priorität
- Barrierefreiheit wird durch Bits UI sichergestellt

## Technical Considerations
- Node.js Version ≥ 18 erforderlich
- PNPM Version ≥ 8 empfohlen
- Browser Support: Alle modernen Browser (last 2 versions)
- Vorbereitung für SSG/SSR Hybrid-Ansatz
- Keine externen CSS Frameworks außer Open Props
- TypeScript strict mode durchgehend

## Success Metrics
1. **Setup vollständig**: Alle definierten Tools installiert und konfiguriert
2. **Tests laufen**: Mindestens 3 Beispieltests (Unit, Component, Integration) grün
3. **CI/CD aktiv**: GitHub Actions validiert jeden Push erfolgreich
4. **i18n funktioniert**: `/en/` und `/de/` Routes erreichbar mit Sprachumschaltung
5. **Performance Baseline**: Lighthouse Score >90 für leere Seite
6. **Type Safety**: Keine TypeScript Fehler bei `pnpm check`

## Open Questions
1. Sollen wir Telemetrie/Analytics bereits in PRD-001 vorbereiten oder später?
2. Bevorzugte Node.js Version für das Team?
3. Soll Error Tracking (Sentry) bereits konfiguriert werden?
4. Gibt es spezielle Browser-Anforderungen über "last 2 versions" hinaus?