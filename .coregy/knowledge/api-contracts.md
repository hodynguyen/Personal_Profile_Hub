---
tags: [api, contracts, endpoints]
author_agent: init
created: "2026-04-03"
status: current
---

# API Contracts

Defined in `shared/routes.ts` as a shared contract with Zod schemas. Both client and server import from this file.

## Endpoints

### GET /api/portfolio

Returns all portfolio data (projects, experiences, skills).

**Response 200:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "role": "string",
      "techStack": ["string"],
      "period": "string",
      "company": "string | null",
      "link": "string | null",
      "category": "string",
      "isFeatured": true
    }
  ],
  "experiences": [
    {
      "id": 1,
      "company": "string",
      "role": "string",
      "period": "string",
      "description": ["string"]
    }
  ],
  "skills": [
    {
      "id": 1,
      "category": "string",
      "items": ["string"]
    }
  ]
}
```

### POST /api/contact

Submits a contact form message.

**Input (Zod-validated via `insertContactMessageSchema`):**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "message": "string (required)"
}
```

**Response 201:**
```json
{ "success": true }
```

**Response 400 (validation error):**
```json
{
  "message": "string",
  "field": "string"
}
```

## Error Schemas

Defined in `shared/routes.ts`:
- `validation` — `{ message, field? }`
- `notFound` — `{ message }`
- `internal` — `{ message }`

## Type Helpers

- `PortfolioResponse` — inferred from GET /api/portfolio 200 schema
- `ContactInput` — inferred from POST /api/contact input schema
- `PortfolioDataResponse` — explicit type in `shared/schema.ts`

---

## Auth Endpoints (planned -- ADR-002)

---
tags: [api, auth, planned]
created: 2026-04-03
author_agent: architect
status: planned
---

Defined in `shared/routes.ts` under `api.auth.*`. All endpoints use httpOnly session cookies for authentication.

### Shared Schemas

```typescript
authInputSchema:   { username: string (3-50), password: string (6-100) }
userResponseSchema: { id: number, username: string, createdAt: string | null }
```

### POST /api/auth/register

Creates the site owner account. Only succeeds when zero users exist (bootstrap mode).

**Input (Zod-validated via `authInputSchema`):**
```json
{ "username": "string", "password": "string" }
```

**Response 201:** `{ "id": 1, "username": "admin", "createdAt": "..." }`
**Response 400:** `{ "message": "...", "field": "..." }` -- validation error
**Response 403:** `{ "message": "Registration is closed" }` -- user already exists

### POST /api/auth/login

Authenticates user and establishes session.

**Input (Zod-validated via `authInputSchema`):**
```json
{ "username": "string", "password": "string" }
```

**Response 200:** `{ "id": 1, "username": "admin", "createdAt": "..." }`
**Response 401:** `{ "message": "Invalid credentials" }`

### POST /api/auth/logout

Destroys current session. No request body.

**Response 200:** `{ "success": true }`

### GET /api/auth/session

Returns current authenticated user.

**Response 200:** `{ "id": 1, "username": "admin", "createdAt": "..." }`
**Response 401:** `{ "message": "Not authenticated" }`

### Auth Type Helpers (planned)

- `AuthInput` — inferred from `authInputSchema`
- `UserResponse` — inferred from `userResponseSchema`
