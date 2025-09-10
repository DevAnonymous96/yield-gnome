import { Button } from "@/components/ui/button";
import { Zap, Bot, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="glass border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary animate-float" />
            <span className="text-xl font-bold gradient-text">
              YieldBot AI
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className={`transition-colors ${
                isActive('/dashboard') 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/withdraw-deposit" 
              className={`transition-colors ${
                isActive('/withdraw-deposit') 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Deposit/Withdraw
            </Link>
            <Link 
              to="/ai-agent" 
              className={`transition-colors ${
                isActive('/ai-agent') 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              AI Agent
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="glass" size="sm">
              Connect Wallet
            </Button>
            <Button variant="hero" size="sm">
              <Zap className="h-4 w-4" />
              Start Earning
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};