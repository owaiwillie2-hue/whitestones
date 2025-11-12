import { Shield, TrendingUp, Users, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Regulated",
      description: "Bank-level security with regulatory compliance across multiple jurisdictions."
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "Consistent returns backed by expert market analysis and strategic investments."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Industry veterans with decades of combined experience in global markets."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized excellence in investment management and client satisfaction."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            About <span className="text-primary">Whitestones Markets</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whitestones Markets is a leading global investment firm dedicated to helping 
            individuals and institutions achieve their financial goals. With cutting-edge 
            technology, comprehensive market insights, and a commitment to excellence, 
            we provide our clients with unparalleled investment opportunities across 
            diverse asset classes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
