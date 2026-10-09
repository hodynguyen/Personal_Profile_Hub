import type { experiences, projects, skills } from "@shared/schema";

// Portfolio content, kept in sync with the resume (Fullstack Engineer version).
// Apply to an existing database with: npm run db:seed -- --reset

type NewSkill = typeof skills.$inferInsert;
type NewExperience = typeof experiences.$inferInsert;
type NewProject = typeof projects.$inferInsert;

export const skillsSeed: NewSkill[] = [
  {
    category: "Languages & Backend",
    items: [
      "Go",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Node.js",
      "NestJS",
      "Gin",
      "gRPC",
      "REST",
      "GraphQL",
      "Microservices",
      "Event-driven Architecture",
      "Clean Architecture",
      "Multi-tenant Systems",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Vite",
      "Ant Design",
      "Admin Dashboards",
      "Builder UIs",
      "High-volume Data Tables",
    ],
  },
  {
    category: "Data & Messaging",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "DynamoDB",
      "Elasticsearch",
      "Kafka (CDC)",
      "RabbitMQ (DLQ, idempotency)",
      "AWS SNS/SQS",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, DynamoDB, CloudFront, KMS)",
      "Docker",
      "Kubernetes (Helm)",
      "Terraform",
      "Jenkins",
      "Bitbucket Pipelines",
      "NGINX",
    ],
  },
  {
    category: "Security & Testing",
    items: [
      "OAuth2",
      "JWT",
      "RBAC (Casbin)",
      "AES-256-GCM",
      "AWS KMS",
      "GDPR/ISO Compliance",
      "Jest",
      "Go table-driven tests (testify)",
      "Integration Testing",
    ],
  },
  {
    category: "AI-Assisted Development & English",
    items: [
      "Claude Code",
      "Cursor (agentic mode)",
      "Custom Plugins & Agent Rules",
      "MCP Integrations",
      "VSTEP C1",
      "TOEIC 780",
    ],
  },
];

export const experiencesSeed: NewExperience[] = [
  {
    company: "Surbana Jurong Group",
    role: "Senior Software Engineer",
    period: "07/2025 - Present",
    techStack: ["Go", "NestJS", "PostgreSQL", "Kafka", "LangChain.js", "Angular", "Kubernetes", "AWS"],
    description: [
      "Build the workflow automation engine behind a multi-tenant facility-management SaaS — an in-house equivalent of n8n with 23 node types. Top contributor on both backend services (26% of commits on the Go engine, 29% on the NestJS API).",
      "Wrote the graph execution engine in Go: iterative DFS branch walking with conditional routing, nested loop batching, and a join-barrier merge node.",
      "Own the Angular builder UI — drag-and-drop canvas and Monaco-based editors for all 23 node types, rendered from a shared configuration schema.",
      "Event-driven triggering via Postgres logical replication into Kafka, webhook triggers with four auth modes, and a credential subsystem with AES-256-GCM at rest.",
      "Built LLM nodes on LangChain.js with tool calling, structured output and retrieval over tenant data — per-tenant keys, token accounting and cost limits in production.",
      "Took concurrent PDF jobs from 1/20 to 20/20 completing under a 512 MB pod budget by profiling and turning inline payloads into file references.",
      "Lead a small squad across the builder UI and engine, and review code across both services.",
    ],
  },
  {
    company: "Ricksoft (Part-time)",
    role: "Software Engineer",
    period: "05/2025 - 07/2026",
    techStack: ["React", "TypeScript", "Node.js", "Atlassian Forge & Connect", "AWS Lambda", "DynamoDB", "KMS"],
    description: [
      "Two commercial Atlassian Marketplace apps with a US-based product team, from product design through development to customer support.",
      "Space Sync for Confluence (~770 installs, 4.3/5): sync engine replicating content across spaces and sites, including hybrid Cloud and Data Center migrations, with a 3-step token exchange.",
      "Secure Custom Fields for Jira (~600 installs): field-level view/edit permissions with AES-256 via AWS KMS under GDPR/ISO requirements.",
      "Led code review and testing, and handled customer escalations directly in live tenants.",
    ],
  },
  {
    company: "EMDDI JSC",
    role: "Fullstack Software Engineer — Ride-hailing Marketplace",
    period: "11/2024 - 04/2025",
    techStack: ["Go", "gRPC", "NestJS", "PostgreSQL", "Redis", "RabbitMQ", "Casbin", "n8n", "React 18"],
    description: [
      "Built a Go microservice gateway from scratch, replacing a legacy Node.js monolith across 15 services with the Strangler Fig pattern and Clean Architecture.",
      "Implemented system-wide multi-tenant RBAC with Casbin, with policy changes applied live.",
      "Booking and payment pipelines on RabbitMQ with dead-letter queues, Redis-based idempotency, and gRPC retries with backoff and deadlines.",
      "Automated end-of-day payment reconciliation against gateway settlement data, producing discrepancy reports for finance.",
      "Partner integration layer in n8n — onboarding a partner became a configuration change instead of a deployment.",
      "Built the React admin platform operations ran the business from: dispatch maps, i18n and high-volume Ant Design tables.",
    ],
  },
  {
    company: "Coregy",
    role: "Founder / Lead Engineer",
    period: "03/2024 - 05/2025",
    techStack: ["NestJS", "React", "Python (Odoo, OpenCV)", "MongoDB", "AWS", "Docker"],
    description: [
      "Ran a small outsourcing team end to end: found and closed clients, acted as PM and BA, then led 5+ developers through delivery while shipping code.",
      "Built NestJS backends for purchasing and payment workflows, and ERP integration APIs for inventory management.",
      "Delivered Kingess (Zalo Mini App), 720yun (VR panorama platform) and CRM projects.",
    ],
  },
  {
    company: "BSS Group",
    role: "Software Engineer",
    period: "11/2022 - 10/2024",
    techStack: ["PHP (Magento 2)", "Node.js", "MySQL", "Elasticsearch", "Docker", "Jenkins", "NGINX"],
    description: [
      "Delivered four multi-site e-commerce platforms (Crema Coffee Garage, Eternity Modern, Vyta Health, Club Der Dampfer) from build through go-live.",
      "Magento 2 back office: business logic, module customisation and compatibility fixes through version upgrades.",
      "Integrated Odoo ERP and CRM over REST APIs; set up Docker environments and CI/CD pipelines for multi-environment deploys.",
    ],
  },
];

