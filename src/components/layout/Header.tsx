import { Button } from "@/components/ui/button";
import { Zap, Bot, TrendingUp } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary animate-float" />
              <span className="text-xl font-bold gradient-text">
                YieldCraft AI
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            {/* <a
              href="/yield"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Yield Vaults
            </a> */}
            <a
              href="#ai-agent"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              AI Agent
            </a>
            <a
              href="#portfolio"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
            </a>
            <a
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="hero" size="sm" asChild>
              <a href="/yield">
                <Zap className="h-4 w-4" />
                Start Earning
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
