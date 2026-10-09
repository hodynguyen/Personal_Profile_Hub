import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
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
}