export const projectsSeed: NewProject[] = [
  {
    title: "Workflow Automation Engine",
    description:
      "An in-house n8n equivalent for a multi-tenant facility-management SaaS: 23 node types, a Go graph execution engine, transactional runs with per-node SAVEPOINTs, Kafka-driven triggers, LLM nodes, and a drag-and-drop Angular builder.",
    role: "Senior Software Engineer",
    techStack: ["Go", "NestJS", "PostgreSQL", "Kafka", "LangChain.js", "Angular", "Monaco"],
    period: "07/2025 - Present",
    company: "Surbana Jurong Group",
    category: "Platform Engineering",
    isFeatured: true,
  },
  {
    title: "Hody Workflow",
    description:
      "A Claude Code plugin that takes a feature through design, build, verify and ship: 9 role-based agents, 15 slash commands, resumable workflow state, and a pre-commit secret scanner. ~11k lines with 841 unit tests, used across 13 repositories.",
    role: "Author",
    techStack: ["Python", "SQLite", "YAML", "Markdown", "Claude Code Plugin API"],
    period: "2026 - Present",
    link: "https://github.com/hodynguyen/Claude_Workflow",
    category: "AI Tooling",
    isFeatured: true,
  },
  {
    title: "Space Sync for Confluence",
    description:
      "Atlassian Marketplace app (~770 installs, rated 4.3/5) replicating page content across Confluence spaces and sites, including hybrid Cloud and Data Center setups, with a credential-free 3-step token exchange and a React sync dashboard.",
    role: "Software Engineer",
    techStack: ["React", "TypeScript", "Atlassian Connect", "AWS Lambda", "DynamoDB"],
    period: "05/2025 - 07/2026",
    company: "Ricksoft",
    category: "Atlassian Apps",
    isFeatured: true,
  },
  {
    title: "Secure Custom Fields for Jira",
    description:
      "Atlassian Marketplace app (~600 installs) adding field-level view and edit permissions, AES-256 encryption at rest via AWS KMS under GDPR/ISO requirements, a Forge configuration UI and Jira Automation integrations.",
    role: "Software Engineer",
    techStack: ["React", "TypeScript", "Atlassian Forge", "AWS KMS", "DynamoDB"],
    period: "05/2025 - 07/2026",
    company: "Ricksoft",
    category: "Atlassian Apps",
    isFeatured: false,
  },
  {
    title: "Ride-hailing Microservice Gateway",
    description:
      "Go gateway that incrementally replaced a Node.js monolith across 15 services, with live multi-tenant RBAC, RabbitMQ booking/payment pipelines, automated payment reconciliation and an n8n partner integration layer.",
    role: "Fullstack Software Engineer",
    techStack: ["Go", "gRPC", "RabbitMQ", "Redis", "Casbin", "PostgreSQL", "n8n"],
    period: "11/2024 - 04/2025",
    company: "EMDDI JSC",
    category: "Backend",
    isFeatured: false,
  },
  {
    title: "Coregy Client Deliveries",
    description:
      "Led a 5+ developer outsourcing team delivering Kingess (Zalo Mini App), 720yun (VR panorama platform) and CRM projects, plus NestJS purchasing/payment backends and ERP integration APIs.",
    role: "Founder / Lead Engineer",
    techStack: ["NestJS", "React", "Python", "MongoDB", "AWS"],
    period: "03/2024 - 05/2025",
    company: "Coregy",
    category: "Full Stack",
    isFeatured: false,
  },
];
