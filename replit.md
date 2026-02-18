# Overview

This is a personal portfolio website for a Software Engineer & DevOps specialist named "Hody." It's a full-stack application that showcases projects, work experience, technical skills, and includes a contact form. The site features a modern dark-mode-first design with smooth animations and a clean tech aesthetic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled with Vite
- **Routing**: Wouter (lightweight client-side router) — single-page app with just a Home page and 404
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support). Uses shadcn/ui component library (new-york style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state (data fetching and caching)
- **Forms**: react-hook-form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for scroll-triggered animations and section transitions
- **Fonts**: Outfit (display/headings), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

## Backend Architecture

- **Framework**: Express 5 running on Node.js with TypeScript (via tsx)
- **API Design**: REST API with a shared contract pattern — routes are defined in `shared/routes.ts` with Zod schemas for input validation and response types. Both client and server import from this shared contract.
- **API Endpoints**:
  - `GET /api/portfolio` — returns projects, experiences, and skills
  - `POST /api/contact` — submits a contact form message with Zod validation
- **Dev Server**: Vite dev server is integrated as middleware during development (HMR via `server/vite.ts`). In production, static files are served from `dist/public`.

## Data Storage

- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with `drizzle-zod` for automatic Zod schema generation from table definitions
- **Schema** (in `shared/schema.ts`):
  - `projects` — portfolio projects with title, description, role, tech stack (text array), period, category, featured flag
  - `experiences` — work history with company, role, period, description (text array for bullet points)
  - `skills` — grouped by category with items as text array
  - `contact_messages` — stores contact form submissions with name, email, message, timestamp
- **Migrations**: Drizzle Kit with `db:push` command for schema sync
- **Seeding**: Automatic seed data insertion on server startup if tables are empty (handled in `storage.ts`)

## Build System

- **Client**: Vite builds to `dist/public`
- **Server**: esbuild bundles server code to `dist/index.cjs` with selective dependency bundling (allowlist pattern to reduce cold start times)
- **Dev**: `tsx server/index.ts` with Vite middleware for HMR
- **Production**: `node dist/index.cjs` serves both API and static files

## Key Design Patterns

- **Shared contract**: `shared/routes.ts` defines API paths, methods, input schemas, and response schemas used by both client and server — ensures type safety across the stack
- **Storage interface**: `IStorage` interface in `server/storage.ts` abstracts database operations, making it possible to swap implementations
- **Component composition**: UI built with shadcn/ui components (in `client/src/components/ui/`) composed into feature components (Navigation, ProjectCard, ExperienceItem, ContactForm, etc.)

# External Dependencies

- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **Session Store**: `connect-pg-simple` is available for PostgreSQL-backed sessions (currently not actively used for auth)
- **Google Fonts**: Outfit, Plus Jakarta Sans, JetBrains Mono loaded via CDN
- **No external APIs**: The portfolio data is self-contained in the database via seed data. No third-party API integrations are currently active, though build config references packages like `@google/generative-ai`, `openai`, `stripe`, `nodemailer` as potential bundling targets.