---
tags: [runbook, operations, commands]
author_agent: init
created: "2026-04-03"
status: current
---

# Runbook

## Prerequisites

- Node.js (with npm)
- PostgreSQL instance
- `DATABASE_URL` environment variable set

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR (tsx + Vite middleware) |
| `npm run build` | Build client (Vite → dist/public) + server (esbuild → dist/index.cjs) |
| `npm start` | Run production build (`node dist/index.cjs`) |
| `npm run check` | TypeScript type checking (tsc --noEmit) |
| `npm run db:push` | Push Drizzle schema changes to PostgreSQL |

## Local Development

1. Ensure PostgreSQL is running and `DATABASE_URL` is set
2. Run `npm install`
3. Run `npm run dev`
4. App starts on the configured port with Vite HMR

## Database

- Schema defined in `shared/schema.ts`
- Tables: `projects`, `experiences`, `skills`, `contact_messages`
- Auto-seeds on first startup if tables are empty (see `server/storage.ts`)
- Migrations via `drizzle-kit push` (schema-push, not migration files)

## Build & Deploy

1. `npm run build` — outputs `dist/public/` (client) and `dist/index.cjs` (server)
2. `npm start` — serves both API and static files from the single bundle
3. Originally configured for Replit deployment (see `.replit` config)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NODE_ENV` | No | `development` or `production` |

## CI/CD

No CI/CD pipeline currently configured.

## Testing

No testing framework currently configured.
