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
      "Fluent English",
    ],
  },
];

export const experiencesSeed: NewExperience[] = [
  {
    company: "SJ Group",
    role: "Senior Software Engineer",
    period: "04/2026 - Present",
    techStack: ["Go", "NestJS", "TypeScript", "PostgreSQL", "Kafka", "Angular", "Docker", "AWS"],
    description: [
      "Building the workflow automation platform behind a multi-tenant enterprise facility-management SaaS — an in-house n8n-style engine that lets client admins compose drag-and-drop automations over their own operational data.",
      "Full-stack across the product: a Go execution engine, NestJS microservices on PostgreSQL, and an Angular drag-and-drop builder. Most commits on both workflow backend services since joining.",
      "Built most of the engine's action nodes (Email with M365 OAuth2, HTML, PDF, AWS Lambda, Convert to File, SQL Query Builder, Merge, Edit Image, Anthropic) and the credential subsystem behind them.",
      "Built new triggers and messaging integrations (Telegram, WhatsApp, Server-Sent Events) and added SASL authentication to the Kafka trigger for Confluent Cloud.",
      "Hardened the execution engine: run consistency on step failure (audit logs that survive rollback, deferred nodes inside loops), timezone-correct scheduled triggers, and a memory leak that was OOM-killing the processor.",
      "Built the node configuration editors in the Angular builder.",
      "Profiled and fixed memory failures under a tight pod budget, taking a concurrent PDF-generation batch from mostly failing to fully passing.",
      "Platform: cut memory and CPU usage across ~26 NestJS microservices; fixed a SQL injection in the shared auth guard and a record-level access-control bypass in the filter layer.",
      "Built new business services (Service Request, Spare Part Request) and record-level \"own records\" conditions in the policy-based access control.",
      "Wrote the gap analysis comparing the engine with Temporal and n8n, with improvement proposals adopted into the roadmap; review pull requests across backend services.",
      "Distributed, English-speaking team across Vietnam and Singapore.",
    ],
  },
  {
    company: "Ricksoft, Inc. (Part-time)",
    role: "Software Engineer",
    period: "10/2025 - 08/2026",
    techStack: ["React", "TypeScript", "Node.js", "Atlassian Forge & Connect", "AWS Lambda", "DynamoDB", "SQS", "KMS"],
    description: [
      "Part-time engineer on two commercial Atlassian Marketplace apps, engaged through DS Solutions, a Vietnam-based outsourcing partner of Ricksoft. Worked directly with Ricksoft's US-based product team across the full product lifecycle — from design through development to customer support.",
      "Space Sync for Confluence — keeps page content consistent across multiple Confluence spaces and sites, including hybrid Cloud and Data Center setups during migrations (~770 installs, rated 4.3/5).",
      "Secure Custom Fields for Jira — field-level view and edit permissions so sensitive data can sit safely alongside normal data in the same issue, with AES-256 encryption (~600 installs).",
      "Involved from product design onward — shaping how features should work before building them.",
      "Built the React/TypeScript front ends and the serverless AWS backends behind them, on Atlassian Forge and Connect.",
      "Handled security and compliance for sensitive customer data (GDPR/ISO), and the encryption and permission model at the core of Secure Custom Fields.",
      "Led code review and the testing effort on Forge and Connect patterns; supported customers directly on escalations — debugging real issues in real tenants.",
      "Distributed, English-speaking team across Vietnam, Spain and the Philippines.",
    ],
  },
  {
    company: "Coregy",
    role: "Founder / Lead Engineer",
    period: "12/2024 - 09/2025",
    techStack: ["NestJS", "React", "Python (Odoo, OpenCV)", "MongoDB", "AWS", "Docker"],
    description: [
      "Ran a small outsourcing team delivering web and mobile products for clients — from first conversation to production.",
      "Owned the client relationship end to end — pitching, requirement analysis, scoping, and ongoing consultation.",
      "Acted as PM and BA on every engagement: turning vague client asks into something a small team could actually build and ship.",
      "Led cross-functional teams across concurrent client products while shipping code alongside them.",
      "Built backends for purchasing and payment workflows, an e-commerce application, ERP and CRM integration APIs, and handled deployment and infrastructure.",
      "Delivered a Mini App, a VR panorama platform, and other CRM projects.",
    ],
  },
  {
    company: "EMDDI JSC",
    role: "Software Engineer",
    period: "03/2025 - 08/2025",
    techStack: ["Go", "NestJS", "TypeScript", "React", "PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ", "n8n"],
    description: [
      "Full-stack engineer on a Vietnamese ride-hailing marketplace — working across the booking, dispatch, and payment flows, the services behind them, and the admin platform the operations team runs the business from.",
      "Built a Go microservice gateway from scratch, incrementally replacing a legacy Node.js monolith across 15 services using the Strangler Fig pattern.",
      "Implemented multi-tenant role-based access control across the platform, with policy changes taking effect live.",
      "Designed the event-driven pipelines behind booking and payment — message queues with dead-letter handling, idempotency, and retries with backoff.",
      "Built the partner integration layer, so onboarding a new enterprise partner became a configuration change instead of a backend deployment.",
      "Automated end-of-day payment reconciliation against gateway settlement data, producing a discrepancy report for the finance team.",
      "Built the React admin platform used by operations: customer, driver, and vehicle management, and live dispatch maps.",
      "Built the revenue and GMV reporting APIs, plus scheduled digests and threshold-based anomaly alerts routed to the on-call engineer.",
    ],
  },
  {
    company: "BSS Group",
    role: "Software Engineer",
    period: "11/2022 - 02/2025",
    techStack: ["PHP (Magento 2)", "Node.js", "MySQL", "Elasticsearch", "Docker", "Jenkins", "NGINX"],
    description: [
      "First engineering role — two years building and running e-commerce platforms end-to-end, across both the storefront and the Magento back office.",
      "Delivered four multi-site e-commerce platforms (Crema Coffee Garage, Eternity Modern, Vyta Health, Club Der Dampfer) from build through go-live.",
      "Built storefront templates and worked on design and SEO — page structure, performance, and search visibility for high-traffic stores.",
      "Worked on the Magento 2 back office: business logic, installing and customising modules, and resolving compatibility problems between them through upgrades.",
      "Integrated ERP and CRM systems (Odoo) over REST APIs, and wrote automation scripts for go-live and staging.",
      "Set up Docker environments and CI/CD pipelines to automate multi-environment deploys.",
    ],
  },
];

