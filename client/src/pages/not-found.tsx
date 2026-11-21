import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md">
        <p className="font-display font-bold text-7xl md:text-8xl text-gradient">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full gap-2">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </Button>
      </div>
    </div>
  );
}
