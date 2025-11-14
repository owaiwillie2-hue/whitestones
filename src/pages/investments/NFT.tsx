import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Palette, TrendingUp, Lock, Sparkles } from "lucide-react";

export default function NFT() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Palette className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">NFT Investments</h1>
              <p className="text-xl text-white/90">
                Enter the digital art and collectibles market with curated NFT portfolios
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Digital Asset Revolution</h2>
                <p className="text-muted-foreground mb-6">
                  NFTs represent a paradigm shift in digital ownership. Our expert team identifies high-value digital assets, from blue-chip art to emerging collections, providing you access to this revolutionary market.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Sparkles className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Curated Collections</h3>
                      <p className="text-sm text-muted-foreground">Hand-picked NFTs from verified creators and projects</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Lock className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Secure Custody</h3>
                      <p className="text-sm text-muted-foreground">Enterprise-grade wallet solutions for your digital assets</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <TrendingUp className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Market Insights</h3>
                      <p className="text-sm text-muted-foreground">Real-time analytics and valuation tracking</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80"
                  alt="NFT"
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
