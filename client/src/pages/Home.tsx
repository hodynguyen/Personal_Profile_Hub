import { usePortfolio } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Server, Smartphone, Globe, Cloud, Mail, LayoutDashboard, Users, GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data, isLoading, error } = usePortfolio();

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Failed to load portfolio</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* === HERO SECTION === */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-50 dark:opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground border border-border mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to remote & hybrid roles
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[1.1] mb-6">
                Hi, I'm <br />
                <span className="text-gradient">Hody</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Senior Software Engineer. Full-stack, 4 years, owning features from the database schema up to the screen — Go and Node.js services, event-driven systems, and React/Angular product UIs.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-base h-12 px-8 rounded-full" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Projects
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 rounded-full border-2" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
        >
          <ArrowDown className="text-muted-foreground w-6 h-6" />
        </motion.div>
      </section>

      {/* === ABOUT SECTION === */}
      <section id="about" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
               {/* Decorative image placeholder using CSS pattern/gradient instead of stock image */}
               <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-border shadow-2xl group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-bold font-display text-white/5 group-hover:text-white/10 transition-colors select-none">NTD</span>
                 </div>
                 {/* Floating tech icons */}
                 <div className="absolute top-10 right-10 p-4 bg-background/10 backdrop-blur-md border border-white/10 rounded-2xl animate-pulse">
                    <Cloud className="w-8 h-8 text-primary" />
                 </div>
                 <div className="absolute bottom-10 left-10 p-4 bg-background/10 backdrop-blur-md border border-white/10 rounded-2xl animate-pulse" style={{ animationDelay: '1s' }}>
                    <Server className="w-8 h-8 text-accent" />
                 </div>
               </div>
            </motion.div>

            <div>
              <SectionHeading 
                title="About Me" 
                subtitle="I design across the boundary between backend and UI, not on one side of it." 
                className="mb-8"
              />
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm <strong className="text-foreground">Nguyen Thanh Dat (Hody)</strong>, a full-stack engineer in Vietnam. I build Go and Node.js/TypeScript services with event-driven architecture and third-party integration over REST, gRPC and webhooks, and React, Next.js and Angular on the front — admin dashboards, builder UIs and high-volume data tables.
                </p>
                <p>
                  Today I'm a Senior Software Engineer at <strong className="text-foreground">Surbana Jurong Group</strong>, where I built a workflow automation engine together with its drag-and-drop builder UI. Before that: <strong className="text-foreground">Ricksoft</strong>, <strong className="text-foreground">EMDDI</strong>, <strong className="text-foreground">BSS Group</strong>, and running my own outsourcing team at <strong className="text-foreground">Coregy</strong>. I've led small teams and owned code review and mentoring for junior engineers.
                </p>
                <p className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Computer Science at <strong className="text-foreground">Hanoi University of Science and Technology</strong> — BSc completed, MSc in progress. Academic Excellence Scholarship (2021). VSTEP C1, TOEIC 780.
                  </span>
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { icon: Server, label: "Distributed Systems" },
                  { icon: LayoutDashboard, label: "Product & Builder UIs" },
                  { icon: Cloud, label: "Cloud & DevOps" },
                  { icon: Users, label: "Team Lead & Mentoring" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/60 shadow-sm"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SKILLS SECTION === */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="Tools and technologies I use to bring ideas to life."
            centered
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {data?.skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold mb-6 text-primary border-b border-border/40 pb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground rounded-lg text-sm font-medium border border-border/50 hover:border-primary/30 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* === EXPERIENCE SECTION === */}
      <section id="experience" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Work History" 
            subtitle="My professional journey and contributions."
            centered
          />

          <div className="max-w-4xl mx-auto mt-16 relative">
            {/* Vertical Line for timeline (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-16 relative">
              {isLoading ? (
                <div className="space-y-8">
                  <Skeleton className="h-40 w-full rounded-2xl" />
                  <Skeleton className="h-40 w-full rounded-2xl" />
                </div>
              ) : (
                data?.experiences.map((exp, index) => (
                  <ExperienceItem key={exp.id} experience={exp} index={index} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === PROJECTS SECTION === */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="A selection of my recent work."
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {data?.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* === CONTACT SECTION === */}
      <section id="contact" className="py-24 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading 
                  title="Let's Connect" 
                  subtitle="Have a role or a project in mind? Feel free to reach out."
                />
                
                <div className="mt-8 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <a href="mailto:hodynguyen.forwork@gmail.com" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">hodynguyen.forwork@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <a href="tel:+84968320336" className="text-muted-foreground hover:text-primary transition-colors mt-1 block">0968 320 336</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Socials</h4>
                      <div className="flex gap-4 mt-2">
                        <a href="https://github.com/hodynguyen" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                        <a href="https://linkedin.com/in/hodynguyen/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-card border border-border rounded-xl mt-8">
                    <h4 className="font-semibold mb-2">Open for opportunities</h4>
                    <p className="text-muted-foreground text-sm">
                      Looking for remote or hybrid product and platform engineering roles in a global environment.
                      Daily working English with distributed teams across Singapore and the US.
                    </p>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
