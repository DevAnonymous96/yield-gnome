import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "1inch", logo: "🔄" },
  { name: "Pyth Network", logo: "🔮" },
  { name: "Hedera", logo: "⬡" },
  { name: "Polygon", logo: "🔗" },
  { name: "Uniswap Foundation", logo: "🦄" },
  { name: "The Graph", logo: "📊" }
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
