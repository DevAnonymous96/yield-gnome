const sponsors = [
  { name: "1inch", logo: "/1inch-1inch-logo.svg" },
  { name: "Pyth Network", logo: "/pyth-network-pyth-logo.svg" },
  { name: "Hedera", logo: "/hedera-hbar-logo.svg" },
  { name: "Polygon", logo: "/polygon-matic-logo.svg" },
  { name: "Aave", logo: "/aave-aave-logo.svg" },
  { name: "Uniswap Foundation", logo: "/uniswap-uni-logo.svg" },
  { name: "The Graph", logo: "/the-graph-grt-logo.svg" },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="glass rounded-lg p-4 hover:scale-105 transition-transform duration-300 border border-primary/20"
            >
              <div className="flex text-center items-center justify-center space-x-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={40}
                  height={40}
                />
                {/* </div> */}
                <h3 className="font-semibold text-foreground">
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
