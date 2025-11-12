import { Bitcoin, Home, Droplet, Image, PiggyBank, DollarSign } from "lucide-react";

export const InvestmentOptionsSection = () => {
  const options = [
    {
      icon: Bitcoin,
      title: "Cryptocurrency",
      description: "Trade and invest in leading cryptocurrencies with expert guidance and real-time market analysis.",
      id: "crypto"
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Access premium real estate investment opportunities with competitive returns and low entry barriers.",
      id: "real-estate"
    },
    {
      icon: Droplet,
      title: "Oil and Gas",
      description: "Invest in the energy sector with our carefully curated oil and gas investment portfolios.",
      id: "oil-gas"
    },
    {
      icon: Image,
      title: "NFT",
      description: "Explore the world of digital assets with our NFT investment platform and expert curation.",
      id: "nft"
    },
    {
      icon: PiggyBank,
      title: "Retirement",
      description: "Secure your future with our specialized retirement investment plans designed for long-term growth.",
      id: "retirement"
    },
    {
      icon: DollarSign,
      title: "Loan",
      description: "Access flexible loan options for both personal and business needs with competitive rates.",
      id: "loan"
    }
  ];

  return (
    <section id="investments" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Investment <span className="text-primary">Options</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Diversify your portfolio across multiple asset classes and maximize your returns
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option, index) => (
            <div
              key={index}
              id={option.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:shadow-xl scroll-mt-24"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-white">
                <option.icon size={28} />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{option.title}</h3>
              <p className="text-muted-foreground">{option.description}</p>
              <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
