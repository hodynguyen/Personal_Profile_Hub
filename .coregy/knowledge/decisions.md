---
tags: [decisions, adr]
author_agent: init
created: "2026-04-03"
status: current
---

# Architecture Decision Records

## ADR-001: Initial Tech Stack

**Status:** accepted
**Date:** 2026-04-03

### Context

Personal portfolio website requiring a modern, performant fullstack setup with type safety across client and server.

### Decision

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Language | TypeScript | End-to-end type safety, shared schema/contract pattern |
| Frontend Framework | React 18 | Mature ecosystem, component composition |
| Bundler | Vite 7 | Fast HMR, modern ESM-first build |
| UI Components | shadcn/ui (Radix UI) | Accessible, composable, copy-paste ownership |
| Styling | Tailwind CSS 3 | Utility-first, dark mode via CSS vars |
| Routing | Wouter | Minimal — only Home and 404 pages |
| Server State | TanStack React Query | Caching, background refetch, minimal boilerplate |
| Forms | react-hook-form + Zod | Performant forms with schema-based validation |
| Animations | Framer Motion | Declarative scroll-triggered animations |
| Backend | Express 5 | Simple REST, integrates with Vite dev server |
| Database | PostgreSQL | Relational data (projects, experiences, skills) |
| ORM | Drizzle | Type-safe queries, auto Zod schema via drizzle-zod |
| Validation | Zod | Shared schemas between client and server |

### Consequences

- TypeScript strict mode enforced across all code
- Shared contract pattern (`shared/routes.ts`) means API changes are caught at compile time
- No testing framework currently configured
- No CI/CD pipeline — originally deployed on Replit
- Database seeding happens automatically on server startup if tables are empty

---

## ADR-002: Authentication System Design

---
tags: [auth, session, passport, security, architecture]
created: 2026-04-03
author_agent: architect
status: accepted
---

**Status:** accepted
**Date:** 2026-04-03

### Context

The portfolio hub needs an authentication system so the site owner can log in and manage portfolio content (projects, experiences, skills) through an admin interface. This is a single-owner portfolio site, not a multi-tenant app -- so registration is a one-time bootstrap operation.

The project already has `passport`, `passport-local`, `express-session`, and `connect-pg-simple` installed. The client-side fetch helper already sends `credentials: "include"` and the `queryClient` has a `getQueryFn` that supports `on401: "returnNull"` behavior, indicating the codebase was designed with session-based auth in mind.

### Decision

Use **server-side sessions** with Passport.js local strategy. Passwords hashed with Node.js built-in `crypto.scrypt` (no extra dependency needed). Sessions stored in PostgreSQL via `connect-pg-simple`.

### Alternatives Considered

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| JWT tokens | Stateless, no server-side storage | Token revocation is hard, XSS risk with localStorage, overkill for single-user | Rejected |
| Passport + session (chosen) | Simple, deps already installed, secure httpOnly cookies | Server-side state (acceptable for single-user) | **Accepted** |
| NextAuth / Lucia | Modern auth libraries | Wrong framework, Lucia deprecated | Rejected |
| OAuth only (GitHub/Google) | No password management | Over-engineered for single owner, external dependency | Rejected -- but could be added later |

### Database Schema

#### `users` table

```
users
├── id            serial PRIMARY KEY
├── username      text NOT NULL UNIQUE
├── password      text NOT NULL          -- scrypt hash in format "hash.salt"
├── created_at    timestamp DEFAULT now()
```

Design notes:
- No `email` column -- the owner's contact info is already in the portfolio data. Can be added later if needed.
- `password` stores the scrypt hash and salt concatenated with a dot separator: `<hex_hash>.<hex_salt>`.
- `username` has a UNIQUE constraint for Passport's `findByUsername` lookup.
- No roles/permissions table -- single-user system. The existence of a session means "admin".

