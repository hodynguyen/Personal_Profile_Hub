import { db } from "./db";
import { eq, count, asc } from "drizzle-orm";
import { skillsSeed, experiencesSeed, projectsSeed } from "./seed-data";
import {
  projects,
  experiences,
  skills,
  users,
  type Project,
  type Experience,
  type Skill,
  type User,
  type InsertUser,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  seedData(options?: { reset?: boolean }): Promise<void>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.id));
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(asc(experiences.id));
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.id));
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getUserCount(): Promise<number> {
    const [result] = await db.select({ value: count() }).from(users);
    return result.value;
  }

  async seedData({ reset = false }: { reset?: boolean } = {}): Promise<void> {
    await db.transaction(async (tx) => {
      if (reset) {
        // Replace portfolio content only; users, sessions and messages are kept
        await tx.delete(projects);
        await tx.delete(experiences);
        await tx.delete(skills);
      } else {
        const existingProjects = await tx.select().from(projects);
        if (existingProjects.length > 0) return;
      }

      await tx.insert(skills).values(skillsSeed);
      await tx.insert(experiences).values(experiencesSeed);
      await tx.insert(projects).values(projectsSeed);
    });
  }
}

export const storage = new DatabaseStorage();
