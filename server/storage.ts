import { db } from "./db";
import { eq, count } from "drizzle-orm";
import {
  projects,
  experiences,
  skills,
  contactMessages,
  users,
  type Project,
  type Experience,
  type Skill,
  type InsertContactMessage,
  type User,
  type InsertUser,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  seedData(): Promise<void>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
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

  async seedData(): Promise<void> {
    // Check if data exists
    const existingProjects = await db.select().from(projects);
    if (existingProjects.length > 0) return;

    // Seed Skills
    await db.insert(skills).values([
      {
        category: "Languages & Frameworks",
        items: ["Node.js", "Go (Gin, gRPC)", "NestJS", "TypeScript", "PHP (Magento 2)"],
      },
      {
        category: "Cloud & DevOps",
        items: ["AWS (EC2, S3, Lambda, DynamoDB)", "Docker", "Kubernetes", "Helm", "Terraform", "CI/CD (Jenkins, Bitbucket)"],
      },
      {
        category: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB"],
      },
      {
        category: "Frontend",
        items: ["ReactJS", "NextJS", "HTML/CSS", "Tailwind CSS"],
      },
      {
        category: "Testing & Quality",
        items: ["Jest", "Playwright", "Selenium", "ESLint", "Prettier"],
      },
      {
        category: "Monitoring & Tools",
        items: ["CloudWatch", "ELK Stack", "Prometheus", "Grafana", "Postman"],
      },
    ]);

    // Seed Experience
    await db.insert(experiences).values([
      {
        company: "Ricksoft",
        role: "Software Engineer",
        period: "03/2025 - Present",
        description: [
          "Developed enterprise-grade Atlassian applications (Jira/Confluence) serving global customers using serverless AWS architecture.",
          "Ensured security & compliance for sensitive data (GDPR/ISO) while optimizing CI/CD pipelines.",
          "Collaborated cross-functionally with global teams to deliver features and resolve critical escalations.",
        ],
      },
      {
        company: "EMDDI JSC",
        role: "Full-Stack Software Engineer",
        period: "03/2025 - 09/2025",
        description: [
          "Developed and maintained platform services, API gateway, and internal admin portals.",
          "Built event-driven workflows for booking/payment; improved system reliability.",
          "Standardized APIs and documentation; enhanced monitoring and release processes.",
        ],
      },
      {
        company: "BSS Group",
        role: "Software Engineer",
        period: "11/2022 - 02/2025",
        description: [
          "Developed, deployed, and maintained e-commerce systems (Magento 2).",
          "Researched and developed solutions for integrating e-commerce websites with CRM and ERP systems.",
          "Explored emerging web technologies and optimized products for high-traffic environments.",
        ],
      },
    ]);

    // Seed Projects
    await db.insert(projects).values([
      {
        title: "Space Sync for Confluence",
        description: "Synchronization engine enabling seamless content replication across Confluence spaces/sites. Implemented secure token exchange and real-time sync dashboard.",
        role: "Software Engineer",
        techStack: ["React", "TypeScript", "Node.js", "AWS Lambda", "DynamoDB"],
        period: "03/2025 - Present",
        company: "Ricksoft",
        category: "Software Engineering",
        isFeatured: true,
      },
      {
        title: "Secured Fields for Jira",
        description: "Security-focused app for granular field-level permissions with AES-256 encryption for GDPR/ISO compliance.",
        role: "Software Engineer",
        techStack: ["React", "TypeScript", "Atlassian Forge", "AWS KMS", "DynamoDB"],
        period: "03/2025 - Present",
        company: "Ricksoft",
        category: "Software Engineering",
        isFeatured: true,
      },
      {
        title: "EMDDI Gateway Monorepo",
        description: "Backend system with RBAC/Authorization (Casbin), aggregate reporting APIs, and reliable notification systems.",
        role: "Backend Developer",
        techStack: ["Go", "Gin", "gRPC", "PostgreSQL", "Redis", "RabbitMQ"],
        period: "03/2025 - 09/2025",
        company: "EMDDI",
        category: "Backend",
        isFeatured: false,
      },
      {
        title: "Helm Deployment & DevOps",
        description: "Authored reusable Helm charts, standardized probes and resource limits, and streamlined release processes for EMDDI services.",
        role: "DevOps/Platform",
        techStack: ["Helm", "Kubernetes", "Linkerd", "Docker", "Harbor"],
        period: "03/2025 - 09/2025",
        company: "EMDDI",
        category: "DevOps",
        isFeatured: true,
      },
      {
        title: "720yun VR",
        description: "Distributed large-scale image-processing pipeline using Python/Bash. Leveraged EC2 Spot and Lambda for cost optimization.",
        role: "DevOps/Developer",
        techStack: ["NestJS", "React", "Python", "AWS S3", "CloudFront"],
        period: "03/2024 - 05/2025",
        company: "Coregy Freelance Team",
        category: "Full Stack",
        isFeatured: false,
      },
      {
        title: "Hody Workflow",
        description: "A specialized AI Agent workflow plugin for Claude Code that transforms AI into a professional software development team with specialized agents (Architect, Researcher, etc.) and long-term knowledge retention.",
        role: "Author / Lead Developer",
        techStack: ["TypeScript", "Claude Code", "AI Agents", "YAML", "Markdown"],
        period: "2025 - Present",
        link: "https://github.com/hodynguyen/Claude_Workflow",
        category: "AI & Automation",
        isFeatured: true,
      },
    ]);
  }
}

export const storage = new DatabaseStorage();
