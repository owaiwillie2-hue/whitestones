import { UserPlus, CreditCard, TrendingUp } from "lucide-react";

export const HowToJoinSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Open Account",
      description: "Register in minutes with our simple sign-up process. No hidden fees or complex paperwork required."
    },
    {
      icon: CreditCard,
      title: "2. Select Plan & Fund Account",
      description: "Choose an investment plan that suits your goals and fund your account securely through multiple payment methods."
    },
    {
      icon: TrendingUp,
      title: "3. Start Earning",
      description: "Watch your investments grow with our proven strategies. Track your returns in real-time through your dashboard."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            How To <span className="text-primary">Join</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start your investment journey in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-white">
                  <step.icon size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5" />
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-primary to-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
