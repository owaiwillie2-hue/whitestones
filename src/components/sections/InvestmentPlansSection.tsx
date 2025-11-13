import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const InvestmentPlansSection = () => {
  const plans = [
    {
      name: "Starter Plan",
      minAmount: "$100",
      maxAmount: "$999",
      roi: "1%",
      period: "Hourly",
      referral: "5%",
      description: "Perfect for beginners looking to start their investment journey",
      features: [
        "Hourly profit updates",
        "24/7 support",
        "Instant withdrawals",
        "Referral bonus"
      ]
    },
    {
      name: "Growth Plan",
      minAmount: "$1,000",
      maxAmount: "$4,999",
      roi: "1.8%",
      period: "Hourly",
      referral: "5%",
      description: "For serious investors seeking higher returns",
      features: [
        "Higher hourly returns",
        "Priority support",
        "Fast withdrawals",
        "Referral bonus"
      ]
    },
    {
      name: "Pro Plan",
      minAmount: "$5,000",
      maxAmount: "$10,000",
      roi: "26%",
      period: "Daily",
      referral: "5%",
      description: "Premium plan for professional investors",
      features: [
        "Daily profit updates",
        "VIP support",
        "Premium features",
        "Referral bonus"
      ],
      popular: true
    },
    {
      name: "Elite Plan",
      minAmount: "$10,001",
      maxAmount: "Unlimited",
      roi: "35%",
      period: "Daily",
      referral: "5%",
      description: "Our highest tier for elite investors",
      features: [
        "Maximum returns",
        "Dedicated account manager",
        "All premium features",
        "Referral bonus"
      ],
      popular: true
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
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{plan.roi}</span>
                  <span className="text-muted-foreground ml-2 text-lg">{plan.period}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum:</span>
                    <span className="font-semibold">{plan.minAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maximum:</span>
                    <span className="font-semibold">{plan.maxAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Referral:</span>
                    <span className="font-semibold">{plan.referral}</span>
                  </div>
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
