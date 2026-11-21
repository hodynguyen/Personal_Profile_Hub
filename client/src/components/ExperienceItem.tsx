import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

// Single-column timeline entry: full-width card so long bullet lists stay readable
// on every screen size. The first description line is the role summary.
export function ExperienceItem({ experience, index, isLast }: ExperienceItemProps) {
  const [summary, ...bullets] = experience.description;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.05 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline rail + dot */}
      {!isLast && (
        <span aria-hidden className="absolute left-[7px] md:left-[11px] top-3 -bottom-10 md:-bottom-12 w-px bg-border" />
      )}
      <span
        aria-hidden
        className="absolute left-0 md:left-1 top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/15 border-2 border-background"
      />

      <article className="bg-card p-5 sm:p-6 md:p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
        <header className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 text-primary font-medium mt-1">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>{experience.company}</span>
            </div>
          </div>
          <span className="inline-flex w-fit flex-shrink-0 items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-xs sm:text-sm font-medium text-muted-foreground border border-border whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5" />
            {experience.period}
          </span>
        </header>

        {summary && (
          <p className="text-[15px] text-foreground/80 leading-relaxed mb-4">{summary}</p>
        )}

        {bullets.length > 0 && (
          <ul className="space-y-2.5">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                <ChevronRight className="w-4 h-4 text-primary/70 mt-[3px] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

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
      </article>
    </motion.li>
  );
}