#### Drizzle definition (to be added to `shared/schema.ts`)

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
```

### API Contracts

All auth endpoints live under `/api/auth/*`. They follow the existing shared contract pattern in `shared/routes.ts`.

#### Zod Schemas (to be added to `shared/routes.ts`)

```typescript
const authInputSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

const userResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.string().nullable(),
});
```

#### POST /api/auth/register

Creates a new user account. In a single-owner system, this should only succeed when no users exist yet (bootstrap mode).

```
Method:  POST
Path:    /api/auth/register
Input:   { username: string, password: string }

Response 201:  { id, username, createdAt }   -- user created and auto-logged-in
Response 400:  { message: string }           -- validation error
Response 403:  { message: string }           -- registration closed (user already exists)
```

Server logic:
1. Check if any user already exists in the `users` table.
2. If a user exists, return 403 `"Registration is closed"`.
3. Validate input with `authInputSchema`.
4. Hash password with `crypto.scrypt`.
5. Insert user into DB.
6. Call `req.login()` to establish session immediately.
7. Return 201 with user data (excluding password).

#### POST /api/auth/login

Authenticates an existing user and creates a session.

```
Method:  POST
Path:    /api/auth/login
Input:   { username: string, password: string }

Response 200:  { id, username, createdAt }   -- session established
Response 401:  { message: string }           -- invalid credentials
```

Server logic:
1. Passport local strategy looks up user by username.
2. Compares password hash using constant-time comparison (`crypto.timingSafeEqual`).
3. On success, Passport serializes `user.id` into the session.
4. Returns user object (excluding password).

#### POST /api/auth/logout

Destroys the current session.

```
Method:  POST
Path:    /api/auth/logout
Input:   (none)

Response 200:  { success: true }
```

Server logic:
1. Call `req.logout()` (Passport method).
2. Call `req.session.destroy()`.
3. Clear session cookie.

#### GET /api/auth/session

Returns the currently authenticated user, or 401 if not authenticated.

```
Method:  GET
Path:    /api/auth/session

Response 200:  { id, username, createdAt }   -- authenticated
Response 401:  { message: string }           -- not authenticated
```

Server logic:
1. Check `req.isAuthenticated()`.
2. If true, return `req.user` (excluding password).
3. If false, return 401.

#### Shared Contract Addition (`shared/routes.ts`)

```typescript
export const api = {
  // ... existing portfolio and contact contracts ...
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/auth/register' as const,
      input: authInputSchema,
      responses: {
        201: userResponseSchema,
        400: errorSchemas.validation,
        403: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: authInputSchema,
      responses: {
        200: userResponseSchema,
        401: errorSchemas.validation,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    session: {
      method: 'GET' as const,
      path: '/api/auth/session' as const,
      responses: {
        200: userResponseSchema,
        401: errorSchemas.validation,
      },
    },
  },
};
```

### Sequence Diagrams

#### Registration Flow (bootstrap)

```
Browser                    Express Server                  PostgreSQL
  |                             |                              |
  |  POST /api/auth/register    |                              |
  |  { username, password }     |                              |
  |---------------------------->|                              |
  |                             |  SELECT COUNT(*) FROM users  |
  |                             |----------------------------->|
  |                             |  count = 0                   |
  |                             |<-----------------------------|
  |                             |                              |
  |                             |  Validate input (Zod)        |
  |                             |  Hash password (scrypt)      |
  |                             |                              |
  |                             |  INSERT INTO users           |
  |                             |----------------------------->|
  |                             |  user row returned           |
  |                             |<-----------------------------|
  |                             |                              |
  |                             |  req.login(user) -- Passport |
  |                             |  Serialize user.id -> session|
  |                             |                              |
  |                             |  INSERT INTO session table   |
  |                             |----------------------------->|
  |                             |<-----------------------------|
  |                             |                              |
  |  201 { id, username }       |                              |
  |  Set-Cookie: sid=...        |                              |
  |<----------------------------|                              |
```

#### Login Flow

```
Browser                    Express Server                  PostgreSQL
  |                             |                              |
  |  POST /api/auth/login       |                              |
  |  { username, password }     |                              |
  |---------------------------->|                              |
  |                             |  Passport local strategy     |
  |                             |  SELECT * FROM users         |
  |                             |  WHERE username = ?          |
  |                             |----------------------------->|
  |                             |  user row                    |
  |                             |<-----------------------------|
  |                             |                              |
  |                             |  scrypt(input) vs stored     |
  |                             |  timingSafeEqual comparison  |
  |                             |                              |
  |                             |  req.login(user) -- Passport |
  |                             |  INSERT INTO session table   |
  |                             |----------------------------->|
  |                             |<-----------------------------|
  |                             |                              |
  |  200 { id, username }       |                              |
  |  Set-Cookie: sid=...        |                              |
  |<----------------------------|                              |
```

#### Authenticated Request Flow

```
Browser                    Express Server                  PostgreSQL
  |                             |                              |
  |  GET /api/auth/session      |                              |
  |  Cookie: sid=abc123         |                              |
  |---------------------------->|                              |
  |                             |  express-session middleware   |
  |                             |  Lookup session by sid       |
  |                             |----------------------------->|
  |                             |  session { userId: 1 }       |
  |                             |<-----------------------------|
  |                             |                              |
  |                             |  passport.deserializeUser    |
  |                             |  SELECT * FROM users         |
  |                             |  WHERE id = 1               |
  |                             |----------------------------->|
  |                             |  user row                    |
  |                             |<-----------------------------|
  |                             |                              |
  |                             |  req.isAuthenticated() = true|
  |                             |  Return req.user (no pwd)    |
  |                             |                              |
  |  200 { id, username }       |                              |
  |<----------------------------|                              |
```

### Backend Architecture

#### Session Configuration

Session middleware must be registered **before** routes in `server/index.ts`:

```
Middleware order:
1. express.json()
2. express.urlencoded()
3. express-session (with connect-pg-simple store)
4. passport.initialize()
5. passport.session()
6. logging middleware
7. route handlers
```

Session options:
- `store`: `new ConnectPgSimple({ pool })` -- reuses the existing PG pool from `server/db.ts`
- `secret`: from `process.env.SESSION_SECRET` (required env var)
- `resave`: `false`
- `saveUninitialized`: `false`
- `cookie.secure`: `process.env.NODE_ENV === "production"`
- `cookie.httpOnly`: `true`
- `cookie.maxAge`: 7 days (604800000 ms)
- `cookie.sameSite`: `"lax"`

`connect-pg-simple` will auto-create the `session` table in PostgreSQL on first use (when `createTableIfMissing: true` is set).

#### Passport Configuration

New file: `server/auth.ts`

Responsibilities:
1. Configure `passport-local` strategy with username/password verification.
2. Define `serializeUser` (store `user.id` in session) and `deserializeUser` (fetch user by id from DB).
3. Export `setupAuth(app: Express)` function that registers session middleware, passport middleware, and all auth routes.
4. Export password utility functions: `hashPassword(password: string)` and `comparePasswords(input: string, stored: string)`.

The `setupAuth` function is called from `registerRoutes` in `server/routes.ts` before other route handlers.

#### Storage Layer Additions

Add to `IStorage` interface and `DatabaseStorage` class in `server/storage.ts`:

```
getUserByUsername(username: string): Promise<User | undefined>
getUserById(id: number): Promise<User | undefined>
createUser(user: InsertUser): Promise<User>
getUserCount(): Promise<number>
```

#### Auth Middleware

Export a reusable `requireAuth` middleware from `server/auth.ts`:

```
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not authenticated" });
}
```

This middleware will be used later to protect admin routes (CRUD for projects, experiences, skills).

#### Express Request Type Augmentation

Extend the Express `User` type so `req.user` is properly typed:

```typescript
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      createdAt: Date | null;
    }
  }
}
```

### Frontend Architecture

#### New Pages

| Page | Route | Component | Purpose |
|------|-------|-----------|---------|
| Login | `/auth` | `client/src/pages/AuthPage.tsx` | Login form, conditionally shows register if no users exist |

The auth page should be a single page that shows a login form by default. If no users exist yet (detected via a failed login or a dedicated check), it shows a registration form instead.

#### Auth Hook

New file: `client/src/hooks/use-auth.ts`

Provides an `AuthProvider` context and `useAuth()` hook:

```
useAuth() returns:
  - user: User | null          -- current authenticated user
  - isLoading: boolean         -- true while checking session
  - loginMutation              -- TanStack mutation for POST /api/auth/login
  - registerMutation           -- TanStack mutation for POST /api/auth/register
  - logoutMutation             -- TanStack mutation for POST /api/auth/logout
```

Implementation approach:
- Use TanStack Query with `queryKey: ["/api/auth/session"]` and `getQueryFn({ on401: "returnNull" })`.
- Wrap the app in `<AuthProvider>` in `App.tsx`.
- On login/register success, call `queryClient.setQueryData(["/api/auth/session"], user)` for instant UI update.
- On logout success, call `queryClient.setQueryData(["/api/auth/session"], null)`.

#### Protected Routes

New component: `client/src/lib/ProtectedRoute.tsx`

```
<ProtectedRoute>
  Renders children if user is authenticated.
  Redirects to /auth if not.
  Shows loading spinner while checking session.
</ProtectedRoute>
```

Usage in `App.tsx`:
```
<Route path="/">           <Home />           </Route>
<Route path="/auth">       <AuthPage />       </Route>
<Route path="/admin">      <ProtectedRoute><AdminPage /></ProtectedRoute>  </Route>
```

Note: The admin page itself is out of scope for this ADR. The auth system provides the foundation.

#### App.tsx Changes

1. Wrap `Router` in `<AuthProvider>`.
2. Add `/auth` route.
3. The `/auth` route should redirect to `/` if already authenticated.

### Security Considerations

| Concern | Mitigation |
|---------|------------|
| Password storage | scrypt hash with random 16-byte salt, 64-byte key length |
| Timing attacks | `crypto.timingSafeEqual` for password comparison |
| Session hijacking | `httpOnly`, `secure` (in prod), `sameSite: lax` cookie flags |
| Session fixation | Passport regenerates session on login by default |
| Brute force | Registration closes after first user; rate limiting can be added later |
| XSS token theft | No tokens in localStorage; httpOnly cookies only |
| CSRF | `sameSite: lax` prevents cross-origin POST; sufficient for this use case |
| Secret management | `SESSION_SECRET` from env var, not hardcoded |

#### Why scrypt over bcrypt

- `crypto.scrypt` is built into Node.js -- zero additional dependencies.
- Provides equivalent security to bcrypt for password hashing.
- The project already has no `bcrypt` dependency, so this avoids native module compilation issues.

### File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `shared/schema.ts` | Modify | Add `users` table, `insertUserSchema`, `User` type |
| `shared/routes.ts` | Modify | Add `api.auth.*` contract with Zod schemas |
| `server/auth.ts` | Create | Passport config, session setup, auth routes, password utils |
| `server/storage.ts` | Modify | Add `getUserByUsername`, `getUserById`, `createUser`, `getUserCount` to interface and class |
| `server/routes.ts` | Modify | Call `setupAuth(app)` before registering other routes |
| `server/index.ts` | Modify | Possibly move session middleware here, or keep in `setupAuth` |
| `client/src/hooks/use-auth.ts` | Create | AuthProvider context, useAuth hook |
| `client/src/pages/AuthPage.tsx` | Create | Login/register page |
| `client/src/lib/ProtectedRoute.tsx` | Create | Route guard component |
| `client/src/App.tsx` | Modify | Add AuthProvider, /auth route |
| `.env` | Modify | Add `SESSION_SECRET` |

### Consequences

- The portfolio remains publicly readable (no auth required for GET /api/portfolio or GET /api/contact).
- Only the site owner can register (first-user-wins model). No public registration.
- Future admin CRUD routes can use the `requireAuth` middleware.
- Session data is stored in PostgreSQL, surviving server restarts.
- The `connect-pg-simple` session table is auto-created, no manual migration needed.