export const projectsSeed: NewProject[] = [
  {
    title: "Workflow Automation Engine",
    description:
      "An in-house n8n-style engine for a multi-tenant enterprise facility-management SaaS: a Go execution engine, NestJS microservices on PostgreSQL, action nodes from M365 email and PDF to AWS Lambda and Anthropic, Kafka/Telegram/WhatsApp/SSE triggers, and a drag-and-drop Angular builder.",
    role: "Senior Software Engineer",
    techStack: ["Go", "NestJS", "TypeScript", "PostgreSQL", "Kafka", "Angular"],
    period: "04/2026 - Present",
    company: "SJ Group",
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
      "Atlassian Marketplace app (~770 installs, rated 4.3/5) replicating page content across Confluence spaces and sites, including hybrid Cloud and Data Center setups during migrations.",
    role: "Software Engineer",
    techStack: ["React", "TypeScript", "Atlassian Connect", "AWS Lambda", "DynamoDB"],
    period: "10/2025 - 08/2026",
    link: "https://marketplace.atlassian.com/apps/1225377/space-sync-for-confluence-copy-publish-pages-over-sites",
    company: "Ricksoft",
    category: "Atlassian Apps",
    isFeatured: true,
  },
  {
    title: "Secure Custom Fields for Jira",
    description:
      "Atlassian Marketplace app (~600 installs) adding field-level view and edit permissions, so sensitive data can sit alongside normal data in the same issue, with AES-256 encryption under GDPR/ISO requirements.",
    role: "Software Engineer",
    techStack: ["React", "TypeScript", "Atlassian Forge", "AWS KMS", "DynamoDB"],
    period: "10/2025 - 08/2026",
    link: "https://marketplace.atlassian.com/apps/1226365/secure-custom-fields-for-jira-security-permission",
    company: "Ricksoft",
    category: "Atlassian Apps",
    isFeatured: false,
  },
  {
    title: "Ride-hailing Microservice Gateway",
    description:
      "Go gateway that incrementally replaced a Node.js monolith across 15 services (Strangler Fig), with live multi-tenant RBAC, event-driven booking/payment pipelines with dead-letter handling and idempotency, automated payment reconciliation and a configuration-driven partner integration layer.",
    role: "Software Engineer",
    techStack: ["Go", "NestJS", "RabbitMQ", "Redis", "PostgreSQL", "n8n"],
    period: "03/2025 - 08/2025",
    company: "EMDDI JSC",
    category: "Backend",
    isFeatured: false,
  },
  {
    title: "720yun — VR Panorama Platform",
    description:
      "360° VR panorama platform for creating, hosting and sharing panoramic tours. Delivered by the Coregy team I led — scoping with the client as PM/BA, then leading development while shipping code.",
    role: "Founder / Lead Engineer",
    techStack: ["NestJS", "React", "Python (OpenCV)", "AWS S3", "CloudFront"],
    period: "12/2024 - 09/2025",
    company: "Coregy",
    link: "https://www.720yun.com/",
    category: "Full Stack",
    isFeatured: false,
  },
];
