import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, LogOut, Upload } from "lucide-react";
import logo from "@/assets/logo.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [kycStatus, setKycStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      setUser(session.user);
      await fetchUserData(session.user.id);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      const [profileRes, walletRes, kycRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('user_wallets').select('*').eq('user_id', userId).single(),
        supabase.from('kyc_verifications').select('status').eq('user_id', userId).single(),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (walletRes.data) setWallet(walletRes.data);
      if (kycRes.data) setKycStatus(kycRes.data.status);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <img src={logo} alt="Whitestones Markets" className="h-10" />
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || 'Investor'}!</h1>
          <p className="text-muted-foreground">Manage your investments and track your portfolio</p>
        </div>

        {/* KYC Alert */}
        {!kycStatus && (
          <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Upload className="text-amber-600" size={24} />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">KYC Verification Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To start investing, please complete your KYC verification by uploading your ID and a selfie.
                  </p>
                  <Link to="/kyc-verification">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Complete KYC Verification
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {kycStatus === 'pending' && (
          <Card className="mb-8 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Upload className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">KYC Under Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Your KYC verification is being reviewed. This usually takes 24-48 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wallet Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.balance || 0}</div>
              <p className="text-xs text-muted-foreground">Available funds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deposited</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_deposited || 0}</div>
              <p className="text-xs text-muted-foreground">All time deposits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_profit || 0}</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_withdrawn || 0}</div>
              <p className="text-xs text-muted-foreground">All time withdrawals</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Button className="bg-gradient-primary" disabled={kycStatus !== 'approved'}>
                Deposit Funds
              </Button>
              <Button variant="outline" disabled={kycStatus !== 'approved'}>
                Start Investment
              </Button>
              <Button variant="outline" disabled={kycStatus !== 'approved'}>
                Withdraw Funds
              </Button>
            </div>
            {kycStatus !== 'approved' && (
              <p className="text-xs text-muted-foreground mt-4">
                Complete KYC verification to access investment features
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
