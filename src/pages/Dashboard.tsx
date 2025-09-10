import { Header } from "@/components/layout/Header";
import { YieldDashboard } from "@/components/sections/YieldDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your yield positions and portfolio performance
          </p>
        </div>
        <YieldDashboard />
      </main>
    </div>
  );
};

export default Dashboard;