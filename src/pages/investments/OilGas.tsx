import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Fuel, Globe, Sparkles, Award } from "lucide-react";

export default function OilGas() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Fuel className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Oil & Gas Investments</h1>
              <p className="text-xl text-white/90">
                Capitalize on energy sector opportunities with strategic oil and gas investments
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1605816324403-aa49e82aa9d3?auto=format&fit=crop&w=800&q=80"
                  alt="Oil & Gas"
                  className="rounded-xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Energy Sector Excellence</h2>
                <p className="text-muted-foreground mb-6">
                  The energy sector remains a vital component of the global economy. Our oil and gas investments provide exposure to both upstream and downstream operations, offering diversification and robust returns.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Globe className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Global Portfolio</h3>
                      <p className="text-sm text-muted-foreground">Diversified investments across major energy markets</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Sparkles className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Sustainable Practices</h3>
                      <p className="text-sm text-muted-foreground">Focus on environmentally responsible operations</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Award className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Industry Leadership</h3>
                      <p className="text-sm text-muted-foreground">Partnerships with top-tier energy companies</p>
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
