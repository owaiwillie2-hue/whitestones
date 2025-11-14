export function PartnersSection() {
  const partners = [
    { name: "Bloomberg", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/New_Bloomberg_Logo.svg" },
    { name: "Reuters", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Reuters_Logo.svg" },
    { name: "NASDAQ", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Nasdaq_Logo.svg" },
    { name: "NYSE", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/NYSE_Logo.svg" },
    { name: "Goldman Sachs", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Goldman_Sachs.svg" },
    { name: "Morgan Stanley", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Morgan_Stanley_Logo_1.svg" },
    { name: "JP Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/JPMorgan_Chase_Logo_2008.svg" },
    { name: "Fidelity", logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Fidelity_Investments_logo.svg" },
    { name: "BlackRock", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Blackrock_logo.svg" },
    { name: "Vanguard", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Vanguard_logo.svg" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Trusted Partners</h2>
        <p className="text-center text-muted-foreground mb-12">
          Working with industry-leading financial institutions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
