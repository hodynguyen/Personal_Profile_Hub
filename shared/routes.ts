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
};

// ============================================
// TYPE HELPERS
// ============================================
export type PortfolioResponse = z.infer<typeof api.portfolio.get.responses[200]>;
export type ContactInput = z.infer<typeof api.contact.submit.input>;
