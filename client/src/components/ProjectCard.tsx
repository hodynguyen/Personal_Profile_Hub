import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden card-hover"
    >
      <div className="absolute top-0 right-0 p-4 z-10">
        {project.isFeatured && (
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 backdrop-blur-sm">
            Featured
          </Badge>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="mb-4">
          <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-medium">{project.role}</p>
        </div>

        <p className="text-muted-foreground mb-6 flex-grow">
          {project.description}
        </p>

        <div className="space-y-6 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {project.link && (
              <Button asChild size="sm" className="gap-2 group/btn">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </Button>
            )}
            
            {/* If we had a repo link in schema, we'd render it here. 
                Assuming 'link' might be a repo or live site. */}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
    </motion.div>
  );
}
