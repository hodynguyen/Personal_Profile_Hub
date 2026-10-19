---
tags: [architecture, overview]
author_agent: init
created: "2026-04-03"
status: current
---

# Architecture

## System Overview

**Personal Portfolio Hub** — a fullstack TypeScript web application showcasing projects, work experience, technical skills, and a contact form. Dark-mode-first design with smooth animations and a clean tech aesthetic.

## Component Diagram

```
client/                          server/                     shared/
├── src/                         ├── index.ts (entry)        ├── schema.ts (Drizzle tables)
│   ├── main.tsx (bootstrap)     ├── routes.ts (handlers)    └── routes.ts (API contract)
│   ├── App.tsx (router)         ├── storage.ts (DAL)
│   ├── pages/                   ├── db.ts (PG connection)
│   │   ├── Home.tsx             ├── vite.ts (dev HMR)
│   │   └── not-found.tsx        └── static.ts (prod serve)
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceItem.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/ (shadcn/ui)
│   ├── hooks/
│   │   ├── use-portfolio.ts
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   └── lib/
│       ├── queryClient.ts
│       └── utils.ts
└── index.html
```

### Relationships

- **Client** imports types and schemas from `shared/`
- **Server** imports types, schemas, and API contract from `shared/`
- In dev, Vite runs as Express middleware (HMR). In prod, Express serves static build from `dist/public`

## Data Flow

1. Browser loads SPA → `main.tsx` → `App.tsx` (Wouter router)
2. `Home.tsx` renders portfolio sections, triggers `usePortfolio()` hook
3. Hook uses TanStack Query to `GET /api/portfolio`
4. Express handler in `server/routes.ts` calls `storage.getProjects/Experiences/Skills()`
5. `storage.ts` queries PostgreSQL via Drizzle ORM
6. Response flows back: DB → storage → route handler → JSON → React Query cache → UI components
7. Contact form: `ContactForm.tsx` → `POST /api/contact` → Zod validation → `storage.createContactMessage()` → DB

## Tech Stack Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Language | TypeScript | End-to-end type safety via shared contract |
| Frontend | React 18 + Vite | Fast HMR, modern build tooling |
| UI | shadcn/ui + Tailwind CSS | Composable components, rapid styling |
| Routing | Wouter | Lightweight — only 2 pages needed |
| State | TanStack React Query | Server-state caching with minimal boilerplate |
| Backend | Express 5 | Simple REST API, Vite middleware integration |
| Database | PostgreSQL + Drizzle | Type-safe ORM, auto Zod schema generation |
| Animations | Framer Motion | Scroll-triggered section animations |
