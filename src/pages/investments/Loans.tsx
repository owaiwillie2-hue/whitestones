import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Banknote, CheckCircle, Clock, HandshakeIcon } from "lucide-react";

export default function Loans() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Banknote className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Loans</h1>
              <p className="text-xl text-white/90">
                Leverage flexible financing solutions to maximize your investment potential
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Flexible Financing Options</h2>
                <p className="text-muted-foreground mb-6">
                  Our investment loan programs are designed to help you seize opportunities without depleting your liquid capital. Whether you're looking to expand your portfolio or capitalize on time-sensitive investments, we offer competitive rates and flexible terms.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Competitive Rates</h3>
                      <p className="text-sm text-muted-foreground">Industry-leading interest rates for qualified investors</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Fast Approval</h3>
                      <p className="text-sm text-muted-foreground">Streamlined process with quick decision turnaround</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <HandshakeIcon className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Flexible Terms</h3>
                      <p className="text-sm text-muted-foreground">Customizable repayment schedules to fit your needs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1554224311-beee2cee2f84?auto=format&fit=crop&w=800&q=80"
                  alt="Loans"
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
