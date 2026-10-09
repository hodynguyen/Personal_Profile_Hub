import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express): void {
  // Setup authentication (session, passport, auth routes)
  setupAuth(app);

  app.get(api.portfolio.get.path, async (_req, res) => {
    const projects = await storage.getProjects();
    const experiences = await storage.getExperiences();
    const skills = await storage.getSkills();
    
    res.json({
      projects,
      experiences,
      skills,
    });
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });
}
