import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, Check } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Deposit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [depositAddress, setDepositAddress] = useState("bc1q9s4hsv0m3mq7pu0gfj33l3ey800fe6ujy95apc");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    toast({ title: "Copied!", description: "Deposit address copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase.from('deposits').insert({
        user_id: session.user.id,
        amount: parseFloat(amount),
        transaction_id: transactionId,
        deposit_address: depositAddress,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: "Deposit Submitted",
        description: "Your deposit request has been submitted for approval.",
      });

      setAmount("");
      setTransactionId("");
      navigate("/dashboard/transactions");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Deposit Funds</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Bitcoin (BTC)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Deposit Address</Label>
                <div className="flex gap-2 mt-2">
                  <Input value={depositAddress} readOnly className="font-mono text-sm" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Send your Bitcoin to the address above, then fill out the form to notify us of your deposit.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                  <Input
                    id="transactionId"
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction ID"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Deposit"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Deposits are usually processed within 24 hours
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
