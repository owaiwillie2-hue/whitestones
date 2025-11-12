import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const InvestmentPlansSection = () => {
  const plans = [
    {
      name: "Starter Plan",
      minAmount: "$500",
      maxAmount: "$4,999",
      roi: "25%",
      duration: "7 Days",
      description: "Perfect for beginners looking to start their investment journey",
      features: [
        "Professional portfolio management",
        "24/7 customer support",
        "Real-time performance tracking",
        "Secure transactions"
      ]
    },
    {
      name: "Platinum Plan",
      minAmount: "$5,000",
      maxAmount: "$49,999",
      roi: "45%",
      duration: "14 Days",
      description: "For serious investors seeking higher returns",
      features: [
        "All Starter Plan features",
        "Dedicated account manager",
        "Priority withdrawal processing",
        "Advanced analytics dashboard"
      ],
      popular: true
    },
    {
      name: "Executive Plan",
      minAmount: "$50,000",
      maxAmount: "$99,999",
      roi: "65%",
      duration: "21 Days",
      description: "Premium plan for executive-level investors",
      features: [
        "All Platinum Plan features",
        "Custom investment strategies",
        "VIP customer service",
        "Quarterly performance reviews"
      ]
    },
    {
      name: "Apex Plan",
      minAmount: "$100,000+",
      maxAmount: "Unlimited",
      roi: "85%",
      duration: "30 Days",
      description: "Our highest tier for elite investors",
      features: [
        "All Executive Plan features",
        "Personal investment advisor",
        "Exclusive investment opportunities",
        "White-glove concierge service"
      ]
    }
  ];

  return (
    <section id="plans" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Investment <span className="text-primary">Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that best fits your investment goals and financial capacity.
            All plans feature competitive returns and comprehensive support.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl border ${
                plan.popular
                  ? "border-primary shadow-xl"
                  : "border-border"
              } bg-card p-8 transition-all hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -right-12 top-8 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-white">
                  POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">{plan.roi}</span>
                  <span className="text-muted-foreground ml-2">ROI</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {plan.minAmount} - {plan.maxAmount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: {plan.duration}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={20} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-gradient-primary" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
