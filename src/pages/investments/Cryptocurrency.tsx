import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Bitcoin, TrendingUp, Shield, Zap } from "lucide-react";

export default function Cryptocurrency() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Bitcoin className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cryptocurrency Investments</h1>
              <p className="text-xl text-white/90">
                Invest in the future of finance with our expertly managed cryptocurrency portfolios
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80"
                  alt="Cryptocurrency"
                  className="rounded-xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Cryptocurrency?</h2>
                <p className="text-muted-foreground mb-6">
                  Cryptocurrency represents the cutting edge of digital finance, offering unprecedented opportunities for growth and diversification. Our team of blockchain experts carefully curates portfolios that balance risk and reward.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <TrendingUp className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">High Growth Potential</h3>
                      <p className="text-sm text-muted-foreground">Access emerging digital assets with significant upside potential</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Secure Storage</h3>
                      <p className="text-sm text-muted-foreground">Military-grade security with cold storage solutions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Zap className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">24/7 Market Access</h3>
                      <p className="text-sm text-muted-foreground">Trade and monitor your investments around the clock</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
