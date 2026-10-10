import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleTheme, useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all hover:bg-muted"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
    </Button>
  );
}
