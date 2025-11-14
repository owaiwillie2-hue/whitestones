import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, TrendingUp, Users, MapPin } from "lucide-react";

export default function RealEstate() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Building2 className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Estate Investments</h1>
              <p className="text-xl text-white/90">
                Build wealth through premium commercial and residential real estate opportunities
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Strategic Property Investments</h2>
                <p className="text-muted-foreground mb-6">
                  Real estate has long been a cornerstone of wealth building. Our curated portfolio includes prime properties across major metropolitan areas, offering stable returns and long-term appreciation potential.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Prime Locations</h3>
                      <p className="text-sm text-muted-foreground">Carefully selected properties in high-growth markets</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <TrendingUp className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Consistent Returns</h3>
                      <p className="text-sm text-muted-foreground">Stable rental income and property appreciation</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Users className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Professional Management</h3>
                      <p className="text-sm text-muted-foreground">Expert property management and tenant relations</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                  alt="Real Estate"
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
