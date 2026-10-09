import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, LINKEDIN_URL, GITHUB_URL, INSTAGRAM_URL, LOCATION } from "@/lib/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold font-display mb-4">Hody</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Nguyen Thanh Dat — Senior Software Engineer building distributed systems, workflow automation platforms and the product UIs on top of them.
            </p>
            <div className="flex gap-4">
              <a 
                href={GITHUB_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-background p-2.5 rounded-full border border-border hover:border-primary hover:text-primary hover:shadow-md transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={LINKEDIN_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-background p-2.5 rounded-full border border-border hover:border-primary hover:text-primary hover:shadow-md transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-background p-2.5 rounded-full border border-border hover:border-primary hover:text-primary hover:shadow-md transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{LOCATION}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Hody. All rights reserved.</p>
          <p>Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
