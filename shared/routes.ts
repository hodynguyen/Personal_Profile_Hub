import { z } from 'zod';
import { insertContactMessageSchema, projects, experiences, skills } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// AUTH SCHEMAS
// ============================================
export const authInputSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export const userResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.string().nullable(),
});

// ============================================
// API CONTRACT
// ============================================
export const api = {
  portfolio: {
    get: {
      method: 'GET' as const,
      path: '/api/portfolio' as const,
      responses: {
        200: z.object({
          projects: z.array(z.custom<typeof projects.$inferSelect>()),
          experiences: z.array(z.custom<typeof experiences.$inferSelect>()),
          skills: z.array(z.custom<typeof skills.$inferSelect>()),
        }),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    },
  },
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

// ============================================
// TYPE HELPERS
// ============================================
export type PortfolioResponse = z.infer<typeof api.portfolio.get.responses[200]>;
export type ContactInput = z.infer<typeof api.contact.submit.input>;
export type AuthInput = z.infer<typeof authInputSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
