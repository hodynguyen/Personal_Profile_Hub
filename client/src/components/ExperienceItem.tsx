import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline connector (Mobile) */}
      <div className="md:hidden absolute left-[5px] top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="md:hidden absolute left-[-4px] top-0 h-5 w-5 rounded-full border-4 border-background bg-primary z-10"></div>

      <div className={`md:flex items-start justify-between gap-8 ${isEven ? 'flex-row-reverse' : ''}`}>
        
        {/* Date Section (Desktop) */}
        <div className={`hidden md:block w-5/12 ${isEven ? 'text-left' : 'text-right'} pt-1`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-sm font-medium text-muted-foreground border border-border">
            <Calendar className="w-3.5 h-3.5" />
            {experience.period}
          </div>
        </div>

        {/* Center Dot (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center">
          <div className="h-full w-px bg-border absolute top-0"></div>
          <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-1.5 shadow-[0_0_0_4px_rgba(var(--primary),0.2)]"></div>
        </div>

        {/* Content Card */}
        <div className="w-full md:w-5/12">
          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/20 group">
            <div className="md:hidden mb-4">
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary/50 text-xs font-medium text-muted-foreground border border-border">
                <Calendar className="w-3 h-3" />
                {experience.period}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {experience.role}
            </h3>
            
            <div className="flex items-center gap-2 text-primary font-medium mt-1 mb-4">
              <Briefcase className="w-4 h-4" />
              {experience.company}
            </div>
            
            <ul className="space-y-3">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <ChevronRight className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {experience.techStack && experience.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/40">
                {experience.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
