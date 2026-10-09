import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Handshake, Mail, Copy, Check, Smartphone, Linkedin, Github, Instagram, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  LINKEDIN_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LOCATION,
  AVAILABILITY,
  HIRING_MAILTO,
  COLLAB_MAILTO,
} from "@/lib/contact";

const paths = [
  {
    icon: Briefcase,
    title: "Recruiters & hiring managers",
    body: "Open to Senior Software Engineer roles — full-stack, backend or platform — in product teams working globally — remote, or on-site / hybrid in Hanoi or Ho Chi Minh City.",
    points: [
      "4 years shipping production systems, currently Senior SWE at Surbana Jurong",
      "Go, Node.js/TypeScript, React/Angular, PostgreSQL, Kafka, AWS",
      "Daily working English with teams in Singapore and the US",
    ],
    cta: "Email me about a role",
    href: HIRING_MAILTO,
  },
  {
    icon: Handshake,
    title: "Partners & collaborators",
    body: "Building a product and need someone who can own it from the database schema up to the screen? Let's talk.",
    points: [
      "Workflow automation, integrations over REST, gRPC and webhooks",
      "Atlassian Marketplace apps (Jira, Confluence)",
      "Ran Coregy, leading a 5+ developer team from scoping to delivery",
    ],
    cta: "Propose a collaboration",
    href: COLLAB_MAILTO,
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the address is visible anyway
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Let's Work Together"
            subtitle="If you're hiring or building something ambitious, I'd welcome a conversation."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {paths.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col bg-card border border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="bg-primary/10 p-3 rounded-lg text-primary w-fit mb-5">
                  <path.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                <p className="text-muted-foreground mb-5">{path.body}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {path.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="rounded-full gap-2 group/btn w-full sm:w-fit">
                  <a href={path.href}>
                    <Mail className="w-4 h-4" />
                    {path.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Direct details */}
          <div className="mt-10 bg-card border border-border/50 rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3 min-w-0 lg:col-span-2">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-semibold">Email</div>
                <div className="flex items-center gap-2 mt-1">
                  <a href={`mailto:${EMAIL}`} className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors [overflow-wrap:anywhere]">
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors flex-shrink-0"
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold">Phone</div>
                <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-primary transition-colors mt-1 block">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold">Location</div>
                <div className="text-muted-foreground mt-1">{LOCATION}</div>
                <div className="text-sm text-muted-foreground mt-1">{AVAILABILITY}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:col-span-2 lg:col-span-4 pt-2 border-t border-border/40">
              <Button asChild variant="outline" size="sm" className="gap-2 rounded-full">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2 rounded-full">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2 rounded-full">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
