import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, json, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Projects table to showcase your work
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  role: text("role").notNull(),
  techStack: text("tech_stack").array().notNull(), // Array of strings for tech tags
  period: text("period").notNull(),
  company: text("company"),
  link: text("link"), // Optional link to project
  category: text("category").notNull(), // e.g., "Software Engineering", "DevOps", "Full Stack"
  isFeatured: boolean("is_featured").default(false),
});

// Experience table for work history
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  period: text("period").notNull(),
  description: text("description").array().notNull(), // Bullet points
  techStack: text("tech_stack").array(),
});

// Skills table for technical expertise
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // e.g., "Languages", "Cloud & DevOps", "Backend"
  items: text("items").array().notNull(),
});

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Session store for express-session (matches connect-pg-simple's table.sql)
export const sessions = pgTable(
  "session",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire", { precision: 6 }).notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Contact messages from the site
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertProjectSchema = createInsertSchema(projects);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertSkillSchema = createInsertSchema(skills);
export const insertContactMessageSchema = createInsertSchema(contactMessages);
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// === EXPLICIT API CONTRACT TYPES ===

export type Project = typeof projects.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type PortfolioDataResponse = {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
};
