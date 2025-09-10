import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "1inch", amount: "$61,000", logo: "🔄" },
  { name: "Rootstock", amount: "$10,000", logo: "🟡" },
  { name: "Flow", amount: "$10,000", logo: "🌊" },
  { name: "Pyth Network", amount: "$10,000", logo: "🔮" },
  { name: "Hedera", amount: "$10,000", logo: "⬡" },
  { name: "Polygon", amount: "$10,000", logo: "🔗" },
  { name: "ENS", amount: "$10,000", logo: "◆" },
  { name: "World", amount: "$10,000", logo: "🌍" },
  { name: "Uniswap Foundation", amount: "$10,000", logo: "🦄" },
  { name: "Protocol Labs", amount: "$10,000", logo: "⚡" },
  { name: "Citrea", amount: "$10,000", logo: "🏛️" },
  { name: "The Graph", amount: "$10,000", logo: "📊" },
  { name: "Artificial Superintelligence Alliance", amount: "$10,000", logo: "🤖" },
  { name: "Paypal", amount: "$10,000", logo: "💳" },
  { name: "0G", amount: "$10,000", logo: "⭕" },
  { name: "Self", amount: "$10,000", logo: "🔄" },
  { name: "Fluence", amount: "$5,000", logo: "💧" },
  { name: "Kadena", amount: "$5,000", logo: "🔷" },
  { name: "Ethereum Foundation", amount: "$5,000", logo: "💎" },
  { name: "Walrus", amount: "$5,000", logo: "🐋" },
  { name: "Integra", amount: "$1,000", logo: "🔗" },
];

export const SponsorsSection = () => {
  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Backed by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            Supporting the future of DeFi yield optimization
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-300 border border-primary/20"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{sponsor.logo}</div>
                <h3 className="font-semibold text-sm mb-1 text-foreground">
                  {sponsor.name}
                </h3>
                <p className="text-primary font-bold text-xs">
                  {sponsor.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="hero" size="lg">
            See prize details →
          </Button>
        </div>
      </div>
    </section>
  );
};