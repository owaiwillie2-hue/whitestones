import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Umbrella, Shield, TrendingUp, Heart } from "lucide-react";

export default function Retirement() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Umbrella className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Retirement Planning</h1>
              <p className="text-xl text-white/90">
                Secure your future with comprehensive retirement investment strategies
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80"
                  alt="Retirement"
                  className="rounded-xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Your Golden Years, Secured</h2>
                <p className="text-muted-foreground mb-6">
                  Planning for retirement requires careful consideration and expert guidance. Our retirement portfolios are designed to provide stable income and preserve capital, ensuring you can enjoy your retirement years with peace of mind.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Capital Preservation</h3>
                      <p className="text-sm text-muted-foreground">Conservative strategies to protect your nest egg</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <TrendingUp className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Steady Income</h3>
                      <p className="text-sm text-muted-foreground">Regular distributions to support your lifestyle</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Heart className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Personalized Planning</h3>
                      <p className="text-sm text-muted-foreground">Tailored strategies based on your retirement goals</p>
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
