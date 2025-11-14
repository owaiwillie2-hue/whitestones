import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export function CryptoTicker() {
  const [cryptos, setCryptos] = useState<CryptoPrice[]>([
    { symbol: "BTC", name: "Bitcoin", price: 43250.00, change: 2.5 },
    { symbol: "ETH", name: "Ethereum", price: 2280.50, change: -1.2 },
    { symbol: "BNB", name: "Binance", price: 320.75, change: 3.8 },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: 5.2 },
    { symbol: "ADA", name: "Cardano", price: 0.48, change: -0.8 },
    { symbol: "SOL", name: "Solana", price: 98.20, change: 7.1 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change: crypto.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 bg-card border-y border-border overflow-hidden">
      <div className="animate-scroll flex gap-8">
        {[...cryptos, ...cryptos].map((crypto, idx) => (
          <div
            key={`${crypto.symbol}-${idx}`}
            className="flex items-center gap-3 min-w-[200px] px-4"
          >
            <div className="text-sm font-medium text-foreground">
              {crypto.symbol}
            </div>
            <div className="text-sm text-muted-foreground">
              ${crypto.price.toFixed(2)}
            </div>
            <div className={`flex items-center gap-1 text-xs ${
              crypto.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {crypto.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(crypto.change).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
